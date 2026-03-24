"use client";

export function useReviewSubmit() {
  const submitReviewRequest = async ({
    fd,
    setUploadPct,
  }: {
    fd: FormData;
    setUploadPct: (value: number) => void;
  }) => {
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

        if (!ok) return reject(new Error(xhr.responseText || "Eroare la submit."));
        resolve();
      };

      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(fd);
    });
  };

  return { submitReviewRequest };
}