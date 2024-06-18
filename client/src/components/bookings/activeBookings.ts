import { Booking } from "@prisma/client";
const { removeButton } = require("./removeButton");
const { editButton } = require("./editButton");

export function activeBookingsElement(booking: Booking, roomName: string) {
  const activeBooking = document.createElement("div");
  activeBooking.id = booking.id.toString();
  activeBooking.setAttribute("data-cy", "booking");

  const room = document.createElement("p");
  room.textContent = roomName;
  room.setAttribute("data-cy", "room");

  const dateInput = document.createElement("input");
  dateInput.id = `dateInput-${booking.roomId}`;
  dateInput.type = "date";
  dateInput.disabled = true;
  dateInput.value = booking.date.toString().substring(0, 10);
  dateInput.name = "date";
  dateInput.setAttribute("data-cy", "dateSelector");

  activeBooking.appendChild(room);
  activeBooking.appendChild(dateInput);
  removeButton(booking.id, activeBooking);
  editButton(
    booking.id,
    activeBooking,
    booking.roomId,
    booking.date.toString().substring(0, 10)
  );

  return activeBooking;
}
