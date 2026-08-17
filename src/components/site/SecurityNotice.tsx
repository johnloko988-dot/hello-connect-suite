import { ShieldCheck } from "lucide-react";

export function SecurityNotice({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-border bg-sand/70 p-4 text-sm text-muted-foreground ${className}`}
    >
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
      <p>
        <span className="font-semibold text-foreground">Sécurité :</span> ne transmettez jamais de
        mot de passe, numéro de carte bancaire, CVV, code PIN, code SMS/OTP ou identifiants
        bancaires — ni par ce formulaire, ni par WhatsApp, ni par Telegram. Nous ne les demandons
        jamais.
      </p>
    </div>
  );
}
