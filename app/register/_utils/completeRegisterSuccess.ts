import { TERMS_VERSION } from "@/app/terms";

export function completeRegisterSuccess({
  emailTrim,
  setSuccessMsg,
  setEmail,
  setPassword,
  setPassword2,
  setAcceptTerms,
}: {
  emailTrim: string;
  setSuccessMsg: (v: string | null) => void;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setPassword2: (v: string) => void;
  setAcceptTerms: (v: boolean) => void;
}) {
  localStorage.setItem(
    "pending_terms_acceptance",
    JSON.stringify({
      terms_version: TERMS_VERSION,
      email_snapshot: emailTrim,
      accepted_at: new Date().toISOString(),
    })
  );

  setSuccessMsg(
    "Cont creat! Ți-am trimis un email de confirmare. Deschide email-ul și apasă pe linkul de activare, apoi revino și autentifică-te."
  );

  setEmail("");
  setPassword("");
  setPassword2("");
  setAcceptTerms(false);
}