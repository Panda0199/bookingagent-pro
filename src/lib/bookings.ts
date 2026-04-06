import { supabase } from "./supabase";

export const getBookingsAdmin = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("booking_date", { ascending: true })
    .order("booking_time", { ascending: true });

  if (error) throw error;
  return data || [];
};