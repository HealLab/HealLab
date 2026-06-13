import {
  Bot,
  ClipboardCheck,
  GraduationCap,
  MessageSquare,
} from "lucide-react";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { Button } from "@/components/ui/button";
import {
  PublicationCard,
  type PublicationCardProps,
} from "@/components/ui/publication-card";
import { AvatarCard } from "@/components/ui/avatar-card";

const FOR_INSTRUCTORS = [
  {
    icon: ClipboardCheck,
    title: "Author adaptive scenarios",
    body: "Agents help instructors design and adapt realistic simulation scenarios that reflect real-world clinical challenges, without heavy authoring overhead.",
  },
  {
    icon: MessageSquare,
    title: "In-the-moment support",
    body: "During a session, agents surface cues, prompts, and debrief points so instructors can focus on the learners in front of them.",
  },
];

const FOR_STUDENTS = [
  {
    icon: Bot,
    title: "A practice partner",
    body: "Virtual patients and AI agents let students practice, fail safely, and try again, building confidence before high-stakes care.",
  },
  {
    icon: GraduationCap,
    title: "Personalized feedback",
    body: "Intelligent assessment gives each student targeted, formative guidance tied to what actually happened in their simulation.",
  },
];

const PUBLICATIONS: PublicationCardProps[] = [
  {
    title:
      "Eye movements as predictors of student experiences during nursing simulation learning events",
    authors:
      "M. Lee, C. Vatral, C. Cohn, E. Davalos, M. Jessee, G. Biswas, D. Levin",
    venue: "CRPI",
    year: 2025,
    links: [
      {
        label: "Website",
        href: "https://link.springer.com/article/10.1186/s41235-025-00640-7",
      },
    ],
    imageSrc: `${import.meta.env.BASE_URL}paper_teasers/eye_cognitive_2025.png`,
    imageAlt: "Egocentric view of nursing simulation with gaze overlay",
  },
  {
    title:
      "Prediction of Students’ Self-confidence Using Multimodal Features in an Experiential Nurse Training Environment",
    authors: "C. Vatral, M. Lee, C. Cohn, E. Davalos, D. Levin, G. Biswas",
    venue: "AIED",
    year: 2023,
    links: [
      {
        label: "Website",
        href: "https://link.springer.com/chapter/10.1007/978-3-031-36336-8_41",
      },
    ],
    imageSrc: `${import.meta.env.BASE_URL}paper_teasers/Prediction_AIED2023.png`,
    imageAlt: "Feature set used in analysis",
  },
  {
    title:
      "WEBEYETRACK: Scalable Eye‑Tracking for the Browser via On‑Device Few‑Shot Personalization",
    authors:
      "E. Davalos*, Y. Zhang*, N. Srivastava, Y. Thatigotla, J. A. Salas, S. McFadden, S.-J. Cho, A. Goodwin, A. TS, G. Biswas",
    venue: "arXiv",
    year: 2025,
    links: [
      { label: "Website", href: "https://redforestai.github.io/WebEyeTrack/" },
      { label: "Paper", href: "https://arxiv.org/abs/2508.19544" },
    ],
    imageSrc: `${import.meta.env.BASE_URL}paper_teasers/WebEyeTrack_AAAI2026.jpg`,
    imageAlt: "WebEyeTrack architecture figure",
  },
];

const TEAM = [
  {
    name: "Dr. Yike Zhang",
    href: "https://yikezhang.me",
    subtitle: "Director (PI) · Human-centered AI, AIED, healthcare simulation",
    external: true,
  },
  {
    name: "Dr. Eduardo Davalos",
    href: "https://edavalosanaya.github.io",
    subtitle: "Collaborator · AI in education, HCI, human-AI collaboration",
    external: true,
  },
];

function Column({
  label,
  items,
}: {
  label: string;
  items: { icon: typeof Bot; title: string; body: string }[];
}) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <h3 className="font-display text-xl font-semibold tracking-tight">
        {label}
      </h3>
      <div className="mt-6 space-y-6">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.title} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">{it.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {it.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function KnotPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        {/* Banner */}
        <section className="relative isolate overflow-hidden border-b border-border/60">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-30" />
          <div className="container mx-auto max-w-5xl px-6 py-24 sm:py-28">
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-6xl">
              KNOT
            </h1>
            <p className="mt-3 max-w-2xl text-xl font-medium text-foreground/80">
              Knowledge-infused Nursing Oriented Training
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              KNOT explores how AI agents can assist nursing instructors and
              students during simulation-based training, making high-stakes
              clinical education more adaptive, supportive, and scalable.
            </p>
            <div className="mt-9">
              <Button asChild size="lg" className="h-12 rounded-xl px-7 text-base">
                <a href="mailto:yzhang5@stmarytx.edu">
                  Get involved
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Motivation */}
        <section className="py-20 sm:py-24">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              The challenge
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Simulation training is powerful, but hard to scale
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Simulation-based training prepares nurses for safe, compassionate,
              effective care, yet it is labor-intensive for instructors and
              uneven for students. KNOT asks how AI agents, kept firmly in a
              human-in-the-loop role, can extend an instructor&apos;s reach and
              give every student richer practice and feedback.
            </p>
          </div>
        </section>

        {/* Approach */}
        <section className="border-t border-border/60 py-20 sm:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                AI agents for both sides of the room
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Our approach supports instructors and students alike, before,
                during, and after each scenario.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Column label="For instructors" items={FOR_INSTRUCTORS} />
              <Column label="For students" items={FOR_STUDENTS} />
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="border-t border-border/60 py-20 sm:py-24">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Related publications
            </h2>
            <div className="mt-10 space-y-4">
              {PUBLICATIONS.map((pub) => (
                <PublicationCard key={pub.title} {...pub} />
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="border-t border-border/60 py-20 sm:py-24">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Team
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
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

export default KnotPage;
