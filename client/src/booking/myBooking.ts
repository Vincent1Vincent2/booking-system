import { Booking } from "@prisma/client";
import { getRooms } from "../utils/api/room";
const {
  archivedBookingsElement,
} = require("../components/bookings/archivedBookings.ts");
const {
  activeBookingsElement,
} = require("../components/bookings/activeBookings.ts");
const {
  archivedBookingError,
  currentBookingError,
} = require("../error/myBookingError.ts");
const {
  getMyBookings,
  getMyArchivedBookings,
} = require("../utils/api/bookings.ts");
let myBookings: HTMLElement | null;
let currentContainer: HTMLDivElement | null;
let archivedContainer: HTMLDivElement | null;

export async function setupMyBookings() {
  if (document.getElementById("bookingsContainer")) {
    return;
  }

  try {
    const [bookings, archivedBookings, rooms] = await Promise.all([
      getMyBookings(),
      getMyArchivedBookings(),
      getRooms(),
    ]);

    if (rooms.error) {
      throw new Error("Failed to fetch rooms.");
    }

    const roomMap = new Map<number, string>();
    rooms.forEach((room: { id: number; name: string }) => {
      roomMap.set(room.id, room.name);
    });

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
    myBookings.setAttribute("data-cy", "bookingsContainer");
    myBookings.id = "bookingsContainer";

    currentContainer = document.createElement("div");
    currentContainer.id = "currentBookings";

    archivedContainer = document.createElement("div");
    archivedContainer.id = "archivedBookings";

    if (!bookings.error) {
      bookings.forEach((booking: Booking) => {
        const roomName = roomMap.get(booking.roomId) || "Unknown Room";
        const activeBooking = activeBookingsElement(booking, roomName);
        myBookings!.appendChild(activeBooking);
      });
    } else {
      currentBookingError(bookings.error.status, currentContainer);
    }

    if (!archivedBookings.error) {
      archivedBookings.forEach((booking: Booking) => {
        const roomName = roomMap.get(booking.roomId) || "Unknown Room";
        const archivedBooking = archivedBookingsElement(booking, roomName);
        myBookings!.appendChild(archivedBooking);
      });
    } else {
      archivedBookingError(archivedBookings.error.status, archivedContainer);
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
