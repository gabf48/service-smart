"use client";

import { submitContactForm } from "../_utils/contactSubmit";

type SubmitArgs = {
  user: any;
  name: string;
  email: string;
  reason: string;
  description: string;
  phone: string;
  files: FileList | null;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setNotice: (value: { type: "success" | "error"; text: string } | null) => void;
  onSuccess: () => void;
};

export function useContactSubmit() {
  const handleSubmit = async ({
    user,
    name,
    email,
    reason,
    description,
    phone,
    files,
    loading,
    setLoading,
    setNotice,
    onSuccess,
  }: SubmitArgs) => {
    if (!name.trim()) {
      setNotice({ type: "error", text: "Completează numele." });
      return;
    }

    if (!email.trim()) {
      setNotice({ type: "error", text: "Completează emailul." });
      return;
    }

    if (!description.trim()) {
      setNotice({ type: "error", text: "Completează descrierea." });
      return;
    }

    if (loading) return;

    setNotice(null);
    setLoading(true);

    try {
      await submitContactForm({ user, name, email, reason, description, phone, files });

      setNotice({
        type: "success",
        text: "Mesaj trimis cu succes. Îți răspundem cât mai rapid. Dacă ai atașat fișiere, le-am primit.",
      });

      onSuccess();
    } catch (e: any) {
      setNotice({
        type: "error",
        text: e?.message || "A apărut o eroare la trimitere. Te rog încearcă din nou.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit };
}