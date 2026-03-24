export function mapResetPasswordErrorToRo(message: string) {
  const msg = message.toLowerCase();

  if (msg.includes("new password should be different")) {
    return "Noua parolă trebuie să fie diferită de parola veche.";
  }

  if (msg.includes("password should be at least")) {
    return "Parola trebuie să respecte lungimea minimă cerută.";
  }

  if (msg.includes("invalid") || msg.includes("expired") || msg.includes("otp")) {
    return "Linkul de resetare este invalid sau a expirat.";
  }

  return "Nu s-a putut reseta parola.";
}