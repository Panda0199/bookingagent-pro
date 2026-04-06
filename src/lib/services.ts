import { supabase } from "./supabase";

export type ServiceFormData = {
  name: string;
  price: number;
  duration_minutes: number;
  description: string;
};

export const getServicesAdmin = async () => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const createService = async (service: ServiceFormData) => {
  const { data, error } = await supabase
    .from("services")
    .insert([
      {
        name: service.name,
        price: service.price,
        duration_minutes: service.duration_minutes,
        description: service.description,
        is_active: true,
      },
    ])
    .select();

  if (error) throw error;
  return data;
};

export const updateService = async (
  id: string,
  service: ServiceFormData
) => {
  const { data, error } = await supabase
    .from("services")
    .update({
      name: service.name,
      price: service.price,
      duration_minutes: service.duration_minutes,
      description: service.description,
    })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const deleteService = async (id: string) => {
  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id);

  if (error) throw error;
};