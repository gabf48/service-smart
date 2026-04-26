"use client";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        
        {/* Brand */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Service Smart</h3>
          <p className="text-white/70">
            Reparații laptop & PC în Cluj. Rapid, corect și fără complicații.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-white/80">
            <li>
              📞 <a href="tel:+40757180250">+40 757 180 250</a>
            </li>
            <li>
              💬 <a href="https://wa.me/40757180250">WhatsApp</a>
            </li>
            <li>
              ✉️ <a href="mailto:contact@service-smart.ro">contact@service-smart.ro</a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold mb-3">Social</h4>
          <ul className="space-y-2 text-white/80">
            <li>
              📘 <a href="https://www.facebook.com/service.smart.cluj" target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
          </ul>
        </div>

        {/* Sitemap */}
        <div>
          <h4 className="font-semibold mb-3">Site</h4>
          <ul className="space-y-2 text-white/80">
            <li>
              <a href="/home">Acasă</a>
            </li>
            <li>
              <a href="/servicii">Servicii</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/reviews">Recenzii</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 text-center py-4 text-xs text-white/60">
        © {new Date().getFullYear()} Service Smart. Toate drepturile rezervate.
      </div>
    </footer>
  );
}