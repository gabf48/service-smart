"use client";

import { useEffect, useMemo, useState } from "react";
import { compressImage } from "@/utils/image";

const MAX_FILES = 3;
const MAX_COMMENT_CHARS = 1000;

function cleanup(urls: string[]) {
  urls.forEach((u) => URL.revokeObjectURL(u));
}

type BuildFormDataResult =
  | { ok: true; fd: FormData }
  | { ok: false; error: string };

export function useReviewForm(user: any) {
  const isLogged = !!user;

  const [submitting, setSubmitting] = useState(false);
  const [uploadPct, setUploadPct] = useState<number>(0);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [pickedFiles, setPickedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const computedLockedName = useMemo(() => {
    const metaName = user?.user_metadata?.full_name || user?.user_metadata?.name || "";
    if (metaName) return String(metaName);

    const em = user?.email || "";
    if (em.includes("@")) return em.split("@")[0];
    return "";
  }, [user]);

  useEffect(() => {
    if (isLogged) {
      if (computedLockedName) setDisplayName(computedLockedName);
      if (user?.email) setEmail(user.email);
    }
  }, [isLogged, computedLockedName, user]);

  useEffect(() => {
    return () => cleanup(previews);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    if (!isLogged) setDisplayName("");
    if (!isLogged) setEmail("");
    setPhone("");
    setRating(5);
    setComment("");
    setUploadPct(0);

    const el = document.getElementById("review_files") as HTMLInputElement | null;
    if (el) el.value = "";

    setPickedFiles([]);
    cleanup(previews);
    setPreviews([]);
  };

  const onPickFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list).filter((f) => f.type.startsWith("image/"));
    const next = [...pickedFiles, ...incoming].slice(0, MAX_FILES);

    cleanup(previews);
    setPickedFiles(next);
    setPreviews(next.map((f) => URL.createObjectURL(f)));

    const el = document.getElementById("review_files") as HTMLInputElement | null;
    if (el) el.value = "";
  };

  const removePicked = (idx: number) => {
    const nextFiles = pickedFiles.filter((_, i) => i !== idx);
    cleanup(previews);
    setPickedFiles(nextFiles);
    setPreviews(nextFiles.map((f) => URL.createObjectURL(f)));
  };

  const buildFormData = async (): Promise<BuildFormDataResult> => {
    const nameToSend = isLogged ? computedLockedName : displayName;

    if (!nameToSend?.trim()) return { ok: false, error: "Numele este obligatoriu." };
    if (!comment.trim()) return { ok: false, error: "Review-ul este obligatoriu." };
    if (comment.trim().length > MAX_COMMENT_CHARS)
      return { ok: false, error: `Review-ul poate avea maxim ${MAX_COMMENT_CHARS} caractere.` };
    if (rating < 1 || rating > 5) return { ok: false, error: "Rating invalid (1..5)." };

    const toSend = pickedFiles.slice(0, MAX_FILES);
    const compressed = await Promise.all(
      toSend.map((f) => compressImage(f, { maxW: 1600, maxH: 1600, quality: 0.82 }))
    );

    const fd = new FormData();
    fd.set("rating", String(rating));
    fd.set("comment", comment.trim());
    fd.set("display_name", nameToSend.trim());
    fd.set("email", ((isLogged ? user?.email : email) || "").trim());
    fd.set("phone", phone.trim());
    fd.set("user_id", isLogged ? user?.id || "" : "");
    compressed.forEach((f) => fd.append("files", f));

    return { ok: true, fd };
  };

  const submitReview = async () => {
    if (submitting) return;
    setUploadPct(0);

    const built = await buildFormData();
    if (!built.ok) throw new Error(built.error);

    setSubmitting(true);

    try {
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/reviews/submit");

        xhr.upload.onprogress = (evt) => {
          if (!evt.lengthComputable) return;
          const pct = Math.round((evt.loaded / evt.total) * 100);
          setUploadPct(pct);
        };

        xhr.onload = () => {
          const ct = xhr.getResponseHeader("content-type") || "";
          const ok = xhr.status >= 200 && xhr.status < 300;

          if (ct.includes("application/json")) {
            const payload = JSON.parse(xhr.responseText || "{}");
            if (!ok) return reject(new Error(payload?.error || "Eroare la submit."));
            return resolve();
          }

          // fallback text/html
          if (!ok) return reject(new Error(xhr.responseText || "Eroare la submit."));
          resolve();
        };

        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(built.fd);
      });
    } finally {
      setSubmitting(false);
      setUploadPct(0);
    }
  };

  return {
    MAX_FILES,
    MAX_COMMENT_CHARS,

    submitting,
    uploadPct,

    isLogged,
    computedLockedName,

    displayName,
    setDisplayName,
    email,
    setEmail,
    phone,
    setPhone,
    rating,
    setRating,
    comment,
    setComment,

    pickedFiles,
    previews,
    onPickFiles,
    removePicked,

    reset,
    submitReview,
  };
}