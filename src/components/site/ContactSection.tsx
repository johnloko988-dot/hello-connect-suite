import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, submitContactMessage } from "@/lib/contact.functions";
import { ContactChannels } from "./ContactChannels";
import { SecurityNotice } from "./SecurityNotice";

type Status = { kind: "idle" } | { kind: "sent" } | { kind: "error"; message: string };

const emptyForm = { firstName: "", lastName: "", email: "", subject: "", message: "" };

export function ContactSection() {
  const send = useServerFn(submitContactMessage);
  const [form, setForm] = useState(emptyForm);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const update = (key: keyof typeof emptyForm) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "idle" });

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setStatus({
        kind: "error",
        message: parsed.error.issues[0]?.message ?? "Merci de vérifier les champs du formulaire.",
      });
      return;
    }

    setPending(true);
    try {
      await send({ data: parsed.data });
      setForm(emptyForm);
      setStatus({ kind: "sent" });
    } catch (error) {
      console.error(error);
      setStatus({
        kind: "error",
        message:
          "L'envoi a échoué. Vérifiez votre connexion et réessayez, ou écrivez-nous sur WhatsApp ou Telegram.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border bg-sand/40 py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">04 / Nous contacter</p>
          <h2 className="mt-4 text-4xl leading-tight text-foreground sm:text-5xl">
            Une équipe joignable, <span className="text-gradient-gold">simplement.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Une question sur la procédure, l'admissibilité ou les critères ? Écrivez-nous : chaque
            demande est enregistrée et reçoit une réponse.
          </p>

          <ContactChannels className="mt-8" />
          <SecurityNotice className="mt-8 max-w-md" />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-9">
          <h3 className="text-2xl text-foreground">Envoyer un message</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Tous les champs sont requis. Aucune information bancaire ne doit être renseignée.
          </p>

          <form className="mt-7 space-y-5" onSubmit={onSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  maxLength={100}
                  value={form.firstName}
                  onChange={(e) => update("firstName")(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  maxLength={100}
                  value={form.lastName}
                  onChange={(e) => update("lastName")(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={255}
                value={form.email}
                onChange={(e) => update("email")(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Objet</Label>
              <Input
                id="subject"
                name="subject"
                maxLength={150}
                value={form.subject}
                onChange={(e) => update("subject")(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                maxLength={5000}
                value={form.message}
                onChange={(e) => update("message")(e.target.value)}
              />
            </div>

            <Button type="submit" variant="ink" size="xl" className="w-full" disabled={pending}>
              {pending ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
              {pending ? "Envoi en cours…" : "Envoyer le message"}
            </Button>

            <div aria-live="polite">
              {status.kind === "sent" && (
                <p className="flex items-start gap-2 rounded-xl border border-border bg-secondary p-4 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-whatsapp" aria-hidden="true" />
                  Votre message a bien été envoyé. Nous vous répondrons prochainement.
                </p>
              )}
              {status.kind === "error" && (
                <p className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-foreground">
                  <AlertCircle
                    className="mt-0.5 size-4 shrink-0 text-destructive"
                    aria-hidden="true"
                  />
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
