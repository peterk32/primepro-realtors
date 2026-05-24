import { BedDouble, Bath, MapPin, Sparkles } from "lucide-react";
import type { Property } from "@/lib/properties.functions";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const IMAGE_MAP: Record<string, string> = {
  "/src/assets/property-1.jpg": property1,
  "/src/assets/property-2.jpg": property2,
  "/src/assets/property-3.jpg": property3,
};

const WHATSAPP_NUMBER = "254972055584"; // +254 972 055 584

function formatKES(n: number) {
  return new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 }).format(n);
}

export function PropertyCard({
  property,
  size = "md",
}: {
  property: Property;
  size?: "sm" | "md" | "lg";
}) {
  const img = IMAGE_MAP[property.main_image] ?? property.main_image;
  const message = encodeURIComponent(
    `Hi Mandela-Max, I am viewing Property ID #${property.id} on your website and would love to book a viewing.`,
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  const heightClass =
    size === "lg" ? "h-[28rem] md:h-full" : size === "sm" ? "h-72" : "h-80";

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl glass shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:glow-neon ${heightClass}`}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={img}
          alt={property.title}
          loading="lazy"
          width={1280}
          height={896}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/10" />
      </div>

      {/* Top badges */}
      <div className="relative z-10 flex items-start justify-between p-5">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-md ${
            property.type === "rent"
              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
              : "border-indigo-400/40 bg-indigo-400/10 text-indigo-300"
          }`}
        >
          For {property.type}
        </span>
        {property.is_featured && (
          <span className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            <Sparkles className="h-3 w-3" /> Featured
          </span>
        )}
      </div>

      {/* Content — slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
        <p className="mb-1 flex items-center gap-1 text-xs text-slate-300/90">
          <MapPin className="h-3 w-3 text-emerald-400" /> {property.location}
        </p>
        <h3 className="mb-2 text-xl font-semibold leading-tight text-white">
          {property.title}
        </h3>

        <div className="mb-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gradient-neon">
            KES {formatKES(property.price)}
          </span>
          {property.type === "rent" && (
            <span className="text-xs text-slate-400">/ month</span>
          )}
        </div>

        <div className="mb-4 flex items-center gap-4 text-sm text-slate-300">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-emerald-400" />
            {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-indigo-400" />
            {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
          </span>
        </div>

        {/* CTAs — revealed on hover (visible on touch) */}
        <div className="grid grid-cols-2 gap-2 opacity-100 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-32 md:group-hover:opacity-100">
          <button
            type="button"
            disabled
            className="relative cursor-not-allowed rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 backdrop-blur-md"
          >
            Immersive Virtual Tour
            <span className="absolute -top-2 right-1 rounded-full bg-indigo-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              Soon
            </span>
          </button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-emerald-400/40 bg-emerald-400/15 px-3 py-2 text-center text-xs font-semibold text-emerald-200 backdrop-blur-md transition hover:bg-emerald-400/25 hover:text-white"
          >
            Secure via WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
