import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WHATSAPP_URL = "https://wa.me/18258771057";
export const TELEGRAM_URL = "https://t.me/Justeayero33";

export function ContactChannels({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Button asChild variant="whatsapp" size="xl" className="w-full sm:w-auto">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <MessageCircle aria-hidden="true" />
          Nous contacter sur WhatsApp
        </a>
      </Button>
      <Button asChild variant="telegram" size="xl" className="w-full sm:w-auto">
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
          <Send aria-hidden="true" />
          Nous contacter sur Telegram
        </a>
      </Button>
    </div>
  );
}
