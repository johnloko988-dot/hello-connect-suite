import type { StoredContactMessage } from "./contact.server";

/**
 * Sends the "new contact request" notification.
 *
 * Managed email sending requires a verified sender domain for the project.
 * Until the domain is configured, this returns false so the visitor's message
 * is still stored and visible in the admin dashboard.
 */
export async function sendContactNotification(row: StoredContactMessage): Promise<boolean> {
  console.info("[contact] nouveau message enregistré", {
    id: row.id,
    email: row.email,
    subject: row.subject,
  });
  return false;
}
