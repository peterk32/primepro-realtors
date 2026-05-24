import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Property } from "@/lib/properties.functions";
import { PropertyCard } from "./PropertyCard";

type Filter = "all" | "rent" | "sale";

export function PropertyGrid({ properties }: { properties: Property[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filter !== "all" && p.type !== filter) return false;
      if (q.trim()) {
        const t = q.toLowerCase();
        if (
          !p.title.toLowerCase().includes(t) &&
          !p.location.toLowerCase().includes(t)
        )
          return false;
      }
      return true;
    });
  }, [properties, filter, q]);

  return (
    <section id="listings" className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Live Inventory
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Handpicked <span className="text-gradient-neon">Residences</span>
          </h2>
        </div>

        {/* Reactive zero-reload filter */}
        <div className="glass inline-flex rounded-full p-1">
          {(["all", "rent", "sale"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-all duration-300 ${
                filter === f
                  ? "bg-gradient-to-r from-emerald-400 to-indigo-500 text-slate-950 shadow-lg shadow-emerald-500/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {f === "all" ? "All" : `For ${f}`}
            </button>
          ))}
        </div>
      </div>

      {/* Inline search (mirrors hero) */}
      <div className="glass mb-10 flex items-center gap-3 rounded-2xl px-5 py-3">
        <Search className="h-5 w-5 text-emerald-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter listings by location or title..."
          className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            className="text-xs text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl py-20 text-center text-slate-300">
          No properties match your search.
        </div>
      ) : (
        <BentoGrid properties={filtered} />
      )}
    </section>
  );
}

function BentoGrid({ properties }: { properties: Property[] }) {
  // Asymmetrical bento layout: first card large, others arranged around it
  return (
    <div className="grid auto-rows-[18rem] grid-cols-1 gap-5 md:grid-cols-3 md:auto-rows-[16rem]">
      {properties.map((p, i) => {
        const span =
          properties.length >= 3 && i === 0
            ? "md:col-span-2 md:row-span-2"
            : properties.length >= 4 && i === 3
              ? "md:col-span-2"
              : "";
        return (
          <div key={p.id} className={span}>
            <PropertyCard property={p} size={i === 0 ? "lg" : "md"} />
          </div>
        );
      })}
    </div>
  );
}
