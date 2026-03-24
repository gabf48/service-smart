import { supabase } from "@/lib/supabase";

type SubmitArgs = {
  user: any;
  name: string;
  email: string;
  reason: string;
  description: string;
  phone: string;
  files: FileList | null;
};

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export async function submitContactForm({
  user,
  name,
  email,
  reason,
  description,
  phone,
  files,
}: SubmitArgs) {
  const uploadedUrls: string[] = [];

  if (files?.length) {
  if (files.length > MAX_FILES) {
    throw new Error(`Poți încărca maximum ${MAX_FILES} fișiere.`);
  }

  const invalidFile = Array.from(files).find(
    (file) => file.size > MAX_FILE_SIZE_BYTES
  );

  if (invalidFile) {
    throw new Error(
      `Fișierul "${invalidFile.name}" depășește limita de ${MAX_FILE_SIZE_MB} MB.`
    );
  }

  const uploadPromises = Array.from(files).map(async (file) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("contact-uploads")
      .upload(fileName, file);

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    const { data } = supabase.storage
      .from("contact-uploads")
      .getPublicUrl(fileName);

    return data.publicUrl;
  });

  const urls = await Promise.all(uploadPromises);
  uploadedUrls.push(...urls);
}

  const finalEmail = user?.email || email;

  const { error: dbErr } = await supabase.from("contact_requests").insert([
    {
      user_id: user?.id || null,
      name,
      email: finalEmail,
      reason,
      description,
      phone,
      attachments: uploadedUrls,
    },
  ]);

  if (dbErr) {
    throw new Error(dbErr.message);
  }

  await fetch("/api/send-contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email: finalEmail,
      phone,
      reason,
      description,
      attachments: uploadedUrls,
    }),
  });
}