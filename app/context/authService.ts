"use client";

import { supabase } from "@/lib/supabase";

export async function getUserRole(userId: string): Promise<"admin" | "user"> {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error || !data?.role) return "user";
  return data.role === "admin" ? "admin" : "user";
}

export async function getSessionUser() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
}

export function onAuthChange(callback: (user: any) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => data.subscription.unsubscribe();
}

export async function signOut() {
  await supabase.auth.signOut();
}