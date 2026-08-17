import type { ContactInput } from "./contact.functions";

export const NOTIFICATION_RECIPIENT = "justebyrne@gmail.com";

export type StoredContactMessage = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

/**
 * Stores a contact request through the Data API as the anonymous role.
 * The anonymous role may insert but never read, so the row identity is
 * generated here instead of relying on a returning select.
 */
export async function insertContactMessage(data: ContactInput): Promise<StoredContactMessage> {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;

  const row: StoredContactMessage = {
    id: crypto.randomUUID(),
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    subject: data.subject,
    message: data.message,
    created_at: new Date().toISOString(),
  };

  const response = await fetch(`${url}/rest/v1/contact_messages`, {
    method: "POST",
    headers: {
      apikey: key,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`[contact] insert failed [${response.status}]: ${body}`);
    throw new Error("Enregistrement impossible");
  }

  return row;
}

/**
 * Sends the internal notification for a new contact request.
 * Returns false (without throwing) when managed email sending is not
 * available yet, so the visitor's message is never lost.
 */
export async function notifyNewContactMessage(row: StoredContactMessage): Promise<boolean> {
  try {
    const mod = await import("./email-notification.server");
    return await mod.sendContactNotification(row);
  } catch (error) {
    console.error("[contact] notification failed", error);
    return false;
  }
}
