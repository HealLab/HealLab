import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { BeaconHero } from "@/components/ui/beacon-hero";

export function HomePage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <SiteHeader />
      <main className="min-h-0 flex-1">
        <BeaconHero />
      </main>
      <SiteFooter />
    </div>
  );
}

export default HomePage;
