import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { listProperties } from "@/lib/properties.functions";
import { PropertyCard } from "@/components/PropertyCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";

const propertiesQuery = queryOptions({
  queryKey: ["properties"],
  queryFn: () => listProperties(),
});

export const Route = createFileRoute("/listings")({
  head: () => ({
    meta: [
      { title: "All Listings — kesmarthomes" },
      {
        name: "description",
        content:
          "Browse the full collection of Mandela-Max residences and executive suites across Nairobi.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(propertiesQuery),
  component: ListingsPage,
});

type TypeFilter = "all" | "rent" | "sale";

function ListingsPage() {
  const { data: properties } = useSuspenseQuery(propertiesQuery);

  const [q, setQ] = useState("");
  const [type, setType] = useState<TypeFilter>("all");
  const [location, setLocation] = useState("all");
  const [beds, setBeds] = useState<number | "any">("any");
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const locations = useMemo(
    () => Array.from(new Set(properties.map((p) => p.location))),
    [properties],
  );
  const priceCeiling = useMemo(
    () => Math.max(...properties.map((p) => p.price), 1),
    [properties],
  );

  const effectiveMax = maxPrice || priceCeiling;

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (type !== "all" && p.type !== type) return false;
      if (location !== "all" && p.location !== location) return false;
      if (beds !== "any" && p.bedrooms < beds) return false;
      if (p.price > effectiveMax) return false;
      if (q.trim()) {
        const t = q.toLowerCase();
        if (!p.title.toLowerCase().includes(t) && !p.location.toLowerCase().includes(t))
          return false;
      }
      return true;
    });
  }, [properties, type, location, beds, effectiveMax, q]);

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <Navbar />

      <section className="relative overflow-hidden bg-ambient pt-36 pb-16">
        <div className="pointer-events-none absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="The Full Collection"
            title={<>Every residence, <em className="text-gradient-gold not-italic">at a glance</em></>}
            subtitle="Filter by what matters — type, location, bedrooms, budget — to find the home that fits the life you're designing."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Sidebar filters */}
          <aside className="glass h-fit rounded-xl p-6 lg:sticky lg:top-28">
            <h3 className="font-serif mb-6 text-xl text-stone-50">Refine</h3>

            <div className="mb-6">
              <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-gold">Search</label>
              <div className="flex items-center gap-2 rounded-sm border border-gold/15 bg-stone-950/50 px-3 py-2">
                <Search className="h-4 w-4 text-gold" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Title or location"
                  className="w-full bg-transparent text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-gold">Type</label>
              <div className="grid grid-cols-3 gap-1 rounded-sm border border-gold/15 bg-stone-950/50 p-1">
                {(["all", "rent", "sale"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setType(f)}
                    className={`rounded-sm px-2 py-2 text-[11px] uppercase tracking-[0.18em] transition ${
                      type === f
                        ? "bg-gold text-stone-950"
                        : "text-stone-300 hover:text-gold"
                    }`}
                  >
                    {f === "all" ? "All" : f}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-gold">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-sm border border-gold/15 bg-stone-950/50 px-3 py-2.5 text-sm text-stone-100 focus:border-gold focus:outline-none"
              >
                <option value="all">All locations</option>
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-gold">Bedrooms</label>
              <div className="flex gap-1">
                {(["any", 1, 2, 3, 4, 5] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => setBeds(b)}
                    className={`flex-1 rounded-sm border px-2 py-2 text-xs transition ${
                      beds === b
                        ? "border-gold bg-gold/15 text-gold"
                        : "border-gold/15 text-stone-300 hover:border-gold/40"
                    }`}
                  >
                    {b === "any" ? "Any" : `${b}+`}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 flex justify-between text-[10px] uppercase tracking-[0.25em] text-gold">
                <span>Max Price</span>
                <span>KES {new Intl.NumberFormat().format(effectiveMax)}</span>
              </label>
              <input
                type="range"
                min={0}
                max={priceCeiling}
                step={Math.max(1000, Math.round(priceCeiling / 100))}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#c5a880]"
              />
            </div>

            <button
              onClick={() => {
                setQ(""); setType("all"); setLocation("all"); setBeds("any"); setMaxPrice(0);
              }}
              className="w-full rounded-sm border border-gold/30 px-3 py-2.5 text-[11px] uppercase tracking-[0.22em] text-gold hover:bg-gold/10"
            >
              Reset Filters
            </button>
          </aside>

          {/* Results */}
          <div>
            <div className="mb-6 flex items-baseline justify-between border-b border-gold/10 pb-4">
              <p className="text-sm text-stone-400">
                <span className="font-serif text-2xl text-gold">{filtered.length}</span>{" "}
                <span className="ml-1 text-[11px] uppercase tracking-[0.22em]">
                  {filtered.length === 1 ? "residence" : "residences"} found
                </span>
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="glass rounded-xl py-20 text-center text-stone-300">
                No properties match your refinement.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
