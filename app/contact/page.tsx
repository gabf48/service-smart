'use client';
import { Suspense } from 'react';
import ContactFormInner from './ContactFormInner';

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}