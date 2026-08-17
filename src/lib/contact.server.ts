import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { ContactInput } from "./contact.functions";

export const NOTIFICATION_RECIPIENT = "justebyrne@gmail.com";

function getPublicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export type StoredContactMessage = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

export async function insertContactMessage(data: ContactInput): Promise<StoredContactMessage> {
  const { data: row, error } = await getPublicClient()
    .from("contact_messages")
    .insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      subject: data.subject,
      message: data.message,
    })
    .select("id, first_name, last_name, email, subject, message, created_at")
    .single();

  if (error || !row) {
    throw new Error(error?.message ?? "Enregistrement impossible");
  }

  return row as StoredContactMessage;
}

/**
 * Sends the internal notification for a new contact request.
 * Returns false (without throwing) when managed email sending is not
 * available yet, so the visitor's message is never lost.
 */
export async function notifyNewContactMessage(row: StoredContactMessage): Promise<boolean> {
  try {
    const mod = (await import("./email-notification.server").catch(() => null)) as {
      sendContactNotification?: (row: StoredContactMessage) => Promise<boolean>;
    } | null;

    if (!mod?.sendContactNotification) return false;
    return await mod.sendContactNotification(row);
  } catch (error) {
    console.error("[contact] notification failed", error);
    return false;
  }
}
