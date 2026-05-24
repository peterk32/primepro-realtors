import type { Property } from "@/lib/properties.functions";
import { PropertyCard } from "./PropertyCard";

export function PropertyGrid({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return (
      <div className="glass rounded-xl py-20 text-center text-stone-300">
        No properties match your search.
      </div>
    );
  }
  return (
    <div className="grid auto-rows-[20rem] grid-cols-1 gap-6 md:grid-cols-3 md:auto-rows-[18rem]">
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
