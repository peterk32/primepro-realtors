import { Search, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <header className="relative isolate min-h-[92vh] overflow-hidden bg-hero">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Futuristic Nairobi skyline at night"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/70 to-slate-950" />
        <div className="absolute inset-0 grid-noise opacity-40" />
      </div>

      {/* Floating glow orbs */}
      <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-emerald-500/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl" />

      {/* Nav */}
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-indigo-500 text-sm font-black text-slate-950 glow-neon">
            M
          </span>
          <span className="text-lg font-bold tracking-tight text-white">
            Mandela-Max <span className="text-emerald-400">Properties</span>
          </span>
        </a>
        <a
          href="#listings"
          className="hidden rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:border-emerald-400/50 hover:text-emerald-300 md:inline-flex"
        >
          View Listings
        </a>
      </nav>

      {/* Centered glass container */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-20 text-center md:pt-28">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live in Nairobi
        </span>

        <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">
          The future of <span className="text-gradient-neon">real estate</span>{" "}
          starts at your doorstep.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-slate-300 md:text-lg">
          Discover ultra-modern apartments, townhouses, and executive residences
          across Nairobi — curated, verified, and ready to move into.
        </p>

        {/* Unified glass search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            document
              .getElementById("listings")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="glass-strong mt-10 flex w-full max-w-2xl items-center gap-2 rounded-full p-2 pl-6"
        >
          <Search className="h-5 w-5 text-emerald-400" />
          <input
            type="text"
            placeholder="Where would you like to live? Try typing 'Mombasa Road'"
            className="flex-1 bg-transparent py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none md:text-base"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-indigo-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:shadow-emerald-500/50"
          >
            Search <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-10 grid grid-cols-3 gap-6 text-center md:gap-12">
          {[
            ["120+", "Active Listings"],
            ["48h", "Avg. Move-in"],
            ["100%", "Verified Units"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-2xl font-bold text-gradient-neon md:text-3xl">
                {k}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400">
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
