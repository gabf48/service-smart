"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  // Obținem user-ul curent complet
  const { data: { user } } = await supabase.auth.getUser();

  const role = user?.user_metadata?.role || "user";

  if (role === "admin") {
    router.push("/dashboard/admin");
  } else {
    router.push("/dashboard/user");
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Parolă"
        className="border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Loghează-te
      </button>
    </div>
  );
}
