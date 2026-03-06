import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const rating = Number(form.get("rating") || 0);
    const comment = String(form.get("comment") || "").trim();
    const display_name = String(form.get("display_name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const user_id = String(form.get("user_id") || "").trim() || null;

    if (!display_name || !comment) {
      return Response.json({ error: "Nume și review sunt obligatorii." }, { status: 400 });
    }
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return Response.json({ error: "Rating invalid (1-5)." }, { status: 400 });
    }

    const files = form.getAll("files") as File[];
    if (files.length > 3) {
      return Response.json({ error: "Maxim 3 poze." }, { status: 400 });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;
      if (!file.type.startsWith("image/")) {
        return Response.json({ error: "Doar imagini sunt acceptate." }, { status: 400 });
      }

      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const safeExt = ["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "jpg";
      const path = `reviews/${Date.now()}-${Math.random().toString(16).slice(2)}.${safeExt}`;

      const arrayBuffer = await file.arrayBuffer();

      const { error: upErr } = await supabaseAdmin.storage
        .from("reviews-uploads")
        .upload(path, Buffer.from(arrayBuffer), {
          contentType: file.type,
          upsert: false,
        });

      if (upErr) {
        return Response.json({ error: `Upload failed: ${upErr.message}` }, { status: 500 });
      }

      const { data } = supabaseAdmin.storage.from("reviews-uploads").getPublicUrl(path);
      uploadedUrls.push(data.publicUrl);
    }

    const { error: dbErr } = await supabaseAdmin.from("reviews").insert([
      {
        user_id,
        rating,
        comment,
        display_name,
        email: email || null,
        phone: phone || null,
        attachments: uploadedUrls,
        is_approved: false,
      },
    ]);

    if (dbErr) return Response.json({ error: dbErr.message }, { status: 500 });

    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ error: e?.message || "Eroare." }, { status: 500 });
  }
}