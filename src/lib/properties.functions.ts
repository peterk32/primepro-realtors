import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

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
  const { data, error } = await supabaseAdmin
    .from("properties")
    .select("id,title,slug,type,location,price,bedrooms,bathrooms,main_image,is_featured")
    .order("is_featured", { ascending: false })
    .order("id", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Property[];
});
