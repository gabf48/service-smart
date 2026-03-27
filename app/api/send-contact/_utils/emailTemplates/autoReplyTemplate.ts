import type { AutoReplyArgs } from "../contactEmailTypes";
import { escapeHtml, nl2br } from "../contactEmailHelpers";

export function buildAutoReplyHtml({
  name,
  email,
  phone,
  reason,
  description,
  siteUrl,
}: AutoReplyArgs) {
  const safeName = escapeHtml(name || "-");
  const safeEmail = escapeHtml(email || "-");
  const safePhone = escapeHtml(phone || "-");
  const safeReason = escapeHtml(reason || "-");
  const safeDescription = nl2br(description || "-");
  const safeSiteUrl = escapeHtml(siteUrl);

  return `
    <div style="margin:0;padding:0;background:#0b0f17;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">
      <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
        <div style="border:1px solid rgba(255,255,255,0.08);background:linear-gradient(180deg,#0f172a 0%,#0b1220 100%);border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.45);">
          
          <div style="padding:28px 28px 18px 28px;background:linear-gradient(180deg,rgba(37,99,235,0.14) 0%,rgba(15,23,42,0) 100%);border-bottom:1px solid rgba(255,255,255,0.06);">
            <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#93c5fd;font-weight:700;">
              Service Smart
            </div>
            <h1 style="margin:14px 0 8px 0;font-size:28px;line-height:1.15;color:#ffffff;">
              Mesaj primit
            </h1>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#cbd5e1;">
              Bună${name ? `, ${safeName}` : ""}! Îți confirmăm că am primit solicitarea ta.
            </p>
          </div>

          <div style="padding:28px;">
            <div style="margin-bottom:22px;padding:18px;border:1px solid rgba(255,255,255,0.08);border-radius:16px;background:rgba(255,255,255,0.03);">
              <p style="margin:0 0 10px 0;font-size:14px;line-height:1.7;color:#e5e7eb;">
                Revenim către tine în cel mai scurt timp posibil după ce analizăm mesajul trimis.
              </p>
              <p style="margin:0;font-size:14px;line-height:1.7;color:#94a3b8;">
                Mai jos ai un rezumat al solicitării tale.
              </p>
            </div>

            <div style="padding:18px;border:1px solid rgba(255,255,255,0.08);border-radius:16px;background:#0f172a;">
              <div style="font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#93c5fd;margin-bottom:12px;">
                Detalii trimise
              </div>

              <p style="margin:0 0 8px 0;font-size:14px;color:#e5e7eb;"><b>Nume:</b> ${safeName}</p>
              <p style="margin:0 0 8px 0;font-size:14px;color:#e5e7eb;"><b>Email:</b> ${safeEmail}</p>
              <p style="margin:0 0 8px 0;font-size:14px;color:#e5e7eb;"><b>Telefon:</b> ${safePhone}</p>
              <p style="margin:0 0 8px 0;font-size:14px;color:#e5e7eb;"><b>Motiv:</b> ${safeReason}</p>
              <p style="margin:0;font-size:14px;line-height:1.7;color:#e5e7eb;">
                <b>Mesaj:</b><br/>
                ${safeDescription}
              </p>
            </div>

            <div style="margin-top:22px;text-align:center;">
              <a href="${safeSiteUrl}/contact"
                 style="display:inline-block;padding:14px 24px;background:#2563eb;color:#ffffff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:700;box-shadow:0 10px 30px rgba(37,99,235,0.35);">
                Revino pe site
              </a>
            </div>
          </div>

          <div style="padding:18px 28px;border-top:1px solid rgba(255,255,255,0.06);background:rgba(0,0,0,0.18);">
            <p style="margin:0;font-size:12px;line-height:1.7;color:#94a3b8;">
              Acest mesaj a fost trimis automat de <span style="color:#e5e7eb;font-weight:700;">Service Smart</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}