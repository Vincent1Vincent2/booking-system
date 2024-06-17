import { Booking } from "@prisma/client";
const {
  getMyBookings,
  getMyArchivedBookings,
} = require("../utils/bookings.ts");
let myBookings: HTMLElement | null;
let currentContainer: HTMLDivElement | null;
let archivedContainer: HTMLDivElement | null;

export async function setupMyBookings() {
  if (document.getElementById("bookingsContainer")) {
    return;
  }

  try {
    const bookings = await getMyBookings();
    const archivedBookings = await getMyArchivedBookings();

    if (myBookings) {
      myBookings.remove();
    }
    if (currentContainer) {
      currentContainer.remove();
    }

    if (archivedContainer) {
      archivedContainer.remove();
    }

    myBookings = document.createElement("main");
    myBookings.id = "bookingsContainer";
    myBookings.setAttribute("data-cy", "bookingsContainer");
    currentContainer = document.createElement("div");
    currentContainer.id = "currentBookings";
    archivedContainer = document.createElement("div");
    archivedContainer.id = "archivedBookings";

    if (!bookings.error) {
      bookings.forEach((booking: Booking) => {
        const activeBooking = activeBookingsElement(booking);
        myBookings!.appendChild(activeBooking);
      });
    } else if (bookings.error.status === 404) {
      noCurrentBookings();
    }

    if (!archivedBookings.error) {
      archivedBookings.forEach((booking: Booking) => {
        const archivedBooking = archivedBookingsElement(booking);
        myBookings!.appendChild(archivedBooking);
      });
    } else if (archivedBookings.error.status === 404) {
      noArchivedBookings();
    }

    document.getElementById("app")?.appendChild(myBookings);
    document.getElementById("app")?.appendChild(currentContainer);
    document.getElementById("app")?.appendChild(archivedContainer);
  } catch (error) {
    console.error("Error viewing your booking:", error);
  }
}

export function closeMyBooking() {
  if (myBookings) {
    myBookings.remove();
    myBookings = null;
    currentContainer?.remove();
    currentContainer = null;
    archivedContainer?.remove();
    archivedContainer = null;
  }
}

function activeBookingsElement(booking: Booking) {
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

  return activeBooking;
}

function archivedBookingsElement(booking: Booking) {
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

function noCurrentBookings() {
  const h3 = document.createElement("h3");
  h3.innerHTML = "No upcoming Bookings";
  currentContainer?.appendChild(h3);
}

function noArchivedBookings() {
  const h3 = document.createElement("h3");
  h3.innerHTML = "No Archived Bookings";

  archivedContainer?.appendChild(h3);
}
