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

export const listProperties = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase
    .from("properties")
    .select("id,title,slug,type,location,price,bedrooms,bathrooms,main_image,is_featured")
    .order("is_featured", { ascending: false })
    .order("id", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Property[];
});
