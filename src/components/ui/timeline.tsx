import { cn } from "@/lib/utils";

export type TimelineItem = {
  period: string;
  title: string;
  detail: string;
};

export function Timeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <ol className={cn("relative space-y-8 border-l border-border pl-6", className)}>
      {items.map((item, i) => (
        <li key={i} className="relative">
          {/* node */}
          <span
            aria-hidden="true"
            className="absolute -left-[31px] top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-primary bg-background"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {item.period}
          </p>
          <h4 className="mt-0.5 font-display text-lg font-semibold tracking-tight">
            {item.title}
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {item.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

export default Timeline;
