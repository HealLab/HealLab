import { cn } from "@/lib/utils";

export type Stat = {
  value: string;
  label: string;
};

export function StatCard({ value, label, className }: Stat & { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-card/70 p-6 text-center shadow-sm backdrop-blur",
        className
      )}
    >
      <div className="font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
        {value}
      </div>
      <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export default StatCard;
