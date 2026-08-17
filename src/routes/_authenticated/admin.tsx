import { useEffect, useState, useCallback } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Loader2, Trash2, RefreshCw, Mail } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

const title = "Messages reçus · Northstar Selection";
const description = "Tableau de bord des demandes envoyées depuis le formulaire de contact.";

export const Route = createFileRoute("/_authenticated/admin")({
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
  component: AdminPage,
});

const formatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "short",
});

function AdminPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: queryError } = await supabase
      .from("contact_messages")
      .select("id, first_name, last_name, email, subject, message, created_at")
      .order("created_at", { ascending: false });

    if (queryError) {
      setError(
        "Impossible de charger les messages. Votre compte doit disposer du rôle administrateur.",
      );
    } else {
      setMessages((data ?? []) as Message[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function remove(id: string) {
    if (!window.confirm("Supprimer définitivement cette demande ?")) return;
    setDeletingId(id);
    const { error: deleteError } = await supabase.from("contact_messages").delete().eq("id", id);
    if (deleteError) {
      setError("Suppression impossible. Réessayez.");
    } else {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
    setDeletingId(null);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  return (
    <div className="min-h-screen bg-sand/40 py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Tableau de bord</p>
            <h1 className="mt-3 text-4xl text-foreground">Messages reçus</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {messages.length} demande{messages.length > 1 ? "s" : ""} enregistrée
              {messages.length > 1 ? "s" : ""}.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="quiet" onClick={() => void load()}>
              <RefreshCw aria-hidden="true" />
              Actualiser
            </Button>
            <Button variant="ghost" onClick={() => void signOut()}>
              Se déconnecter
            </Button>
          </div>
        </div>

        {error && (
          <p className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-foreground">
            {error}
          </p>
        )}

        <div className="mt-8 space-y-4">
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Chargement…
            </div>
          )}

          {!loading && !error && messages.length === 0 && (
            <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
              Aucun message pour le moment.
            </p>
          )}

          {messages.map((m) => (
            <article
              key={m.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl text-foreground">{m.subject}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {m.first_name} {m.last_name} ·{" "}
                    <a href={`mailto:${m.email}`} className="underline-offset-4 hover:underline">
                      {m.email}
                    </a>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Reçu le {formatter.format(new Date(m.created_at))}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="quiet" size="sm">
                    <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}>
                      <Mail aria-hidden="true" />
                      Répondre
                    </a>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => void remove(m.id)}
                    disabled={deletingId === m.id}
                  >
                    <Trash2 aria-hidden="true" />
                    Supprimer
                  </Button>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap border-t border-border pt-4 text-sm leading-relaxed text-foreground">
                {m.message}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            ← Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
}
