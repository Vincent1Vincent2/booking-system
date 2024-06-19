const { updateBookingBadge } = require("../utils/bookingBadge.ts");

const { createBookingError } = require("../error/createBookingError.ts");
const { createBooking } = require("../utils/api/bookings.ts");
const { roomError } = require("../error/roomError.ts");

const { setupLoginForm } = require("../user/login.ts");
const { getRooms } = require("../utils/api/room.ts");
const axios = require("axios");
let bookingForm: HTMLFormElement | null;

export async function setupBookingForm() {
  if (document.getElementById("bookingForm")) {
    return;
  }

  try {
    const rooms = await getRooms();
    if (rooms.error) {
      roomError(rooms);
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      setupLoginForm();
      return;
    }

    if (bookingForm) {
      bookingForm.remove();
    }

    bookingForm = document.createElement("form");
    bookingForm.id = "bookingForm";

    const roomSelector = document.createElement("select");
    roomSelector.id = "roomSelector";
    for (let room of rooms) {
      const roomOption = document.createElement("option");
      roomOption.id = `room-${room.id}`;
      roomOption.value = room.id.toString();
      roomOption.textContent = room.name;
      roomSelector.appendChild(roomOption);
    }
    roomSelector.setAttribute("data-cy", "roomSelector");

    const dateInput = document.createElement("input");
    dateInput.id = "dateInput";
    dateInput.type = "date";
    dateInput.placeholder = new Date().toISOString();
    dateInput.name = "date";
    dateInput.setAttribute("data-cy", "dateSelector");

    const submitButton = document.createElement("button");
    submitButton.id = "submitButton";
    submitButton.type = "submit";
    submitButton.innerText = "Book Room";
    submitButton.setAttribute("data-cy", "bookBtn");

    bookingForm.appendChild(roomSelector);
    bookingForm.appendChild(dateInput);
    bookingForm.appendChild(submitButton);

    document.getElementById("app")?.appendChild(bookingForm);

    bookingForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const roomId = Number(roomSelector.value);
      const date = dateInput.value;

      const booking = await createBooking(roomId, date);

      if (!booking.error) {
        await updateBookingBadge();
        const successMessage = document.getElementById("successMessage");
        if (successMessage) {
          successMessage.innerText = "Booking successful";
          document.getElementById("app")?.appendChild(successMessage);
          setTimeout(() => {
            successMessage.remove();
          }, 2000);
        }
      } else {
        createBookingError(booking.error);
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
      }
    });
  } catch (error) {
    console.error("Error setting up booking form:", error);
  }
}

export function closeBookingForm() {
  if (bookingForm) {
    bookingForm.remove();
    bookingForm = null;
  }
}
