import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

export type TypewriterSegment = { text: string; className?: string };

/**
 * Types out `segments` one character at a time, then leaves a blinking caret.
 * Honors reduced-motion (renders the full text immediately, no animation).
 */
export function Typewriter({
  segments,
  speed = 38, // ms per character
  startDelay = 400, // ms before typing begins
}: {
  segments: TypewriterSegment[];
  speed?: number;
  startDelay?: number;
}) {
  const full = segments.map((s) => s.text).join("");
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const done = count >= full.length;
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setCount(full.length);
      return;
    }
    setCount(0);
    startRef.current = null;
    let raf = 0;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now + startDelay;
      const elapsed = now - startRef.current;
      const target = elapsed < 0 ? 0 : Math.min(full.length, Math.floor(elapsed / speed));
      setCount(target);
      if (target < full.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [full, speed, startDelay, reduced]);

  // render the visible prefix across segments, preserving per-segment styling
  let offset = 0;
  return (
    <span aria-label={full}>
      <span aria-hidden="true">
        {segments.map((seg, i) => {
          const shown = Math.max(0, Math.min(seg.text.length, count - offset));
          offset += seg.text.length;
          if (shown <= 0) return null;
          return (
            <span key={i} className={seg.className}>
              {seg.text.slice(0, shown)}
            </span>
          );
        })}
        <span
          className={
            "ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-primary " +
            (reduced || done ? "animate-caret" : "")
          }
        />
      </span>
    </span>
  );
}

export default Typewriter;
