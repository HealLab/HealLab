import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

function StatusBadge({ status }: { status: Project["status"] }) {
  if (status === "tba") {
    return (
      <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
        To Be Announced
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {status === "featured" ? "Featured" : "Active"}
    </span>
  );
}

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const isTba = project.status === "tba";

  const inner = (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-6 text-card-foreground shadow-sm transition-all",
        isTba
          ? "border-dashed opacity-80"
          : "hover:-translate-y-1 hover:shadow-md hover:border-primary/40",
        className
      )}
    >
      {/* faint accent corner */}
      {!isTba && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100"
        />
      )}

      <div className="flex items-center justify-between gap-2">
        <span className="font-display text-2xl font-semibold tracking-tight">
          {project.acronym}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <p className="mt-1 text-sm font-medium text-foreground/80">
        {project.expansion}
      </p>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.blurb}
      </p>

      {!isTba && (
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Explore project
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </div>
  );

  if (isTba || !project.to) return inner;

  return (
    <Link to={project.to} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 rounded-2xl">
      {inner}
    </Link>
  );
}

export default ProjectCard;
