import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ContactSection } from "@/components/site/ContactSection";
import { SecurityNotice } from "@/components/site/SecurityNotice";
import heroImage from "@/assets/hero.jpg";
import lotHorizon from "@/assets/lot-horizon.jpg";
import lotSignature from "@/assets/lot-signature.jpg";
import lotSupport250 from "@/assets/lot-support-250.jpg";
import lotSupport170 from "@/assets/lot-support-170.jpg";

const title = "Northstar Selection · Une sélection qui compte";
const description =
  "Quatre lots proposés par un donateur canadien. Découvrez la sélection, la procédure et contactez l'équipe par formulaire, WhatsApp ou Telegram.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const lots = [
  {
    index: "01",
    tag: "Mobilité",
    title: "Tesla 2026 · Horizon",
    text: "Une mobilité électrique pensée pour demain, sobre et lumineuse.",
    image: lotHorizon,
    alt: "Berline électrique blanche stationnée dans une lumière matinale douce",
  },
  {
    index: "02",
    tag: "Mobilité",
    title: "Tesla 2026 · Signature",
    text: "Une autre vision de la conduite électrique, plus affirmée.",
    image: lotSignature,
    alt: "Berline électrique graphite sur une route côtière à l'heure dorée",
  },
  {
    index: "03",
    tag: "Soutien",
    title: "250 000 $",
    text: "Un soutien financier majeur pour ouvrir un nouveau chapitre.",
    image: lotSupport250,
    alt: "Composition abstraite crème traversée d'une lumière dorée",
  },
  {
    index: "04",
    tag: "Soutien",
    title: "170 000 $",
    text: "Une contribution pensée pour faire avancer vos projets.",
    image: lotSupport170,
    alt: "Composition abstraite ivoire et vert sauge avec arcs dorés",
  },
];

const steps = [
  { n: "01", label: "Explorez les quatre lots", text: "Prenez le temps de comparer la sélection." },
  {
    n: "02",
    label: "Sélectionnez celui qui vous intéresse",
    text: "Un seul lot par demande, pour rester clair.",
  },
  {
    n: "03",
    label: "Complétez vos coordonnées",
    text: "Nom, e-mail et objet suffisent. Rien de bancaire.",
  },
  {
    n: "04",
    label: "Recevez les prochaines étapes",
    text: "Notre équipe revient vers vous par e-mail.",
  },
];

const conditions = [
  {
    title: "Admissibilité",
    text: "La sélection est ouverte aux personnes majeures qui fournissent des coordonnées exactes et respectent les critères communiqués par l'organisateur.",
  },
  {
    title: "Validation",
    text: "Toute demande est examinée avant confirmation. Des informations complémentaires peuvent être demandées. Aucun paiement ne doit être envoyé pour participer.",
  },
  {
    title: "Réclamation",
    text: "Pour toute question, contactez l'organisateur avec votre nom, la date de votre demande et une description précise du problème.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section id="accueil" className="relative scroll-mt-24 overflow-hidden">
          <img
            src={heroImage}
            alt="Lac canadien au lever du jour, brume dorée sur l'eau"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-hero)" }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
            <p className="eyebrow">Édition privée · Canada</p>
            <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] text-foreground sm:text-7xl">
              Votre prochaine histoire <span className="text-gradient-gold">commence ici.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Quatre lots. Une sélection personnelle. Une procédure claire, conçue avec le plus
              grand soin.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="ink" size="xl">
                <a href="#lots">Découvrir les lots</a>
              </Button>
              <Button asChild variant="quiet" size="xl">
                <a href="#conditions">Lire les conditions</a>
              </Button>
            </div>
            <p className="mt-8 max-w-lg text-xs leading-relaxed text-muted-foreground">
              Aucun lot n'est garanti avant validation de l'admissibilité et acceptation des
              conditions officielles.
            </p>
          </div>
        </section>

        {/* Lots */}
        <section id="lots" className="scroll-mt-24 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="eyebrow">01 / La sélection</p>
            <h2 className="mt-4 text-4xl text-foreground sm:text-5xl">Choisissez avec attention</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Les visuels présentent les lots de manière indicative. La sélection finale dépend de
              l'admissibilité et des conditions applicables.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {lots.map((lot) => (
                <article
                  key={lot.index}
                  className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={lot.image}
                      alt={lot.alt}
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="space-y-3 p-7">
                    <div className="flex items-center gap-3">
                      <span className="font-[family-name:var(--font-display)] text-2xl text-gold">
                        {lot.index}
                      </span>
                      <span className="eyebrow">{lot.tag}</span>
                    </div>
                    <h3 className="text-2xl text-foreground">{lot.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{lot.text}</p>
                    <Button asChild variant="quiet" className="mt-2 rounded-full">
                      <a href="#contact">Choisir ce lot</a>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Procédure */}
        <section
          id="procedure"
          className="scroll-mt-24 border-y border-border bg-secondary/60 py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="eyebrow">02 / Procédure</p>
            <h2 className="mt-4 text-4xl text-foreground sm:text-5xl">
              Simple, humain, transparent.
            </h2>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <li key={step.n} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <span className="font-[family-name:var(--font-display)] text-3xl text-gold">
                    {step.n}
                  </span>
                  <h3 className="mt-4 text-lg leading-snug text-foreground">{step.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Conditions */}
        <section id="conditions" className="scroll-mt-24 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="eyebrow">03 / À savoir</p>
            <h2 className="mt-4 text-4xl text-foreground sm:text-5xl">
              Conditions &amp; transparence
            </h2>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {conditions.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-7 shadow-soft">
                  <h3 className="text-xl text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
            <SecurityNotice className="mt-8" />
          </div>
        </section>

        <ContactSection />
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Northstar Selection — Une présentation informative. Conditions applicables.</p>
          <Link to="/auth" className="transition-colors hover:text-foreground">
            Espace administrateur
          </Link>
        </div>
      </footer>
    </div>
  );
}
