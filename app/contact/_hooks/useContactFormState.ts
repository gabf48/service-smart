"use client";

import { useEffect, useState } from "react";

export type Notice = { type: "success" | "error"; text: string } | null;

export function useContactFormState(user: any, motivoParam: string) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState(motivoParam || "Cerere oferta");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  useEffect(() => {
    if (motivoParam) setReason(motivoParam);
  }, [motivoParam]);

  const resetState = () => {
    setName("");
    if (!user) setEmail("");
    setReason(motivoParam || "Cerere oferta");
    setDescription("");
    setPhone("");
  };

  return {
    name,
    setName,
    email,
    setEmail,
    reason,
    setReason,
    description,
    setDescription,
    phone,
    setPhone,
    loading,
    setLoading,
    notice,
    setNotice,
    resetState,
  };
}