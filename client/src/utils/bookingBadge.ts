const { getMyBookings } = require("../utils/api/bookings");

export async function updateBookingBadge() {
  const bookingsBadge = document.getElementById("bookingsBadge");
  const bookings = await getMyBookings();
  bookingsBadge?.innerHTML === bookings.length || "";
}
