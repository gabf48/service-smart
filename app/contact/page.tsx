'use client';

import { Suspense } from 'react';
import ContactFormInner from './ContactFormInner';

export default function ContactForm() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}