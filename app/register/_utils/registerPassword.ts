export function getPasswordRequirements(password: string) {
  return {
    length8: password.length >= 8,
    upper: /[A-Z]/.test(password),
    digit: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

export function getPasswordStrength(password: string) {
  if (!password) return { label: "", score: 0 };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Slabă", score: 1 };
  if (score === 2) return { label: "Ok", score: 2 };
  if (score === 3) return { label: "Bună", score: 3 };
  return { label: "Foarte bună", score: 4 };
}

export function getPasswordBarClass(score: number) {
  if (score <= 1) return "bg-red-500";
  if (score === 2) return "bg-amber-400";
  if (score === 3) return "bg-emerald-400";
  return "bg-emerald-500";
}