import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { listProperties } from "@/lib/properties.functions";
import { Hero } from "@/components/Hero";
import { PropertyGrid } from "@/components/PropertyGrid";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";

const propertiesQuery = queryOptions({
  queryKey: ["properties"],
  queryFn: () => listProperties(),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "lulu mean — Boutique Nairobi Real Estate" },
      {
        name: "description",
        content:
          "Boutique luxury residences, executive suites, and family villas curated across Nairobi.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(propertiesQuery),
  component: Index,
});

function Index() {
  const { data: properties } = useSuspenseQuery(propertiesQuery);
  const featured = properties.filter((p) => p.is_featured).slice(0, 5);

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <Navbar />
      <Hero />

      <section id="featured" className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Featured Residences"
            title={
              <>
                Curated for those who <em className="text-gradient-gold not-italic">notice</em>
              </>
            }
            subtitle="A small, deliberate edit of our most exceptional homes and suites — each one verified, photographed, and ready to receive its next chapter."
          />
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold hover:text-stone-100"
          >
            View All Listings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <PropertyGrid properties={featured.length ? featured : properties.slice(0, 5)} />
      </section>

      <Footer />
    </main>
  );
}
