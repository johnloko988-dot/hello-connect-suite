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
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  // Visitors write as the anonymous role, which may insert but never read back,
  // so we generate the row identity here instead of using `.select()`.
  const { error } = await getPublicClient().from("contact_messages").insert({
    id,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    subject: data.subject,
    message: data.message,
    created_at: createdAt,
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    id,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    subject: data.subject,
    message: data.message,
    created_at: createdAt,
  };
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
