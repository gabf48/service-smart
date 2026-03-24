"use client";

import { Suspense } from "react";
import ContactFormInner from "./ContactFormInner";

function ContactFormFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/15 border-t-blue-500" />
        <p className="text-sm text-white/70">Se încarcă formularul...</p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<ContactFormFallback />}>
      <ContactFormInner />
    </Suspense>
  );
}