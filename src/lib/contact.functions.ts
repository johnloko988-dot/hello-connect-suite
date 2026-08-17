import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Le prénom est requis").max(100),
  lastName: z.string().trim().min(1, "Le nom est requis").max(100),
  email: z.string().trim().email("Adresse e-mail invalide").max(255),
  subject: z.string().trim().min(1, "L'objet est requis").max(150),
  message: z.string().trim().min(5, "Le message est trop court").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { insertContactMessage, notifyNewContactMessage } = await import("./contact.server");

    const row = await insertContactMessage(data);
    const notified = await notifyNewContactMessage(row);

    return { ok: true as const, notified };
  });
