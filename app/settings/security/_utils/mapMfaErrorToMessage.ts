export function mapMfaErrorToMessage(message: string) {
  const value = message.toLowerCase();

  if (value.includes("invalid totp code")) {
    return "Codul introdus nu este valid.";
  }

  if (value.includes("expired")) {
    return "Codul a expirat. Încearcă din nou.";
  }

  if (value.includes("factor")) {
    return "Nu am putut valida factorul 2FA.";
  }

  if (value.includes("challenge")) {
    return "Sesiunea de verificare a expirat. Încearcă din nou.";
  }

  return "A apărut o eroare la configurarea 2FA.";
}