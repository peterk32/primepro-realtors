import { Search, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <header className="relative isolate min-h-[100vh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Luxurious warm-lit Nairobi penthouse interior"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/55 via-stone-950/65 to-stone-950" />
        <div className="absolute inset-0 bg-ambient opacity-70" />
      </div>

      <div className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-[#c5a880]/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#a8865a]/15 blur-[100px]" />

      <div className="relative mx-auto flex min-h-[100vh] max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <span className="mb-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-gold">
          <span className="h-px w-10 bg-gold" />
          A Boutique Nairobi Atelier
          <span className="h-px w-10 bg-gold" />
        </span>

        <h1 className="font-serif max-w-5xl text-5xl leading-[1.05] text-stone-50 md:text-7xl lg:text-[5.5rem]">
          Where every <em className="text-gradient-gold not-italic">address</em>
          <br />
          becomes a sanctuary.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-stone-300">
          A handpicked collection of warm, light-filled residences, executive
          suites, and family villas across Nairobi — quietly curated for those
          who appreciate the finer details.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/listings", search: { q } as never });
          }}
          className="glass-strong mt-12 flex w-full max-w-2xl items-center gap-2 rounded-sm p-2 pl-6"
        >
          <Search className="h-5 w-5 text-gold" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Where would you like to live? Try typing 'Mombasa Road'"
            className="flex-1 bg-transparent py-3.5 text-sm text-stone-100 placeholder:text-stone-400 focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-xs font-medium uppercase tracking-[0.22em] text-stone-950 transition hover:bg-[#d4b890]"
          >
            Search <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-16 grid grid-cols-3 gap-10 text-center md:gap-20">
          {[
            ["4,000+", "Properties Managed"],
            ["24.5K+", "Community"],
            ["100%", "Verified Units"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="font-serif text-3xl text-gold md:text-4xl">{k}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-stone-400">
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-stone-950" />
    </header>
  );
}
