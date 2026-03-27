import { sendContactEmails } from "./_utils/contactMailer";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await sendContactEmails(body);

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 500 });
  }

  return Response.json({ success: true });
}