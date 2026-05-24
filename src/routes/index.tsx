import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { listProperties } from "@/lib/properties.functions";
import { Hero } from "@/components/Hero";
import { PropertyGrid } from "@/components/PropertyGrid";

const propertiesQuery = queryOptions({
  queryKey: ["properties"],
  queryFn: () => listProperties(),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mandela-Max Properties — Futuristic Real Estate in Nairobi" },
      {
        name: "description",
        content:
          "Curated luxury apartments, townhouses, and executive residences for rent and sale across Nairobi. Move in within 48 hours.",
      },
      { property: "og:title", content: "Mandela-Max Properties" },
      {
        property: "og:description",
        content: "Futuristic real estate listings across Nairobi.",
      },
    ],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(propertiesQuery),
  component: Index,
});

function Index() {
  const { data: properties } = useSuspenseQuery(propertiesQuery);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <PropertyGrid properties={properties} />

      <footer className="border-t border-white/5 bg-slate-950 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} Mandela-Max Properties. Built for the
            future.
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">
            Nairobi · Kenya
          </p>
        </div>
      </footer>
    </main>
  );
}
