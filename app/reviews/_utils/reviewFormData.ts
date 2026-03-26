import { compressImage } from "@/utils/image";

export const MAX_FILES = 3;
export const MAX_COMMENT_CHARS = 1000;

export type BuildReviewFormDataParams = {
  isLogged: boolean;
  computedLockedName: string;
  displayName: string;
  email: string;
  phone: string;
  rating: number;
  comment: string;
  pickedFiles: File[];
  user: any;
};

export type BuildReviewFormDataResult =
  | { ok: true; fd: FormData }
  | { ok: false; error: string };

export async function buildReviewFormData({
  isLogged,
  computedLockedName,
  displayName,
  email,
  phone,
  rating,
  comment,
  pickedFiles,
  user,
}: BuildReviewFormDataParams): Promise<BuildReviewFormDataResult> {
  const nameToSend = isLogged
  ? computedLockedName || "Utilizator"
  : displayName;

  if (!nameToSend?.trim()) {
    return { ok: false, error: "Numele este obligatoriu." };
  }

  if (!comment.trim()) {
    return { ok: false, error: "Review-ul este obligatoriu." };
  }

  if (comment.trim().length > MAX_COMMENT_CHARS) {
    return {
      ok: false,
      error: `Review-ul poate avea maxim ${MAX_COMMENT_CHARS} caractere.`,
    };
  }

  if (rating < 1 || rating > 5) {
    return { ok: false, error: "Rating invalid (1..5)." };
  }

  const toSend = pickedFiles.slice(0, MAX_FILES);
  const compressed = await Promise.all(
    toSend.map((file) =>
      compressImage(file, { maxW: 1600, maxH: 1600, quality: 0.82 })
    )
  );

  const fd = new FormData();
  fd.set("rating", String(rating));
  fd.set("comment", comment.trim());
  fd.set("display_name", nameToSend.trim());
  fd.set("email", ((isLogged ? user?.email : email) || "").trim());
  fd.set("phone", phone.trim());
  fd.set("user_id", isLogged ? user?.id || "" : "");
  compressed.forEach((file) => fd.append("files", file));

  return { ok: true, fd };
}