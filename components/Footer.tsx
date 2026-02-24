'use client';
import { useState } from 'react';
import { versions } from '@/version';
import VersionHistory from './VersionHistory';

export default function Footer() {
  const [open, setOpen] = useState(false);
  const currentVersion = versions[0].version; // versiunea cea mai nouă

  return (
    <>
      <footer className="fixed bottom-0 w-full bg-gray-800 text-white p-2 text-center cursor-pointer" onClick={() => setOpen(true)}>
        Versiunea {currentVersion}
      </footer>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg max-h-[80vh] overflow-y-auto w-[90%] max-w-4xl relative">
            <button className="absolute top-2 right-2 p-1 text-gray-300 hover:text-white" onClick={() => setOpen(false)}>X</button>
            <VersionHistory />
          </div>
        </div>
      )}
    </>
  );
}