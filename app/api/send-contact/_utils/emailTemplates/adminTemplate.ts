import type { AdminTemplateArgs } from "../contactEmailTypes";
import { escapeHtml, nl2br } from "../contactEmailHelpers";

export function buildAdminContactEmailHtml({
  name,
  email,
  phone,
  reason,
  description,
  attachments,
}: AdminTemplateArgs) {
  const safeName = escapeHtml(name || "-");
  const safeEmail = escapeHtml(email || "-");
  const safePhone = escapeHtml(phone || "-");
  const safeReason = escapeHtml(reason || "-");
  const safeDescription = nl2br(description || "-");

  const attachmentsHtml = attachments?.length
    ? attachments
        .map((url) => {
          const safeUrl = escapeHtml(url);
          return `<a href="${safeUrl}">${safeUrl}</a><br/>`;
        })
        .join("")
    : "Niciun fișier";

  return `
    <h2>Mesaj nou din formular</h2>

    <b>Nume:</b> ${safeName}<br/>
    <b>Email:</b> ${safeEmail}<br/>
    <b>Telefon:</b> ${safePhone}<br/>
    <b>Motiv:</b> ${safeReason}<br/>

    <p><b>Descriere:</b></p>
    <p>${safeDescription}</p>

    <p><b>Fișiere:</b></p>
    ${attachmentsHtml}
  `;
}