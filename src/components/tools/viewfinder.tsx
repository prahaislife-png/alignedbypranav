"use client";

import { useEffect, useRef } from "react";
import { GUIDE_RADIUS, RECT_GUIDE, clampFraming, drawFramed, type Framing } from "@/lib/watch-check/image";

const RENDER_SIZE = 720;

/**
 * Square viewfinder with a red-pen guide: a circle for a watch dial, a wide
 * frame for a signature. Drag (or pinch) to move and zoom; arrow keys and
 * +/– do the same from the keyboard.
 */
export function Viewfinder({
  photo,
  framing,
  onChange,
  guide = "circle",
  help = "Move and zoom until the dial just fills the red circle.",
}: {
  photo: HTMLCanvasElement;
  framing: Framing;
  onChange: (f: Framing) => void;
  guide?: "circle" | "rect";
  help?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const framingRef = useRef(framing);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ distance: number; zoom: number } | null>(null);

  useEffect(() => {
    framingRef.current = framing;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#e7e3d8";
    ctx.fillRect(0, 0, RENDER_SIZE, RENDER_SIZE);
    drawFramed(ctx, photo, framing, RENDER_SIZE);
  }, [photo, framing]);

  const update = (next: Framing) => onChange(clampFraming(photo, next));

  // Wheel zoom needs a non-passive listener to stop the page from scrolling.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const f = framingRef.current;
      onChange(clampFraming(photo, { ...f, zoom: f.zoom * Math.exp(-e.deltaY * 0.0015) }));
    };
    box.addEventListener("wheel", onWheel, { passive: false });
    return () => box.removeEventListener("wheel", onWheel);
  }, [photo, onChange]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom: framingRef.current.zoom };
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const size = e.currentTarget.getBoundingClientRect().width || 1;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const f = framingRef.current;
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      update({ ...f, zoom: pinch.current.zoom * (distance / Math.max(1, pinch.current.distance)) });
    } else if (pointers.current.size === 1) {
      update({ ...f, x: f.x + (e.clientX - prev.x) / size, y: f.y + (e.clientY - prev.y) / size });
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const f = framingRef.current;
    const step = e.shiftKey ? 0.05 : 0.015;
    const moves: Record<string, Partial<Framing>> = {
      ArrowLeft: { x: f.x - step },
      ArrowRight: { x: f.x + step },
      ArrowUp: { y: f.y - step },
      ArrowDown: { y: f.y + step },
      "+": { zoom: f.zoom * 1.08 },
      "=": { zoom: f.zoom * 1.08 },
      "-": { zoom: f.zoom / 1.08 },
    };
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();
    update({ ...f, ...move });
  };

  const r = GUIDE_RADIUS * 100;
  const rw = RECT_GUIDE.width * 100;
  const rh = RECT_GUIDE.height * 100;
  const shape =
    guide === "circle" ? (
      <circle cx="50" cy="50" r={r} />
    ) : (
      <rect x={50 - rw / 2} y={50 - rh / 2} width={rw} height={rh} />
    );
  return (
    <div>
      <div
        ref={boxRef}
        role="application"
        tabIndex={0}
        aria-label="Photo viewfinder. Drag to move the photo, pinch or use the slider to zoom. Arrow keys move, plus and minus zoom."
        aria-describedby="viewfinder-help"
        className="relative aspect-square w-full cursor-grab touch-none overflow-hidden border border-ink bg-paper-2 select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-madder active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <canvas ref={canvasRef} width={RENDER_SIZE} height={RENDER_SIZE} className="block h-full w-full" />
        <svg aria-hidden="true" viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
          <defs>
            <mask id={`guide-mask-${guide}`}>
              <rect width="100" height="100" fill="white" />
              <g fill="black">{shape}</g>
            </mask>
          </defs>
          <rect width="100" height="100" fill="rgb(33 27 41 / 0.42)" mask={`url(#guide-mask-${guide})`} />
          <g fill="none" stroke="var(--color-madder)" strokeWidth="0.5" strokeDasharray="2 1.6">
            {shape}
          </g>
          {guide === "circle" ? (
            <path d="M47 50h6M50 47v6" stroke="var(--color-madder)" strokeWidth="0.35" />
          ) : (
            <line x1={50 - rw / 2 + 2} x2={50 + rw / 2 - 2} y1={50 + rh / 4} y2={50 + rh / 4} stroke="var(--color-madder)" strokeWidth="0.3" strokeOpacity="0.6" />
          )}
        </svg>
      </div>
      <label className="mt-4 flex items-center gap-4">
        <span className="note shrink-0">zoom</span>
        <input
          type="range"
          min={1}
          max={6}
          step={0.01}
          value={framing.zoom}
          onChange={(e) => update({ ...framing, zoom: Number(e.target.value) })}
          className="w-full accent-[var(--color-madder)]"
        />
      </label>
      <p id="viewfinder-help" className="mt-2 text-[0.875rem] text-muted">
        {help}
      </p>
    </div>
  );
}
