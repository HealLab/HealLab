import {
  Footprints,
  ThermometerSun,
  Wind,
} from "lucide-react";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { BeaconBackdrop } from "@/components/ui/beacon-backdrop";
import { StatCard } from "@/components/ui/stat-card";
import { AvatarCard } from "@/components/ui/avatar-card";
import { Button } from "@/components/ui/button";

const EXAMPLES = [
  {
    icon: ThermometerSun,
    title: "Heat-strain early warning",
    body: "Personalized, on-device alerts that flag dangerous heat strain before it becomes an emergency.",
  },
  {
    icon: Footprints,
    title: "Pre-fall gait & balance screening",
    body: "Co-designed with older adults to spot balance changes that precede falls, from everyday wearable signals.",
  },
  {
    icon: Wind,
    title: "Air-and-breath respiratory companion",
    body: "Fuses wearable signals with air-quality data into a respiratory companion for vulnerable community members.",
  },
];

const STATS = [
  { value: "50+", label: "students across 5+ partner institutions" },
  { value: "3+", label: "open example edge-AI models" },
  { value: "100%", label: "teams complete a responsible-AI review" },
  { value: "2–4", label: "student papers, posters, or demos" },
];

const TEAM = [
  {
    name: "Dr. Yike Zhang",
    href: "https://yikezhang.me",
    subtitle:
      "Project Lead (PI) · Assistant Professor, St. Mary's University. Deep-learning medical imaging and human-in-the-loop AI.",
    external: true,
  },
  {
    name: "Dr. Wenbin Luo",
    subtitle:
      "Co-PI · Engineering faculty, St. Mary's University. IEEE Senior Member and Student Branch advisor; embedded & computer engineering.",
  },
  {
    name: "Dr. Eduardo Davalos",
    href: "https://edavalosanaya.github.io",
    subtitle:
      "Co-PI · Assistant Professor, Trinity University. AI in education, HCI, and human-AI collaboration.",
    external: true,
  },
];

export function BeaconPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        {/* Banner */}
        <section className="relative isolate overflow-hidden">
          {/* <BeaconBackdrop tint={false} /> */}
          <div className="container mx-auto max-w-5xl px-6 py-24 sm:py-28">
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-6xl">
              BEACON
            </h1>
            <p className="mt-3 max-w-2xl text-xl font-medium text-foreground/80">
              Building Wearable & Mobile Edge Intelligence for Community Health
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              BEACON provides a shared WearOS and Android edge-AI platform that a
              community co-builds, where students focus on AI and human-centered
              design for community health. Guided by mentors, interdisciplinary
              teams build, deploy, and demonstrate responsible AI health
              solutions through a public showcase.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-xl px-7 text-base">
                <a href="mailto:yzhang5@stmarytx.edu">
                  Get involved
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl px-7 text-base"
              >
                <a href="#commons">How it works</a>
              </Button>
            </div>
          </div>
        </section>

        {/* The BEACON Commons */}
        <section id="commons" className="scroll-mt-24 py-20 sm:py-24">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              The BEACON Commons
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Standardize the infrastructure, provide students to build Human-Centered AI
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              The BEACON Commons is a shared, open stack, WearOS smartwatches, Android
              phones, a ready data pipeline, starter models, and a public model
              zoo, so interdisciplinary teams skip the setup and focus on
              responsible, on-device AI and human-centered design. Everything
              teams create flows back into the Commons as a reusable,
              community-health sensing testbed.
            </p>
          </div>
        </section>

        {/* Example projects */}
        <section className="border-t border-border/60 py-20 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Example community projects
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Student teams choose a problem and sensor configuration, then
                build on-device models. A few directions we expect:
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {EXAMPLES.map((e) => {
                const Icon = e.icon;
                return (
                  <div
                    key={e.title}
                    className="rounded-2xl border bg-card p-6 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                      {e.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {e.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="border-t border-border/60 py-20 sm:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Expected impact
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Top goals we will measure across the program.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <StatCard key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="border-t border-border/60 py-20 sm:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Lead team
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TEAM.map((m) => (
                <AvatarCard
                  key={m.name}
                  name={m.name}
                  href={m.href}
                  subtitle={m.subtitle}
                  external={m.external}
                  size="lg"
                />
              ))}
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}

export default BeaconPage;
