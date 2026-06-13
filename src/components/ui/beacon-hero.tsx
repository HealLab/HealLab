import { Link } from "react-router-dom";
import { Button } from "./button";
import { BeaconBackdrop } from "./beacon-backdrop";
import { Typewriter } from "./typewriter";

export function BeaconHero() {
  return (
    <section className="relative h-full overflow-hidden">
      {/* Interactive 3D network: full-bleed on the right, no box, faded into the
          page on the left so it reads as one continuous surface.
          `isolate` keeps the canvas's negative z-index contained (so it shows). */}
      <div className="absolute inset-y-0 right-0 isolate w-full md:w-1/2">
        <BeaconBackdrop tint={false} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40 md:via-background/40 md:to-transparent"
        />
      </div>

      {/* Text (transparent to pointer so the 3D parallax stays alive) */}
      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-[86rem] items-center px-6 lg:px-12">
        <div className="max-w-2xl text-center md:text-left">
          <h1 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:whitespace-nowrap sm:text-5xl">
            Health, Education, and AI
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl md:mx-0">
            HEAL Lab studies and builds human-centered AI systems that improve
            how people learn, understand, and care for health, from clinical
            simulation to wearable devices.
          </p>

          <p className="mx-auto mt-5 min-h-[3.5rem] max-w-xl text-base text-foreground/80 md:mx-0">
            <Typewriter
              segments={[
                {
                  text: "Now building: BEACON,",
                  className: "font-semibold text-foreground",
                },
                {
                  text: " as an edge-AI platform in wearable and mobile devices for community health.",
                },
              ]}
            />
          </p>

          <div className="pointer-events-auto mt-9 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <Button asChild size="lg" className="h-12 min-w-[12rem] rounded-xl px-7 text-base">
              <Link to="/beacon">Explore BEACON</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 min-w-[12rem] rounded-xl px-7 text-base"
            >
              <a href="mailto:yzhang5@stmarytx.edu">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeaconHero;
