const { getRooms } = require("../room/getRooms.ts");
const axios = require("axios");
let bookingForm: HTMLFormElement | null;

export async function setupBookingForm() {
  if (document.getElementById("bookingForm")) {
    return;
  }

  try {
    const rooms = await getRooms();

    if (!rooms || rooms.length === 0) {
      throw new Error("No rooms available.");
    }

    if (bookingForm) {
      bookingForm.remove();
    }

    bookingForm = document.createElement("form");
    bookingForm.id = "bookingForm"; // Add an id to the form for reference

    const roomSelector = document.createElement("select");
    for (let room of rooms) {
      const roomOption = document.createElement("option");
      roomOption.value = room.id.toString();
      roomOption.textContent = room.name;
      roomSelector.appendChild(roomOption);
    }
    roomSelector.setAttribute("data-cy", "roomSelector");

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.placeholder = new Date().toISOString();
    dateInput.name = "date";
    dateInput.setAttribute("data-cy", "dateSelector");

    const submitButton = document.createElement("button");
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

      try {
        const response = await axios.post(
          `${process.env.API_URL}/bookings/book`,
          {
            roomId,
            date: new Date(date).toISOString(),
          },
          {
            withCredentials: true,
          }
        );
        const successMessage = document.createElement("p");
        successMessage.innerText = "Booking successful";
        document.getElementById("app")?.appendChild(successMessage);

        setTimeout(() => {
          successMessage.remove();
        }, 2000);
        console.log(response.data);
      } catch (error) {
        console.error(error);
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
