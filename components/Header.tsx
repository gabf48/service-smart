import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white p-4 flex gap-6">
      <Link href="/">Home</Link>
      <Link href="/pricing">Prețuri</Link>
      <Link href="/reviews">Reviews</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/blog">Postări</Link>
    </header>
  );
}
