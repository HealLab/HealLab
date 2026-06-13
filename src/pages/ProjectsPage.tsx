import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/lib/projects";

export function ProjectsPage() {
  const beacon = PROJECTS.find((p) => p.key === "beacon")!;
  const others = PROJECTS.filter((p) => p.key !== "beacon");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        {/* Intro */}
        <section className="relative overflow-hidden border-b border-border/60">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(50% 60% at 80% 0%, color-mix(in oklch, var(--accent-beacon) 14%, transparent), transparent 70%), var(--background)",
            }}
          />
          <div className="container mx-auto max-w-5xl px-4 py-20 sm:py-24">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Projects
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Research initiatives across health, education, and AI
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              We build and study human-centered AI systems for real health
              needs, from clinical simulation training to wearable community
              health. Explore each initiative below.
            </p>
          </div>
        </section>

        {/* Featured: BEACON */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <Link
            to={beacon.to!}
            className="group block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2"
          >
            <div className="relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-md sm:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
              />
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Featured project
              </span>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                {beacon.acronym}
              </h2>
              <p className="mt-2 max-w-2xl text-lg font-medium text-foreground/80">
                {beacon.expansion}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {beacon.blurb}
              </p>
              <span className="mt-7 inline-flex items-center gap-1.5 text-base font-semibold text-primary">
                Explore BEACON
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </section>

        {/* Other projects */}
        <section className="container mx-auto max-w-6xl px-4 pb-20">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            More initiatives
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.key} project={p} />
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center">
            <h3 className="font-display text-xl font-semibold">
              Want to collaborate?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              We welcome students of all majors, faculty collaborators, and
              community partners. Reach out to start a conversation.
            </p>
            <Button asChild className="mt-5">
              <a href="mailto:yzhang5@stmarytx.edu">Get in touch</a>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default ProjectsPage;
