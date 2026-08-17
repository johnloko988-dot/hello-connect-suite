import { Button } from "@/components/ui/button";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#lots", label: "Les 4 choix" },
  { href: "#procedure", label: "Procédure" },
  { href: "#conditions", label: "Conditions" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a href="#accueil" className="leading-none">
          <span className="block font-[family-name:var(--font-display)] text-lg tracking-tight text-foreground">
            NORTHSTAR
          </span>
          <span className="eyebrow block">Selection</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button asChild variant="gold" size="lg" className="rounded-full">
          <a href="#contact">Nous contacter</a>
        </Button>
      </div>
    </header>
  );
}
