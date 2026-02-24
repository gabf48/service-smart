'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/app/context/AuthContext";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const motivoParam = searchParams.get("motivo") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState(motivoParam || "Cerere oferta");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    let uploadedUrls: string[] = [];

    if (files) {
      for (const file of Array.from(files)) {
        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage
          .from("contact-uploads")
          .upload(fileName, file);
        if (!error) {
          const url = supabase.storage
            .from("contact-uploads")
            .getPublicUrl(fileName).data.publicUrl;
          uploadedUrls.push(url);
        }
      }
    }

    const { error } = await supabase.from("contact_requests").insert([
      { user_id: user?.id || null, name, email, reason, description, phone, attachments: uploadedUrls }
    ]);

    setLoading(false);

    if (error) alert(error.message);
    else {
      alert("Mesaj trimis!");
      setName(""); setDescription(""); setPhone(""); setFiles(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-black/70 rounded-xl text-white flex flex-col gap-4">
      {/* restul codului tău de form */}
    </div>
  );
}