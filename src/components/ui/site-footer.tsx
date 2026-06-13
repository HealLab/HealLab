export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-4 py-3 text-center text-xs text-muted-foreground/50">
      © {year} Health, Education, and AI Lab
    </footer>
  );
}

export default SiteFooter;
