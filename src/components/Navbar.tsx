import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/listings", label: "All Listings" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-sm border border-gold/40 bg-stone-950/60 font-serif text-lg text-gold">
            M
          </span>
          <span className="font-serif text-xl tracking-wide text-stone-50">
            Mandela-Max <span className="text-gold">Properties</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative rounded-sm px-4 py-2 text-xs uppercase tracking-[0.22em] transition ${
                  active
                    ? "text-gold"
                    : "text-stone-300 hover:text-gold"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gold" />
                )}
              </Link>
            );
          })}
          <a
            href="https://wa.me/254972055584"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 rounded-sm border border-gold/60 bg-gold/10 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.22em] text-gold transition hover:bg-gold hover:text-stone-950"
          >
            Enquire
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-sm border border-gold/30 p-2 text-gold md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="glass-nav mt-3 border-t border-gold/10 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="border-b border-stone-100/5 py-3 text-sm uppercase tracking-[0.22em] text-stone-200"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
