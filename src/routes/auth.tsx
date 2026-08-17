import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const title = "Espace administrateur · Northstar Selection";
const description = "Connexion réservée à l'équipe Northstar Selection pour consulter les messages reçus.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setPending(true);

    try {
      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        navigate({ to: "/admin" });
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (signUpError) throw signUpError;
        setInfo("Compte créé. Connectez-vous, puis demandez l'attribution du rôle administrateur.");
        setMode("signin");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connexion impossible.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand/50 px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lift">
        <p className="eyebrow">Northstar Selection</p>
        <h1 className="mt-3 text-3xl text-foreground">Espace administrateur</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Connectez-vous pour consulter les messages reçus.
        </p>

        <form className="mt-7 space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="admin-email">Adresse e-mail</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Mot de passe</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" variant="ink" size="xl" className="w-full" disabled={pending}>
            {pending ? "Un instant…" : mode === "signin" ? "Se connecter" : "Créer le compte"}
          </Button>
        </form>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        {info && <p className="mt-4 text-sm text-muted-foreground">{info}</p>}

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {mode === "signin" ? "Créer un compte administrateur" : "J'ai déjà un compte"}
        </button>

        <div className="mt-8 border-t border-border pt-5">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            ← Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
}
