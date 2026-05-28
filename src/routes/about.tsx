import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — lulu mean" },
      {
        name: "description",
        content:
          "The story behind lulu means: a Nairobi atelier curating boutique luxury properties from our Pili Trade Centre headquarters.",
      },
    ],
  }),
  component: AboutPage,
});

const METRICS = [
  ["24,500+", "Community Followers"],
  ["4,000+", "Properties Managed"],
  ["1", "HQ at Pili Trade Centre"],
] as const;

const VALUES = [
  {
    title: "Curated, never cluttered",
    body: "Every listing earns its place. We turn down more than we accept so each home in our portfolio is genuinely worth your time.",
  },
  {
    title: "Quietly thorough",
    body: "Verification, paperwork, viewings — handled with the discretion and precision our clients expect of a boutique house.",
  },
  {
    title: "Built around you",
    body: "Whether you are a first-time tenant or building a multi-asset portfolio, we shape the experience around the life you're trying to live.",
  },
];

function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <Navbar />

      <section className="relative overflow-hidden bg-ambient pt-36 pb-24">
        <div className="pointer-events-none absolute -top-20 right-1/4 h-96 w-96 rounded-full bg-gold/15 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Our Story"
              title={<>A boutique house, <em className="text-gradient-gold not-italic">quietly</em> changing how Nairobi lives.</>}
              subtitle="
lulu means Kenya began with a simple conviction: that finding a home should feel as considered as the home itself. From our headquarters at Pili Trade Centre, we curate residences and executive suites for a community of clients who notice the details."
            />
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/listings" className="rounded-sm bg-gold px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-stone-950 hover:bg-[#d4b890]">
                View Listings
              </Link>
              <Link to="/contact" className="rounded-sm border border-gold/50 px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-gold hover:bg-gold/10">
                Visit Our Office
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="glass overflow-hidden rounded-xl">
              <img
                src={aboutImg}
                alt="Mandela-Max curated interior"
                width={1080}
                height={1600}
                className="h-[34rem] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="glass-strong grid gap-10 rounded-2xl p-10 md:grid-cols-3 md:p-14">
          {METRICS.map(([k, v]) => (
            <div key={v} className="text-center">
              <div className="font-serif text-5xl text-gold md:text-6xl">{k}</div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.28em] text-stone-300">{v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <SectionHeader
          eyebrow="What we believe"
          title={<>Three quiet principles, <em className="text-gradient-gold not-italic">held closely</em>.</>}
          center
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <article key={v.title} className="glass rounded-xl p-8">
              <div className="font-serif mb-4 text-3xl text-gold">0{i + 1}</div>
              <h3 className="font-serif mb-3 text-2xl text-stone-50">{v.title}</h3>
              <p className="text-sm leading-relaxed text-stone-400">{v.body}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
