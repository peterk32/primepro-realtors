import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — primepro realtors properties" },
      {
        name: "description",
        content:
           "Reach primepro realtors properties at Pili Trade Centre,kilimani road . Book a viewing or send us a confidential enquiry.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    const text = encodeURIComponent(
      `Hi Mandela-Max, I am ${form.name}${form.email ? ` (${form.email})` : ""}${form.phone ? ` — ${form.phone}` : ""}.\n\n${form.message}`,
    );
     window.open(`https://wa.me/254114697159?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <Navbar />

      <section className="relative overflow-hidden bg-ambient pt-36 pb-16">
        <div className="pointer-events-none absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-gold/15 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <SectionHeader
            eyebrow="Get in Touch"
            title={<>We'd be delighted <em className="text-gradient-gold not-italic">to hear from you</em>.</>}
            subtitle="Whether you're searching for a specific residence, listing a property with us, or simply curious — write a few lines and we'll respond personally, usually within the hour."
            center
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <div className="glass-strong rounded-2xl p-8 md:p-12">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-6 grid h-16 w-16 place-items-center rounded-full border border-gold bg-gold/10">
                  <Check className="h-8 w-8 text-gold" />
                </div>
                <h3 className="font-serif text-3xl text-stone-50">Message on its way</h3>
                <p className="mt-3 max-w-md text-sm text-stone-400">
                  We've opened WhatsApp with your enquiry pre-filled. Send it and we'll be in touch shortly.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                  className="mt-8 rounded-sm border border-gold/50 px-5 py-2.5 text-xs uppercase tracking-[0.22em] text-gold hover:bg-gold/10"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif mb-2 text-2xl text-stone-50">Send a confidential enquiry</h3>

                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Full name" required>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputCls}
                  />
                </Field>

                <Field label="How can we help?" required>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us a little about what you're looking for…"
                  />
                </Field>

                <button
                  type="submit"
                  className="w-full rounded-sm bg-gold py-4 text-xs font-medium uppercase tracking-[0.28em] text-stone-950 transition hover:bg-[#d4b890]"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <aside className="space-y-4">
            <InfoCard icon={MapPin} label="Headquarters" lines={["Pili Trade Centre", "Thika Road, Nairobi"]} />
             <InfoCard icon={Phone} label="WhatsApp & Calls" lines={["0114697159"]} />
            <InfoCard icon={Mail} label="Email" lines={["hello@lulumeans.co.ke"]} />
            <InfoCard icon={Clock} label="Operating Hours" lines={["Mon – Sat · 8:00 – 18:00", "Sun · By appointment"]} />
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const inputCls =
  "w-full rounded-sm border border-gold/15 bg-stone-950/50 px-4 py-3.5 text-sm text-stone-100 placeholder:text-stone-500 transition focus:border-gold focus:outline-none";

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-gold">
        {label}{required && <span className="ml-1 text-stone-500">*</span>}
      </span>
      {children}
    </label>
  );
}

function InfoCard({
  icon: Icon, label, lines,
}: { icon: React.ElementType; label: string; lines: string[] }) {
  return (
    <div className="glass rounded-xl p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-sm border border-gold/30 bg-stone-950/60 text-gold">
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-[10px] uppercase tracking-[0.28em] text-gold">{label}</span>
      </div>
      {lines.map((l) => (
        <p key={l} className="text-sm text-stone-200">{l}</p>
      ))}
    </div>
  );
}
