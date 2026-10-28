"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Camera, Download, ImageUp, RotateCcw, Share2 } from "lucide-react";
import { watchCheck, type WatchAnswers } from "@/data/watch-check";
import { COLOUR_PALETTE, dominantColour, readingFromName, readingFromRgb, type ColourReading } from "@/lib/watch-check/colour";
import {
  DEFAULT_FRAMING,
  UnsupportedImageError,
  colourAt,
  dialPixels,
  framedCanvas,
  loadPhoto,
  type Framing,
} from "@/lib/watch-check/image";
import { firstLookMessage, reportMessage, unanswered, type WatchRecord } from "@/lib/watch-check/record";
import { renderSpecimenSheet } from "@/lib/watch-check/sheet";
import { track } from "@/lib/analytics/track";
import { WHATSAPP_FALLBACK_HREF, whatsappHref } from "@/lib/whatsapp";
import { TrackedWhatsAppLink } from "@/components/whatsapp/tracked-whatsapp-link";
import { WhatsAppIcon } from "@/components/whatsapp/whatsapp-icon";
import { ChoiceGroup } from "../choice-group";
import { Viewfinder } from "../viewfinder";

type Step = "photo" | "frame" | "details" | "result";
type PickTarget = "strap" | "dial";

const STEP_LABELS: Record<Step, string> = { photo: "photograph", frame: "frame the dial", details: "record", result: "specimen sheet" };
const ORDER: Step[] = ["photo", "frame", "details", "result"];

export function WatchCheck() {
  const [step, setStep] = useState<Step>("photo");
  const [photo, setPhoto] = useState<HTMLCanvasElement | null>(null);
  const [framing, setFraming] = useState<Framing>(DEFAULT_FRAMING);
  const [framed, setFramed] = useState<HTMLCanvasElement | null>(null);
  const [dial, setDial] = useState<ColourReading | null>(null);
  const [strap, setStrap] = useState<ColourReading | null>(null);
  const [answers, setAnswers] = useState<WatchAnswers>({});
  const [pickTarget, setPickTarget] = useState<PickTarget>("strap");
  const [tap, setTap] = useState<{ x: number; y: number; target: PickTarget } | null>(null);
  const [sheet, setSheet] = useState<{ blob: Blob; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Move focus to the step heading so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => () => {
    if (sheet) URL.revokeObjectURL(sheet.url);
  }, [sheet]);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      const canvas = await loadPhoto(file);
      setPhoto(canvas);
      setFraming(DEFAULT_FRAMING);
      setStep("frame");
      track("tool_start", { tool: "watch_check" });
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
    const canvas = framedCanvas(photo, framing);
    const measured = dominantColour(dialPixels(canvas));
    setFramed(canvas);
    setDial(measured ? readingFromRgb(measured) : null);
    setTap(null);
    setPickTarget("strap");
    setStep("details");
  };

  const onPick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!framed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * framed.width;
    const y = ((e.clientY - rect.top) / rect.height) * framed.height;
    const rgb = colourAt(framed, x, y, Math.round(framed.width / 60));
    if (!rgb) return;
    const reading = readingFromRgb(rgb);
    if (pickTarget === "strap") setStrap(reading);
    else setDial(reading);
    setTap({ x: (x / framed.width) * 100, y: (y / framed.height) * 100, target: pickTarget });
  };

  const createSheet = async () => {
    if (!framed) return;
    setBusy(true);
    setError(null);
    try {
      const blob = await renderSpecimenSheet(framed, { dial, strap, answers });
      setSheet((old) => {
        if (old) URL.revokeObjectURL(old.url);
        return { blob, url: URL.createObjectURL(blob) };
      });
      const file = new File([blob], "watch-specimen-sheet.png", { type: "image/png" });
      setCanShare(typeof navigator.canShare === "function" && navigator.canShare({ files: [file] }));
      setStep("result");
      track("tool_complete", { tool: "watch_check", service_id: watchCheck.serviceId });
    } catch {
      setError("Your specimen sheet could not be created. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const share = async () => {
    if (!sheet) return;
    const file = new File([sheet.blob], "watch-specimen-sheet.png", { type: "image/png" });
    try {
      await navigator.share({ files: [file], title: watchCheck.name });
      track("tool_save", { tool: "watch_check", save_method: "share" });
    } catch {
      /* the visitor closed the share sheet */
    }
  };

  const restart = () => {
    setStep("photo");
    setPhoto(null);
    setFramed(null);
    setDial(null);
    setStrap(null);
    setAnswers({});
    setTap(null);
    setSheet((old) => {
      if (old) URL.revokeObjectURL(old.url);
      return null;
    });
  };

  const setAnswer = useCallback((id: string, value: string[]) => setAnswers((a) => ({ ...a, [id]: value })), []);

  const record: WatchRecord = { dial, strap, answers };
  const remaining = unanswered(answers).length;
  const firstLook = whatsappHref(firstLookMessage(record));
  const report = whatsappHref(reportMessage());
  const stepIndex = ORDER.indexOf(step);

  return (
    <div className="border border-ink bg-paper shadow-[8px_8px_0_0_var(--color-ink)]">
      {/* Progress, as a figure caption */}
      <ol className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-ink px-5 py-3 font-mono text-[0.75rem] lowercase sm:px-7" aria-label="Progress">
        {ORDER.map((s, i) => (
          <li key={s} aria-current={s === step ? "step" : undefined} className={i <= stepIndex ? "text-madder" : "text-muted"}>
            <span>{String(i + 1).padStart(2, "0")}</span> {STEP_LABELS[s]}
          </li>
        ))}
      </ol>

      <div className="p-5 sm:p-7 lg:p-10">
        {error && (
          <p role="alert" className="mb-6 border-l-2 border-madder bg-paper-2 px-4 py-3 text-[0.9375rem]">
            {error}
          </p>
        )}

        {step === "photo" && (
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h3 ref={headingRef} tabIndex={-1} className="display-sm outline-none">
                Photograph your watch
              </h3>
              <ul className="mt-5 space-y-2.5">
                {watchCheck.photoTips.map((tip) => (
                  <li key={tip} className="flex gap-3 text-muted">
                    <span aria-hidden="true" className="mt-[0.7rem] inline-block h-[1.5px] w-3 shrink-0 bg-madder" />
                    {tip}
                  </li>
                ))}
              </ul>
              <p className="note mt-6">{watchCheck.intro.privacy}</p>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <label className="btn btn-primary cursor-pointer has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-madder">
                <Camera aria-hidden="true" className="size-5" strokeWidth={1.6} />
                {busy ? "Opening…" : "Take a photo"}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="sr-only"
                  disabled={busy}
                  onChange={(e) => {
                    void onFile(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </label>
              <label className="btn btn-outline cursor-pointer has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-madder">
                <ImageUp aria-hidden="true" className="size-5" strokeWidth={1.6} />
                Choose a photo
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  disabled={busy}
                  onChange={(e) => {
                    void onFile(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          </div>
        )}

        {step === "frame" && photo && (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,28rem)_1fr] lg:gap-14">
            <Viewfinder photo={photo} framing={framing} onChange={setFraming} />
            <div className="flex flex-col">
              <h3 ref={headingRef} tabIndex={-1} className="display-sm outline-none">
                Line up the dial
              </h3>
              <p className="mt-4 max-w-md text-muted">
                Drag the photo and zoom until the dial sits inside the red circle, edge to edge. The colour of the dial is
                measured from the middle of the circle.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 lg:mt-auto">
                <button type="button" className="btn btn-primary" onClick={confirmFraming}>
                  Use this framing
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.6} />
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setStep("photo")}>
                  <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.6} />
                  Another photo
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "details" && framed && (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h3 ref={headingRef} tabIndex={-1} className="display-sm outline-none">
                Record the colours
              </h3>
              <div className="mt-4 flex gap-2" role="group" aria-label="What to measure when you tap the photo">
                {(["strap", "dial"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={pickTarget === t}
                    onClick={() => setPickTarget(t)}
                    className={`min-h-11 border px-4 text-[0.9375rem] ${pickTarget === t ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}
                  >
                    Tap the {t}
                  </button>
                ))}
              </div>
              <div className="relative mt-4 border border-ink">
                <PickCanvas framed={framed} onPick={onPick} label={`Your watch photo. Tap the ${pickTarget} to measure its colour.`} />
                {tap && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute size-6 -translate-1/2 rounded-full border-2 border-paper shadow-[0_0_0_2px_var(--color-madder)]"
                    style={{ left: `${tap.x}%`, top: `${tap.y}%` }}
                  />
                )}
              </div>
              <div className="mt-5 grid gap-4">
                <ColourRow label="dial" reading={dial} onChoose={(name) => setDial(readingFromName(name))} hint="measured from the middle of the circle" />
                <ColourRow label="strap" reading={strap} onChoose={(name) => setStrap(readingFromName(name))} hint="tap the strap in the photo, or choose" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="display-sm">The details</h3>
                <p className="note">{remaining === 0 ? "all recorded" : `${remaining} left · all optional`}</p>
              </div>
              <div className="mt-6 grid gap-7">
                {watchCheck.questions.map((q) => (
                  <ChoiceGroup key={q.id} question={q} value={answers[q.id] ?? []} onChange={(v) => setAnswer(q.id, v)} />
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4 border-t border-ink pt-6">
                <button type="button" className="btn btn-primary" onClick={() => void createSheet()} disabled={busy}>
                  {busy ? "Drawing your sheet…" : "Create my specimen sheet"}
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.6} />
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setStep("frame")}>
                  <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.6} />
                  Reframe
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "result" && sheet && (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-14">
            {/* eslint-disable-next-line @next/next/no-img-element -- a local blob URL, not an optimisable asset */}
            <img
              src={sheet.url}
              width={1080}
              height={1350}
              alt="Your watch specimen sheet: the photo of your watch with the dial and strap colours and the details you recorded."
              className="h-auto w-full border border-ink"
            />
            <div className="flex flex-col">
              <h3 ref={headingRef} tabIndex={-1} className="display-sm outline-none">
                Your specimen sheet
              </h3>
              <p className="mt-4 max-w-md text-muted">Save it to your phone, share it, and send it to Pranav for a free first look.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {canShare && (
                  <button type="button" className="btn btn-outline" onClick={() => void share()}>
                    <Share2 aria-hidden="true" className="size-4" strokeWidth={1.6} />
                    Share
                  </button>
                )}
                <a
                  href={sheet.url}
                  download="watch-specimen-sheet.png"
                  className="btn btn-outline"
                  onClick={() => track("tool_save", { tool: "watch_check", save_method: "download" })}
                >
                  <Download aria-hidden="true" className="size-4" strokeWidth={1.6} />
                  Save image
                </a>
              </div>

              <div className="mt-10 border-t border-ink pt-6">
                <p className="note">§ next: free first look</p>
                <p className="mt-3 max-w-md">
                  WhatsApp opens with your details already written. Attach the image you just saved, then send. Pranav replies
                  personally with three observations.
                </p>
                <TrackedWhatsAppLink
                  href={firstLook ?? WHATSAPP_FALLBACK_HREF}
                  external={Boolean(firstLook)}
                  className="btn btn-primary mt-6 self-start"
                  eventProps={{ cta_placement: "watch_check_first_look", service_id: watchCheck.serviceId, tool: "watch_check" }}
                >
                  <WhatsAppIcon className="size-[1.15em] shrink-0" />
                  <span>{watchCheck.firstLookCta}</span>
                  {firstLook && <span className="sr-only"> (opens WhatsApp)</span>}
                </TrackedWhatsAppLink>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <TrackedWhatsAppLink
                  href={report ?? WHATSAPP_FALLBACK_HREF}
                  external={Boolean(report)}
                  className="group inline-flex items-center gap-2 font-medium text-ink"
                  eventProps={{ cta_placement: "watch_check_report", service_id: watchCheck.serviceId, tool: "watch_check" }}
                >
                  <span className="link-line">{watchCheck.reportCta}</span>
                  {report && <span className="sr-only"> (opens WhatsApp)</span>}
                </TrackedWhatsAppLink>
                <button type="button" className="inline-flex items-center gap-2 text-muted hover:text-ink" onClick={restart}>
                  <RotateCcw aria-hidden="true" className="size-4" strokeWidth={1.6} />
                  Check another watch
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** The framed photo, drawn once, which measures a colour where it is tapped. */
function PickCanvas({ framed, onPick, label }: { framed: HTMLCanvasElement; onPick: (e: React.MouseEvent<HTMLCanvasElement>) => void; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.drawImage(framed, 0, 0, canvas.width, canvas.height);
  }, [framed]);
  return <canvas ref={ref} width={600} height={600} role="img" aria-label={label} onClick={onPick} className="block h-auto w-full cursor-crosshair" />;
}

function ColourRow({
  label,
  reading,
  onChoose,
  hint,
}: {
  label: string;
  reading: ColourReading | null;
  onChoose: (name: string) => void;
  hint: string;
}) {
  const id = `colour-${label}`;
  return (
    <div className="flex items-center gap-4">
      <span
        aria-hidden="true"
        className="size-14 shrink-0 border border-ink"
        style={{ background: reading?.hex ?? "repeating-linear-gradient(135deg, var(--color-paper-2) 0 6px, var(--color-paper) 6px 12px)" }}
      />
      <div className="min-w-0 flex-1">
        <label htmlFor={id} className="note block">
          {label} · {reading ? (reading.source === "photo" ? "measured" : "chosen") : hint}
        </label>
        <select
          id={id}
          value={reading?.name ?? ""}
          onChange={(e) => onChoose(e.target.value)}
          className="mt-1 w-full border-b border-ink bg-transparent py-1.5 font-display text-[1.375rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-madder"
        >
          <option value="" disabled>
            Choose a colour
          </option>
          {COLOUR_PALETTE.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
