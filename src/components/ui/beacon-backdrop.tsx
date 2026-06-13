import { Suspense, lazy, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const BeaconNetwork = lazy(() => import("./beacon-network"));

/**
 * Shared animated background for BEACON surfaces: a warm gradient mesh + faint
 * grid, with the interactive 3D node-network layered on top. Falls back to the
 * static gradient when the user prefers reduced motion.
 */
export function BeaconBackdrop({
  className,
  showNetwork = true,
  tint = true,
}: {
  className?: string;
  showNetwork?: boolean;
  /** Soft coral gradient wash. Set false for a clean, untinted background. */
  tint?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={cn("absolute inset-0 -z-10", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: tint
            ? "radial-gradient(60% 55% at 70% 30%, color-mix(in oklch, var(--accent-beacon) 22%, transparent), transparent 70%)," +
              "radial-gradient(45% 50% at 20% 80%, color-mix(in oklch, var(--accent-beacon-soft) 16%, transparent), transparent 70%)," +
              "var(--background)"
            : "var(--background)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
      {showNetwork && !reduced && mounted && (
        <Suspense fallback={null}>
          <BeaconNetwork />
        </Suspense>
      )}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
      />
    </div>
  );
}

export default BeaconBackdrop;
