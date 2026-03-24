export function validateRegisterForm({
  emailTrim,
  emailRegex,
  password,
  password2,
  acceptTerms,
}: {
  emailTrim: string;
  emailRegex: RegExp;
  password: string;
  password2: string;
  acceptTerms: boolean;
}) {
  if (!emailTrim) {
    return "Te rog introdu adresa de email.";
  }

  if (!emailRegex.test(emailTrim)) {
    return "Adresa de email nu este validă.";
  }

  if (!password) {
    return "Te rog introdu parola.";
  }

  if (password.length < 6) {
    return "Parola trebuie să aibă minim 6 caractere.";
  }

  if (password !== password2) {
    return "Parolele nu coincid.";
  }

  if (!acceptTerms) {
    return "Trebuie să accepți Termenii și condițiile.";
  }

  return null;
}