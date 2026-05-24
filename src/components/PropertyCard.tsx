import { BedDouble, Bath, MapPin, Sparkles, Video } from "lucide-react";
import type { Property } from "@/lib/properties.functions";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";

const IMAGE_MAP: Record<string, string> = {
  "/src/assets/property-1.jpg": property1,
  "/src/assets/property-2.jpg": property2,
  "/src/assets/property-3.jpg": property3,
  "/src/assets/property-4.jpg": property4,
  "/src/assets/property-5.jpg": property5,
};

const WHATSAPP_NUMBER = "254972055584";

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
    size === "lg" ? "h-[32rem] md:h-full" : size === "sm" ? "h-80" : "h-96";

  return (
    <article
      className={`group relative overflow-hidden rounded-xl glass transition-all duration-700 hover:-translate-y-1 hover:shadow-gold ${heightClass}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={img}
          alt={property.title}
          loading="lazy"
          width={1280}
          height={896}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/10" />
      </div>

      <div className="relative z-10 flex items-start justify-between p-6">
        <span
          className={`rounded-sm border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur-md ${
            property.type === "rent"
              ? "border-gold/40 bg-black/30 text-gold"
              : "border-stone-200/40 bg-black/30 text-stone-100"
          }`}
        >
          For {property.type}
        </span>
        {property.is_featured && (
          <span className="flex items-center gap-1.5 rounded-sm border border-gold/40 bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gold backdrop-blur-md">
            <Sparkles className="h-3 w-3" /> Featured
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 transition-transform duration-500 ease-out group-hover:-translate-y-1">
        <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-stone-300/90">
          <MapPin className="h-3 w-3 text-gold" /> {property.location}
        </p>
        <h3 className="font-serif mb-3 text-2xl leading-tight text-white md:text-[1.65rem]">
          {property.title}
        </h3>

        <div className="mb-4 flex items-baseline gap-2">
          <span className="font-serif text-3xl text-gold">
            KES {formatKES(property.price)}
          </span>
          {property.type === "rent" && (
            <span className="text-xs uppercase tracking-wider text-stone-400">
              / month
            </span>
          )}
        </div>

        <div className="mb-5 flex items-center gap-5 text-sm text-stone-300">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-gold" />
              {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-gold" />
            {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 opacity-100 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-32 md:group-hover:opacity-100">
          <button
            type="button"
            disabled
            className="relative flex cursor-not-allowed items-center justify-center gap-1.5 rounded-sm border border-stone-200/15 bg-white/5 px-3 py-2.5 text-[11px] font-medium uppercase tracking-wider text-stone-200 backdrop-blur-md"
          >
            <Video className="h-3.5 w-3.5" />
            Virtual Tour
            <span className="absolute -top-2 -right-1 rounded-sm bg-gold px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-stone-950">
              Soon
            </span>
          </button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-gold/50 bg-gold/15 px-3 py-2.5 text-center text-[11px] font-medium uppercase tracking-wider text-gold backdrop-blur-md transition hover:bg-gold hover:text-stone-950"
          >
            Secure via WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
