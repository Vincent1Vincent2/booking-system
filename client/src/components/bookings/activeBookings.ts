import { Booking } from "@prisma/client";
import { removeButton } from "./removeButton";

export function activeBookingsElement(booking: Booking) {
  const activeBooking = document.createElement("div");
  activeBooking.id = booking.id.toString();
  activeBooking.setAttribute("data-cy", "booking");

  const room = document.createElement("p");
  room.textContent = "Room " + booking.roomId;

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.disabled = true;
  dateInput.value = booking.date.toString().substring(0, 10);
  dateInput.name = "date";
  dateInput.setAttribute("data-cy", "dateSelector");

  activeBooking.appendChild(room);
  activeBooking.appendChild(dateInput);
  removeButton(booking.id, activeBooking);

  return activeBooking;
}
