import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, phone, reason, description, attachments } = body;

  const { error } = await resend.emails.send({
    from: "Service Smart <contact@service-smart.ro>",
    to: ["contact@service-smart.ro"],
    subject: `Contact nou: ${reason}`,
    html: `
      <h2>Mesaj nou din formular</h2>

      <b>Nume:</b> ${name}<br/>
      <b>Email:</b> ${email}<br/>
      <b>Telefon:</b> ${phone || "-"}<br/>
      <b>Motiv:</b> ${reason}<br/>

      <p><b>Descriere:</b></p>
      <p>${description}</p>

      <p><b>Fișiere:</b></p>
      ${attachments?.map((a: string) => `<a href="${a}">${a}</a><br/>`).join("") || "Niciun fișier"}
    `,
  });

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ success: true });
}