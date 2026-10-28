"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Camera, Download, ImageUp, PenLine, Printer, RotateCcw, Share2, Undo2 } from "lucide-react";
import { signatureCheck, type SignatureAnswers } from "@/data/signature-check";
import { DEFAULT_FRAMING, UnsupportedImageError, cropToRectGuide, framedCanvas, loadPhoto, type Framing } from "@/lib/watch-check/image";
import { NoInkError, cropMask, inkFromPhoto, inkFromStrokes, inkPoints } from "@/lib/signature-check/ink";
import { measureSignature, measurementRows, type Stroke } from "@/lib/signature-check/measure";
import { drawSignaturePreview, renderPracticeSheet, renderSignatureSheet, type SignatureSpecimen } from "@/lib/signature-check/sheets";
import { signatureAnalysisMessage, signatureFirstLookMessage } from "@/lib/signature-check/messages";
import { track } from "@/lib/analytics/track";
import { WHATSAPP_FALLBACK_HREF, whatsappHref } from "@/lib/whatsapp";
import { TrackedWhatsAppLink } from "@/components/whatsapp/tracked-whatsapp-link";
import { WhatsAppIcon } from "@/components/whatsapp/whatsapp-icon";
import { ChoiceGroup } from "../choice-group";
import { Viewfinder } from "../viewfinder";
import { SignaturePad } from "./signature-pad";

type Step = "method" | "draw" | "frame" | "details" | "result";
type Method = "draw" | "photo";
type Sheet = { blob: Blob; url: string };
type Sheets = { specimen: Sheet; safe: Sheet; practice: Sheet };

const PROGRESS: { id: string; label: string; steps: Step[] }[] = [
  { id: "sign", label: "sign", steps: ["method", "draw", "frame"] },
  { id: "record", label: "record", steps: ["details"] },
  { id: "sheets", label: "your sheets", steps: ["result"] },
];

const FILE = {
  specimen: "signature-specimen-sheet.png",
  safe: "signature-specimen-share-safe.png",
  practice: "signature-practice-sheet.png",
};

export function SignatureCheck() {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState<Method>("draw");
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [fromStylus, setFromStylus] = useState(false);
  const [photo, setPhoto] = useState<HTMLCanvasElement | null>(null);
  const [framing, setFraming] = useState<Framing>(DEFAULT_FRAMING);
  const [specimen, setSpecimen] = useState<SignatureSpecimen | null>(null);
  const [answers, setAnswers] = useState<SignatureAnswers>({});
  const [sheets, setSheets] = useState<Sheets | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const started = useRef(false);

  // A new step starts clean, with focus on its heading for keyboard and screen-reader users.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setError(null);
    headingRef.current?.focus();
  }, [step]);

  // Release the sheet images when they are replaced or the tool is closed.
  useEffect(
    () => () => {
      if (sheets) for (const s of Object.values(sheets)) URL.revokeObjectURL(s.url);
    },
    [sheets],
  );

  const markStarted = useCallback((input: Method) => {
    if (started.current) return;
    started.current = true;
    track("tool_start", { tool: "signature_check", input_method: input });
  }, []);

  const goToDetails = (s: SignatureSpecimen) => {
    setSpecimen(s);
    // An underline found while signing on screen pre-fills that answer.
    if (s.measurements.underline) setAnswers((a) => (a.lines?.length ? a : { ...a, lines: ["under"] }));
    setStep("details");
  };

  const finishDrawing = () => {
    setError(null);
    const pts = strokes.flat();
    const width = pts.length ? Math.max(...pts.map((p) => p.x)) - Math.min(...pts.map((p) => p.x)) : 0;
    if (pts.length < 12 || width < 60) {
      setError("Please sign a little larger, across the pad, as you normally would.");
      return;
    }
    const { mask, strokes: mapped } = inkFromStrokes(strokes);
    goToDetails({ mask, points: inkPoints(mask), measurements: measureSignature(inkPoints(mask), mapped, fromStylus) });
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      const canvas = await loadPhoto(file);
      setPhoto(canvas);
      setFraming(DEFAULT_FRAMING);
      setStep("frame");
      markStarted("photo");
    } catch (e) {
      setError(
        e instanceof UnsupportedImageError
          ? "This photo can’t be opened in this browser. Please choose a JPG or PNG. On an iPhone, a screenshot of the photo works."
          : "Something went wrong opening the photo. Please try another one.",
      );
    } finally {
      setBusy(false);
    }
  };

  const confirmFraming = () => {
    if (!photo) return;
    setError(null);
    try {
      const mask = cropMask(inkFromPhoto(cropToRectGuide(framedCanvas(photo, framing))));
      const points = inkPoints(mask);
      goToDetails({ mask, points, measurements: measureSignature(points) });
    } catch (e) {
      setError(
        e instanceof NoInkError
          ? "We couldn’t find a clear signature inside the frame. Use a dark pen on plain white paper, avoid shadows, and fit the signature inside the red frame."
          : "Something went wrong reading the photo. Please try again.",
      );
    }
  };

  const createSheets = async () => {
    if (!specimen) return;
    setBusy(true);
    setError(null);
    try {
      const [specimenBlob, safeBlob, practiceBlob] = await Promise.all([
        renderSignatureSheet(specimen, answers),
        renderSignatureSheet(specimen, answers, { safe: true }),
        renderPracticeSheet(specimen),
      ]);
      const wrap = (blob: Blob) => ({ blob, url: URL.createObjectURL(blob) });
      setSheets({ specimen: wrap(specimenBlob), safe: wrap(safeBlob), practice: wrap(practiceBlob) });
      const file = new File([safeBlob], FILE.safe, { type: "image/png" });
      setCanShare(typeof navigator.canShare === "function" && navigator.canShare({ files: [file] }));
      setStep("result");
      track("tool_complete", { tool: "signature_check", service_id: signatureCheck.serviceId, input_method: method });
    } catch {
      setError("Your sheets could not be created. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const shareSafe = async () => {
    if (!sheets) return;
    try {
      await navigator.share({ files: [new File([sheets.safe.blob], FILE.safe, { type: "image/png" })], title: signatureCheck.name });
      track("tool_save", { tool: "signature_check", save_method: "share", sheet: "share_safe" });
    } catch {
      /* the visitor closed the share sheet */
    }
  };

  const printPractice = () => {
    document.body.dataset.printSheet = "";
    const done = () => {
      delete document.body.dataset.printSheet;
      window.removeEventListener("afterprint", done);
    };
    window.addEventListener("afterprint", done);
    track("tool_save", { tool: "signature_check", save_method: "print", sheet: "practice" });
    window.print();
  };

  const restart = () => {
    setStep("method");
    setStrokes([]);
    setFromStylus(false);
    setPhoto(null);
    setSpecimen(null);
    setAnswers({});
    setSheets(null);
    setError(null);
  };

  const setAnswer = useCallback((id: string, value: string[]) => setAnswers((a) => ({ ...a, [id]: value })), []);
  const firstLook = specimen ? whatsappHref(signatureFirstLookMessage(specimen.measurements, answers)) : null;
  const analysis = whatsappHref(signatureAnalysisMessage());
  const activeIndex = PROGRESS.findIndex((p) => p.steps.includes(step));
  const answered = signatureCheck.questions.filter((q) => answers[q.id]?.length).length;

  return (
    <div className="border border-ink bg-paper shadow-[8px_8px_0_0_var(--color-ink)]">
      <ol className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-ink px-5 py-3 font-mono text-[0.75rem] lowercase sm:px-7" aria-label="Progress">
        {PROGRESS.map((p, i) => (
          <li key={p.id} aria-current={i === activeIndex ? "step" : undefined} className={i <= activeIndex ? "text-madder" : "text-muted"}>
            <span>{String(i + 1).padStart(2, "0")}</span> {p.label}
          </li>
        ))}
      </ol>

      <div className="p-5 sm:p-7 lg:p-10">
        {error && (
          <p role="alert" className="mb-6 border-l-2 border-madder bg-paper-2 px-4 py-3 text-[0.9375rem]">
            {error}
          </p>
        )}

        {step === "method" && (
          <div>
            <h3 ref={headingRef} tabIndex={-1} className="display-sm outline-none">
              How would you like to sign?
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setMethod("draw");
                  setStep("draw");
                }}
                className="group flex flex-col items-start gap-3 border border-ink bg-paper p-6 text-left transition-colors hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-madder"
              >
                <PenLine aria-hidden="true" className="size-7 text-madder" strokeWidth={1.5} />
                <span className="font-display text-[1.375rem] leading-tight">{signatureCheck.methods.draw.title}</span>
                <span className="text-[0.9375rem] text-muted">{signatureCheck.methods.draw.description}</span>
              </button>
              <div className="flex flex-col gap-3 border border-ink bg-paper p-6">
                <Camera aria-hidden="true" className="size-7 text-madder" strokeWidth={1.5} />
                <span className="font-display text-[1.375rem] leading-tight">{signatureCheck.methods.photo.title}</span>
                <span className="text-[0.9375rem] text-muted">{signatureCheck.methods.photo.description}</span>
                <div className="mt-2 flex flex-wrap gap-3">
                  <PhotoInput capture label={busy ? "Opening…" : "Take a photo"} icon={<Camera aria-hidden="true" className="size-4" strokeWidth={1.6} />} disabled={busy} onFile={(f) => { setMethod("photo"); void onFile(f); }} />
                  <PhotoInput label="Choose a photo" icon={<ImageUp aria-hidden="true" className="size-4" strokeWidth={1.6} />} disabled={busy} onFile={(f) => { setMethod("photo"); void onFile(f); }} outline />
                </div>
              </div>
            </div>
            <p className="note mt-6">{signatureCheck.intro.privacy}</p>
          </div>
        )}

        {step === "draw" && (
          <div>
            <h3 ref={headingRef} tabIndex={-1} className="display-sm outline-none">
              Sign as you normally would
            </h3>
            <p className="mt-3 max-w-xl text-muted">Use your finger, a stylus or the mouse. Sign at your usual pace, on the red line.</p>
            <div className="mt-6">
              <SignaturePad
                strokes={strokes}
                onStart={() => markStarted("draw")}
                onChange={(next, stylus) => {
                  setStrokes(next);
                  setFromStylus(stylus);
                }}
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="btn btn-primary" onClick={finishDrawing} disabled={strokes.length === 0}>
                Done
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.6} />
              </button>
              <button type="button" className="btn btn-outline" onClick={() => setStrokes((s) => s.slice(0, -1))} disabled={strokes.length === 0}>
                <Undo2 aria-hidden="true" className="size-4" strokeWidth={1.6} />
                Undo
              </button>
              <button type="button" className="btn btn-outline" onClick={() => setStrokes([])} disabled={strokes.length === 0}>
                Clear
              </button>
              <button type="button" className="inline-flex items-center gap-2 px-2 text-muted hover:text-ink" onClick={() => setStep("method")}>
                <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.6} />
                Back
              </button>
            </div>
          </div>
        )}

        {step === "frame" && photo && (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,28rem)_1fr] lg:gap-14">
            <Viewfinder photo={photo} framing={framing} onChange={setFraming} guide="rect" help="Move and zoom until the whole signature sits inside the red frame." />
            <div className="flex flex-col">
              <h3 ref={headingRef} tabIndex={-1} className="display-sm outline-none">
                Frame your signature
              </h3>
              <ul className="mt-4 space-y-2.5">
                {signatureCheck.paperTips.map((tip) => (
                  <li key={tip} className="flex gap-3 text-muted">
                    <span aria-hidden="true" className="mt-[0.7rem] inline-block h-[1.5px] w-3 shrink-0 bg-madder" />
                    {tip}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4 lg:mt-auto">
                <button type="button" className="btn btn-primary" onClick={confirmFraming}>
                  Measure this signature
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.6} />
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setStep("method")}>
                  <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.6} />
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "details" && specimen && (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h3 ref={headingRef} tabIndex={-1} className="display-sm outline-none">
                The measurements
              </h3>
              <div className="mt-4 border border-ink bg-white">
                <PreviewCanvas specimen={specimen} />
              </div>
              <dl className="mt-4 border-t border-ink">
                {measurementRows(specimen.measurements).map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 border-b border-line py-2.5 text-[0.9375rem]">
                    <dt className="font-mono text-[0.8125rem] text-muted lowercase">{row.label}</dt>
                    <dd className="text-right">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[0.8125rem] text-muted">Red line: the measured baseline. Dashed lines: the measured slant.</p>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="display-sm">The details</h3>
                <p className="note">
                  {answered}/{signatureCheck.questions.length} · all optional
                </p>
              </div>
              <div className="mt-6 grid gap-7">
                {signatureCheck.questions.map((q) => (
                  <ChoiceGroup key={q.id} question={q} value={answers[q.id] ?? []} onChange={(v) => setAnswer(q.id, v)} />
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4 border-t border-ink pt-6">
                <button type="button" className="btn btn-primary" onClick={() => void createSheets()} disabled={busy}>
                  {busy ? "Drawing your sheets…" : "Create my sheets"}
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.6} />
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setStep(method === "draw" ? "draw" : "frame")}>
                  <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.6} />
                  {method === "draw" ? "Sign again" : "Reframe"}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "result" && sheets && (
          <div>
            <h3 ref={headingRef} tabIndex={-1} className="display-sm outline-none">
              Your sheets
            </h3>
            <p role="note" className="mt-4 max-w-2xl border-l-2 border-madder bg-paper-2 px-4 py-3 text-[0.9375rem]">
              {signatureCheck.intro.security}
            </p>

            <div className="mt-8 grid gap-10 lg:grid-cols-3 lg:gap-8">
              <SheetCard
                title="Specimen sheet"
                note="private · for you and pranav"
                sheet={sheets.specimen}
                alt="Your signature specimen sheet, with its slant, baseline and the details you recorded."
                file={FILE.specimen}
                onSave={() => track("tool_save", { tool: "signature_check", save_method: "download", sheet: "specimen" })}
              />
              <SheetCard
                title="Share-safe version"
                note="the signature is hidden · for instagram"
                sheet={sheets.safe}
                alt="Share-safe version of your specimen sheet, with the signature hidden behind a mosaic."
                file={FILE.safe}
                onSave={() => track("tool_save", { tool: "signature_check", save_method: "download", sheet: "share_safe" })}
                extra={
                  canShare ? (
                    <button type="button" className="btn btn-outline min-h-11 px-4 text-[0.875rem]" onClick={() => void shareSafe()}>
                      <Share2 aria-hidden="true" className="size-4" strokeWidth={1.6} />
                      Share
                    </button>
                  ) : null
                }
              />
              <SheetCard
                title="Practice sheet"
                note="a4 · print and practise · private"
                sheet={sheets.practice}
                alt="Your personalised practice sheet: your signature on handwriting guide lines, with grey copies to trace and empty lines to practise."
                file={FILE.practice}
                onSave={() => track("tool_save", { tool: "signature_check", save_method: "download", sheet: "practice" })}
                extra={
                  <button type="button" className="btn btn-outline min-h-11 px-4 text-[0.875rem]" onClick={printPractice}>
                    <Printer aria-hidden="true" className="size-4" strokeWidth={1.6} />
                    Print
                  </button>
                }
              />
            </div>

            <div className="mt-12 grid gap-8 border-t border-ink pt-8 lg:grid-cols-2">
              <div>
                <p className="note">§ next: free first look</p>
                <p className="mt-3 max-w-md">
                  WhatsApp opens with your measurements already written. Attach your specimen sheet, then send. Pranav replies
                  personally with three observations.
                </p>
                <TrackedWhatsAppLink
                  href={firstLook ?? WHATSAPP_FALLBACK_HREF}
                  external={Boolean(firstLook)}
                  className="btn btn-primary mt-6"
                  eventProps={{ cta_placement: "signature_check_first_look", service_id: signatureCheck.serviceId, tool: "signature_check" }}
                >
                  <WhatsAppIcon className="size-[1.15em] shrink-0" />
                  <span>{signatureCheck.firstLookCta}</span>
                  {firstLook && <span className="sr-only"> (opens WhatsApp)</span>}
                </TrackedWhatsAppLink>
              </div>
              <div className="flex flex-col items-start justify-end gap-4">
                <TrackedWhatsAppLink
                  href={analysis ?? WHATSAPP_FALLBACK_HREF}
                  external={Boolean(analysis)}
                  className="group inline-flex items-center gap-2 font-medium text-ink"
                  eventProps={{ cta_placement: "signature_check_report", service_id: signatureCheck.serviceId, tool: "signature_check" }}
                >
                  <span className="link-line">{signatureCheck.reportCta}</span>
                  {analysis && <span className="sr-only"> (opens WhatsApp)</span>}
                </TrackedWhatsAppLink>
                <button type="button" className="inline-flex items-center gap-2 text-muted hover:text-ink" onClick={restart}>
                  <RotateCcw aria-hidden="true" className="size-4" strokeWidth={1.6} />
                  Check another signature
                </button>
              </div>
            </div>

            {/* Only this image prints, on its own page, when "Print" is used. */}
            <div id="print-sheet" className="hidden" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element -- a local blob URL, printed as is */}
              <img src={sheets.practice.url} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PhotoInput({
  label,
  icon,
  onFile,
  disabled,
  capture = false,
  outline = false,
}: {
  label: string;
  icon: React.ReactNode;
  onFile: (file: File | undefined) => void;
  disabled: boolean;
  capture?: boolean;
  outline?: boolean;
}) {
  return (
    <label
      className={`btn ${outline ? "btn-outline" : "btn-primary"} min-h-11 cursor-pointer px-4 text-[0.875rem] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-madder`}
    >
      {icon}
      {label}
      <input
        type="file"
        accept="image/*"
        {...(capture ? { capture: "environment" as const } : {})}
        className="sr-only"
        disabled={disabled}
        onChange={(e) => {
          onFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </label>
  );
}

function PreviewCanvas({ specimen }: { specimen: SignatureSpecimen }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) drawSignaturePreview(ref.current, specimen);
  }, [specimen]);
  return <canvas ref={ref} width={900} height={360} role="img" aria-label="Your signature with its measured baseline and slant" className="block h-auto w-full" />;
}

function SheetCard({
  title,
  note,
  sheet,
  alt,
  file,
  onSave,
  extra,
}: {
  title: string;
  note: string;
  sheet: Sheet;
  alt: string;
  file: string;
  onSave: () => void;
  extra?: React.ReactNode;
}) {
  return (
    <figure className="flex flex-col">
      {/* eslint-disable-next-line @next/next/no-img-element -- a local blob URL, not an optimisable asset */}
      <img src={sheet.url} alt={alt} className="h-auto w-full border border-ink bg-white" />
      <figcaption className="mt-3">
        <p className="font-display text-[1.25rem] leading-tight">{title}</p>
        <p className="note mt-1">{note}</p>
      </figcaption>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href={sheet.url} download={file} className="btn btn-outline min-h-11 px-4 text-[0.875rem]" onClick={onSave}>
          <Download aria-hidden="true" className="size-4" strokeWidth={1.6} />
          Save
        </a>
        {extra}
      </div>
    </figure>
  );
}
