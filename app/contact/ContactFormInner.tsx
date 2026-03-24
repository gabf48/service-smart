"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { useContactForm } from "./_hooks/useContactForm";
import { ContactNotice } from "./_components/ContactNotice";
import { ContactFields } from "./_components/ContactFields";
import { ContactFileInput } from "./_components/ContactFileInput";
import { ContactSubmitButton } from "./_components/ContactSubmitButton";

export default function ContactFormInner() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const motivo = searchParams?.get("motivo") || "";

  const form = useContactForm(user, motivo);

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 rounded-2xl border border-white/10 bg-black/70 p-8 text-white shadow-2xl backdrop-blur-xl">
      <h1 className="text-2xl font-bold">Contact</h1>

      <ContactNotice
        notice={form.notice}
        onClose={() => form.setNotice(null)}
      />

      <ContactFields
        name={form.name}
        setName={form.setName}
        email={form.email}
        setEmail={form.setEmail}
        user={user}
        reason={form.reason}
        setReason={form.setReason}
        description={form.description}
        setDescription={form.setDescription}
        phone={form.phone}
        setPhone={form.setPhone}
        loading={form.loading}
      />

      <ContactFileInput
        onChange={form.setFiles}
        selectedFiles={form.selectedFiles}
        onRemove={form.removeFile}
        loading={form.loading}
        setNotice={form.setNotice}
      />

      <ContactSubmitButton
        loading={form.loading}
        onClick={form.handleSubmit}
      />
    </div>
  );
}