import { useCallback, useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import { Button } from "@/components/ui/button";
import { revealGift } from "@/lib/gifts.functions";

type Prize = {
  tag: string;
  title: string;
  text: string;
  imageKey: string;
};

const BOXES = ["01", "02", "03", "04"];

async function loadImage(key: string): Promise<string | null> {
  switch (key) {
    case "horizon":
      return (await import("@/assets/lot-horizon.jpg")).default;
    case "signature":
      return (await import("@/assets/lot-signature.jpg")).default;
    case "support250":
      return (await import("@/assets/lot-support-250.jpg")).default;
    case "support170":
      return (await import("@/assets/lot-support-170.jpg")).default;
    default:
      return null;
  }
}

function Confetti() {
  const pieces = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
      {pieces.map((_, i) => {
        const angle = (i / pieces.length) * 360;
        const distance = 70 + ((i * 13) % 60);
        return (
          <span
            key={i}
            className="confetti-piece"
            style={
              {
                "--cx": `${Math.cos((angle * Math.PI) / 180) * distance}px`,
                "--cy": `${Math.sin((angle * Math.PI) / 180) * distance - 40}px`,
                animationDelay: `${(i % 6) * 40}ms`,
                background:
                  i % 3 === 0
                    ? "var(--color-gold)"
                    : i % 3 === 1
                      ? "var(--color-primary)"
                      : "var(--color-accent)",
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

function ClosedBox({ opened }: { opened: boolean }) {
  return (
    <div className="relative mx-auto h-32 w-36 sm:h-36 sm:w-40">
      {/* couvercle */}
      <div
        className="absolute left-0 right-0 top-4 h-7 rounded-md border border-border bg-primary shadow-soft transition-transform duration-700 ease-out"
        style={{
          transform: opened ? "translateY(-58px) rotate(-14deg)" : "translateY(0) rotate(0deg)",
        }}
      >
        <div className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 bg-gold/80" />
        <div className="absolute left-1/2 -top-4 h-5 w-10 -translate-x-1/2 rounded-full border-4 border-gold/80" />
      </div>
      {/* corps */}
      <div className="absolute bottom-0 left-2 right-2 top-10 overflow-hidden rounded-md border border-border bg-secondary shadow-soft">
        <div className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 bg-gold/80" />
      </div>
    </div>
  );
}

export function GiftBoxes() {
  const reveal = useServerFn(revealGift);
  const [chosen, setChosen] = useState<number | null>(null);
  const [prize, setPrize] = useState<Prize | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPick = useCallback(
    async (index: number) => {
      if (chosen !== null || loading) return;
      setChosen(index);
      setLoading(true);
      setError(null);
      try {
        const result = (await reveal({ data: { boxIndex: index } })) as Prize;
        setPrize(result);
        setImage(await loadImage(result.imageKey));
      } catch {
        setError("Une erreur est survenue. Rechargez la page pour réessayer.");
      } finally {
        setLoading(false);
      }
    },
    [chosen, loading, reveal],
  );

  return (
    <div className="mt-12">
      <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
        {BOXES.map((label, index) => {
          const isChosen = chosen === index;
          const isLocked = chosen !== null && !isChosen;
          return (
            <button
              key={label}
              type="button"
              onClick={() => void onPick(index)}
              disabled={chosen !== null}
              aria-label={`Ouvrir la boîte ${label}`}
              className={`relative overflow-visible rounded-2xl border border-border bg-card p-5 text-center shadow-soft transition-all duration-500 ${
                isLocked
                  ? "cursor-not-allowed opacity-45"
                  : chosen === null
                    ? "cursor-pointer hover:-translate-y-1 hover:shadow-lift"
                    : "cursor-default"
              } ${isChosen ? "shadow-lift ring-2 ring-gold" : ""}`}
            >
              {isChosen && !loading && prize ? <Confetti /> : null}
              <ClosedBox opened={isChosen && !!prize} />
              <span className="eyebrow mt-4 block">Boîte {label}</span>
              {isChosen ? (
                <div className="mt-2 min-h-[3.5rem]">
                  {loading ? (
                    <p className="text-sm text-muted-foreground">Ouverture…</p>
                  ) : prize ? (
                    <>
                      <p className="text-lg leading-snug text-foreground">{prize.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {prize.text}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
                </div>
              ) : (
                <p className="mt-2 min-h-[3.5rem] text-xs leading-relaxed text-muted-foreground">
                  {chosen === null ? "Touchez pour ouvrir" : "Choix déjà effectué"}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {prize ? (
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-lift sm:flex">
          {image ? (
            <img
              src={image}
              alt={prize.title}
              loading="lazy"
              className="h-56 w-full object-cover sm:h-auto sm:w-1/2"
            />
          ) : null}
          <div className="space-y-3 p-7 sm:w-1/2">
            <span className="eyebrow">{prize.tag} · Votre lot</span>
            <h3 className="text-2xl text-foreground">{prize.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{prize.text}</p>
            <Button asChild variant="ink" className="mt-2 rounded-full">
              <a href="#contact">Réclamer ce lot</a>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
