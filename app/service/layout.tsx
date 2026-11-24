import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();

  // Get the current user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("SERVER LAYOUT:", { user: user?.id?.slice(0, 8) });

  // If not authenticated, redirect to login
  if (!user) {
    redirect("/login?redirect=/service");
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  console.log("SERVER LAYOUT PROFILE:", { profile });

  // If not admin, redirect to home
  if (!profile || profile.role !== "admin") {
    redirect("/home");
  }

  return <>{children}</>;
}