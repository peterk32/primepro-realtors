import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export type Property = {
  id: number;
  title: string;
  slug: string;
  type: "rent" | "sale";
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  main_image: string;
  is_featured: boolean;
};

const fallbackProperties: Property[] = [
  {
    id: 1,
    title: "Elegant 3 Bedroom Apartment",
    slug: "elegant-3-bedroom-apartment",
    type: "rent",
    location: "Mombasa Road, Near Pili Trade Centre",
    price: 75000,
    bedrooms: 3,
    bathrooms: 2,
    main_image: "/src/assets/property-1.jpg",
    is_featured: true,
  },
  {
    id: 2,
    title: "Ultra-Modern 4 Bedroom Townhouse",
    slug: "ultra-modern-4-bedroom-townhouse",
    type: "sale",
    location: "Syokimau",
    price: 18500000,
    bedrooms: 4,
    bathrooms: 3,
    main_image: "/src/assets/property-2.jpg",
    is_featured: true,
  },
  {
    id: 3,
    title: "Sleek Minimalist Studio Apartment",
    slug: "sleek-minimalist-studio-apartment",
    type: "rent",
    location: "Mombasa Road",
    price: 28000,
    bedrooms: 1,
    bathrooms: 1,
    main_image: "/src/assets/property-3.jpg",
    is_featured: false,
  },
  {
    id: 4,
    title: "Executive Office Suite at Pili Trade Centre",
    slug: "executive-office-suite-pili-trade-centre",
    type: "rent",
    location: "Pili Trade Centre, Mombasa Road",
    price: 145000,
    bedrooms: 0,
    bathrooms: 2,
    main_image: "/src/assets/property-4.jpg",
    is_featured: true,
  },
  {
    id: 5,
    title: "Boutique 5 Bedroom Garden Villa",
    slug: "boutique-5-bedroom-garden-villa",
    type: "sale",
    location: "Syokimau",
    price: 32000000,
    bedrooms: 5,
    bathrooms: 4,
    main_image: "/src/assets/property-5.jpg",
    is_featured: true,
  },
];

export const listProperties = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("id,title,slug,type,location,price,bedrooms,bathrooms,main_image,is_featured")
      .order("is_featured", { ascending: false })
      .order("id", { ascending: true });
    if (error) throw new Error(error.message);
    return (data?.length ? data : fallbackProperties) as Property[];
  } catch (error) {
    console.warn("Using bundled property listings fallback:", error);
    return fallbackProperties;
  }
});
