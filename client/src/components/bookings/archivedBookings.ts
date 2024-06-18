import { Booking } from "@prisma/client";

export function archivedBookingsElement(booking: Booking) {
  const archivedBooking = document.createElement("div");
  archivedBooking.id = booking.id.toString();
  archivedBooking.setAttribute("data-cy", "booking");

  const room = document.createElement("p");
  room.textContent = "Room " + booking.roomId;

  const dateInput = document.createElement("p");
  dateInput.innerHTML = booking.date.toString().substring(0, 10);
  dateInput.setAttribute("data-cy", "date");

  archivedBooking.appendChild(room);
  archivedBooking.appendChild(dateInput);

  return archivedBooking;
}
