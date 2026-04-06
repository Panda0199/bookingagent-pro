import { useBookings } from "@/hooks/useBookings";

const BookingsManager = () => {
  const { data: bookings, isLoading, error } = useBookings();

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-2">Appointment Bookings</h2>
      <p className="text-gray-600 mb-6">
        All successful bookings created through the AI assistant will appear here.
      </p>

      {isLoading && <p>Loading bookings...</p>}
      {error && <p className="text-red-500">Failed to load bookings.</p>}

      {!isLoading && !error && bookings?.length === 0 && (
        <p className="text-gray-500">No bookings found yet.</p>
      )}

      {!isLoading && !error && bookings && bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((booking: any) => (
            <div
              key={booking.id}
              className="rounded-xl border p-4"
            >
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{booking.customer_name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium break-all">{booking.customer_email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{booking.customer_phone || "-"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-medium">{booking.service_name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{booking.booking_date}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{booking.booking_time}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium capitalize">{booking.status}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Created By</p>
                  <p className="font-medium">{booking.created_by}</p>
                </div>
              </div>

              {booking.notes && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="text-sm">{booking.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsManager;