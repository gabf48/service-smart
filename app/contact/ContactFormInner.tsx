'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/app/context/AuthContext';
import { useSearchParams } from 'next/navigation';

export default function ContactFormInner() {
  const { user } = useAuth();
  const searchParams = useSearchParams(); // ⚡ trebuie să fie doar client-side
  const motivoParam = searchParams?.get('motivo') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState(motivoParam || 'Cerere oferta');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    let uploadedUrls: string[] = [];

    if (files) {
      for (const file of Array.from(files)) {
        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage
          .from('contact-uploads')
          .upload(fileName, file);
        if (!error) {
          const url = supabase.storage
            .from('contact-uploads')
            .getPublicUrl(fileName).data.publicUrl;
          uploadedUrls.push(url);
        }
      }
    }

    const { error } = await supabase.from('contact_requests').insert([
      { user_id: user?.id || null, name, email, reason, description, phone, attachments: uploadedUrls }
    ]);

    setLoading(false);
    if (error) alert(error.message);
    else {
      alert('Mesaj trimis!');
      setName(''); setDescription(''); setPhone(''); setFiles(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-black/70 rounded-xl text-white flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Contact</h1>

      <input
        placeholder="Nume"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500"
      />

      <input
        type="email"
        placeholder="Email"
        value={user?.email || email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={!!user}
        className={`p-2 border rounded focus:outline-none focus:border-blue-500 ${
          user ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-gray-900 text-white'
        }`}
      />

      <select
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500"
      >
        <option>Cerere oferta</option>
        <option>Bug website</option>
        <option>Colaborare</option>
        <option>Problema laptop/PC</option>
        <option>Alt motiv</option>
        <option>Modifica date personale</option>
      </select>

      <textarea
        placeholder="Descriere"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500"
      />

      <input
        placeholder="Telefon"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500"
      />

      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => setFiles(e.target.files)}
        className="p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 p-2 rounded mt-2"
      >
        {loading ? 'Se trimite...' : 'Trimite'}
      </button>
    </div>
  );
}