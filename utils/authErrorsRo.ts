// utils/authErrorsRo.ts

export function mapSupabaseAuthErrorToRo(message?: string): string {
  const m = (message || "").toLowerCase().trim();

  if (!m) {
    return "A apărut o eroare. Încearcă din nou.";
  }

  /* =========================
     VALIDĂRI EMAIL
  ========================== */

  if (m.includes("missing email or phone")) {
    return "Te rog introdu adresa de email.";
  }

  if (m.includes("unable to validate email address")) {
    return "Adresa de email nu este validă.";
  }

  if (m.includes("email") && m.includes("invalid")) {
    return "Adresa de email nu este validă.";
  }

  if (m.includes("user already registered") || m.includes("already been registered")) {
    return "Există deja un cont cu acest email.";
  }

  if (m.includes("email not confirmed")) {
    return "Emailul nu este confirmat. Verifică inbox-ul.";
  }

  /* =========================
     PAROLE
  ========================== */

  if (m.includes("password should be at least") || m.includes("password is too short")) {
    return "Parola este prea scurtă (minim 6 caractere).";
  }

  if (m.includes("invalid login credentials")) {
    return "Email sau parolă incorecte.";
  }

  if (m.includes("invalid password")) {
    return "Parolă incorectă.";
  }

  /* =========================
     RATE LIMIT / SECURITY
  ========================== */

  if (m.includes("too many requests") || m.includes("rate limit")) {
    return "Prea multe încercări. Încearcă din nou mai târziu.";
  }

  if (m.includes("signup is disabled")) {
    return "Înregistrarea este momentan dezactivată.";
  }

  if (m.includes("user not found")) {
    return "Nu există niciun cont asociat acestui email.";
  }

  /* =========================
     FALLBACK
  ========================== */

  return "A apărut o eroare la autentificare. Încearcă din nou.";
}