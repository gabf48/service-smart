export function mapMfaErrorToRo(message: string) {
  const msg = message.toLowerCase();

  if (msg.includes("code")) return "Codul introdus nu este valid.";
  if (msg.includes("factor")) return "Factorul MFA nu este valid.";
  if (msg.includes("challenge")) return "Verificarea MFA a expirat. Încearcă din nou.";
  if (msg.includes("unauthorized")) return "Nu ești autorizat pentru această acțiune.";

  return "A apărut o eroare la configurarea 2FA.";
}