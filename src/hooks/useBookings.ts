import { useQuery } from "@tanstack/react-query";
import { getBookingsAdmin } from "@/lib/bookings";

export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getBookingsAdmin,
  });
};