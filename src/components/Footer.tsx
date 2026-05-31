import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-stone-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-sm border border-gold/40 bg-stone-900 font-serif text-lg text-gold">
              L
            </span>
             <span className="font-serif text-xl text-stone-50">
               primepro realtors <span className="text-gold">Properties</span>
             </span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-stone-400">
            A boutique Nairobi real estate house curating exceptional residences,
            executive suites, and family villas. Trusted by a community of
            24,500+ discerning clients.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-gold">
            Explore
          </h4>
          <ul className="space-y-3 text-sm text-stone-300">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/listings" className="hover:text-gold">All Listings</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-gold">
            Visit Us
          </h4>
          <ul className="space-y-3 text-sm text-stone-300">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold" /> Thika road, Thika Kenya</li>
             <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-gold" /> 0114697159</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-gold" /> hello@mean.co.ke</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0 text-gold" /> Mon–Sat · 8:00 – 18:00</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs uppercase tracking-[0.22em] text-stone-500 md:flex-row">
           <p>© {new Date().getFullYear()} primepro realtors Kenya </p>
          <p className="text-gold">Nairobi · Kenya</p>
        </div>
      </div>
    </footer>
  );
}
