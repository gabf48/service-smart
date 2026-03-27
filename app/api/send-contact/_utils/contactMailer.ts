import { Resend } from "resend";
import {
  buildAdminContactEmailHtml,
  buildAutoReplyHtml,
} from "./emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://service-smart.ro";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  reason?: string;
  description: string;
  attachments?: string[];
};

export async function sendContactEmails(body: ContactPayload) {
  const { name, email, phone, reason, description, attachments } = body;

  const adminEmail = await resend.emails.send({
    from: "Service Smart <contact@service-smart.ro>",
    to: ["contact@service-smart.ro"],
    subject: `Contact nou: ${reason || "Fără motiv"}`,
    html: buildAdminContactEmailHtml({
      name,
      email,
      phone,
      reason,
      description,
      attachments,
    }),
  });

  if (adminEmail.error) {
    return { ok: false as const, error: adminEmail.error };
  }

  const autoReply = await resend.emails.send({
    from: "Service Smart <contact@service-smart.ro>",
    to: [email],
    subject: "Am primit solicitarea ta • Service Smart",
    html: buildAutoReplyHtml({
      name,
      email,
      phone,
      reason,
      description,
      siteUrl,
    }),
  });

  if (autoReply.error) {
    console.error("Auto-reply failed:", autoReply.error);
  }

  return { ok: true as const };
}