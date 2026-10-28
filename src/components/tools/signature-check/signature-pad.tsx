"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Stroke } from "@/lib/signature-check/measure";

/**
 * A signing pad on handwriting guide lines. Records every point with its time
 * and pressure; the strokes are kept by the parent so Undo and Clear can
 * redraw them. Signing needs a pointer; photographing a signature on paper is
 * the alternative offered alongside.
 */
export function SignaturePad({
  strokes,
  onChange,
  onStart,
}: {
  strokes: Stroke[];
  onChange: (strokes: Stroke[], fromStylus: boolean) => void;
  onStart?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const current = useRef<Stroke | null>(null);
  const stylus = useRef(false);
  const strokesRef = useRef(strokes);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#221b2b";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.6;
    for (const s of [...strokesRef.current, ...(current.current ? [current.current] : [])]) {
      if (!s.length) continue;
      ctx.beginPath();
      ctx.moveTo(s[0].x, s[0].y);
      for (const p of s.slice(1)) ctx.lineTo(p.x, p.y);
      if (s.length === 1) ctx.lineTo(s[0].x + 0.1, s[0].y);
      ctx.stroke();
    }
  }, []);

  // Match the canvas to its displayed size (and the screen's pixel density).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      redraw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [redraw]);

  useEffect(() => {
    strokesRef.current = strokes;
    if (strokes.length === 0) stylus.current = false;
    redraw();
  }, [strokes, redraw]);

  const point = (e: PointerEvent | React.PointerEvent, rect: DOMRect) => ({
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    t: performance.now(),
    p: e.pointerType === "pen" ? e.pressure : 0,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (e.pointerType === "pen") stylus.current = true;
    current.current = [point(e, e.currentTarget.getBoundingClientRect())];
    if (strokesRef.current.length === 0) onStart?.();
    redraw();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!current.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const events = typeof e.nativeEvent.getCoalescedEvents === "function" ? e.nativeEvent.getCoalescedEvents() : [];
    for (const ev of events.length ? events : [e.nativeEvent]) current.current.push(point(ev, rect));
    redraw();
  };

  const finish = () => {
    if (!current.current) return;
    const done = current.current;
    current.current = null;
    onChange([...strokesRef.current, done], stylus.current);
  };

  return (
    <div className="relative border border-ink bg-white">
      {/* Handwriting guide lines: ascender, x-height, baseline in red pen, descender. */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line x1="0" x2="100" y1="22" y2="22" stroke="var(--color-line)" strokeDasharray="1.2 1.2" vectorEffect="non-scaling-stroke" />
        <line x1="0" x2="100" y1="46" y2="46" stroke="var(--color-line)" strokeDasharray="0.4 1" vectorEffect="non-scaling-stroke" />
        <line x1="0" x2="100" y1="70" y2="70" stroke="var(--color-madder)" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" />
        <line x1="0" x2="100" y1="88" y2="88" stroke="var(--color-line)" strokeDasharray="1.2 1.2" vectorEffect="non-scaling-stroke" />
      </svg>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-3 font-mono text-[0.6875rem] text-muted lowercase">
        sign here, on the red line
      </span>
      <canvas
        ref={canvasRef}
        aria-label="Signing pad. Sign with your finger, a stylus or the mouse."
        role="img"
        className="relative block h-56 w-full cursor-crosshair touch-none sm:h-64"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finish}
        onPointerCancel={finish}
      />
    </div>
  );
}
