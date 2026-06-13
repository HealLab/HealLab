import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import { BeaconBackdrop } from "./beacon-backdrop";

export function BeaconHero() {
  return (
    <section className="relative isolate flex h-full items-center overflow-hidden">
      <BeaconBackdrop tint={false} />

      {/* Foreground content (transparent to pointer so the 3D parallax stays alive) */}
      <div className="pointer-events-none container mx-auto max-w-5xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
          Health, Education, and AI
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-balance sm:text-xl">
          HEAL Lab studies and builds human-centered AI systems that improve how
          people learn, understand, and care for health, from clinical simulation
          to wearable devices.
        </p>

        <p className="mx-auto mt-5 max-w-xl text-base text-foreground/80">
          <span className="font-semibold text-foreground">Now building: BEACON,</span>{" "}
          as an edge-AI platform in wearable and mobile devices for community health.
        </p>

        <div className="pointer-events-auto mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 rounded-xl px-7 text-base">
            <Link to="/projects/beacon">
              Explore BEACON
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-xl px-7 text-base"
          >
            <a href="mailto:yzhang5@stmarytx.edu">Contact Us</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default BeaconHero;
