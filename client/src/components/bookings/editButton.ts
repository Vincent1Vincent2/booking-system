const { roomError } = require("../../error/roomError");
const { setupLoginForm } = require("../../user/login");
const { getRooms } = require("../../utils/api/room");
const { editBooking } = require("../../utils/api/bookings");

export async function editButton(
  bookingId: number,
  container: HTMLElement,
  roomId: number,
  date: string
) {
  const rooms = await getRooms();
  const roomSelector = document.createElement("select");
  if (rooms.error) {
    roomError(rooms);
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    setupLoginForm();
    return;
  }
  for (let room of rooms) {
    const roomOption = document.createElement("option");
    roomOption.id = `room-${room.id}`;
    roomOption.value = room.id.toString();
    roomOption.textContent = room.name;
    roomSelector.appendChild(roomOption);
  }

  const editButton = document.createElement("button");

  editButton.setAttribute("data-cy", "editBookingBtn");
  editButton.textContent = "Edit Booking";

  const saveBookingButton = document.createElement("button");
  saveBookingButton.setAttribute("data-cy", "saveBookingBtn");
  saveBookingButton.textContent = "Confirm";

  container.appendChild(editButton);

  editButton.addEventListener("click", async () => {
    container.appendChild(saveBookingButton);
    const dateInput =
      (document.getElementById(`dateInput-${roomId}`) as HTMLInputElement) ||
      null;
    if (dateInput) {
      dateInput.disabled = false;
      dateInput.value = date;
    }
    container.appendChild(roomSelector);
    roomSelector.value = roomId.toString();
  });

  saveBookingButton.addEventListener("click", async () => {
    const dateInput =
      (document.getElementById(`dateInput-${roomId}`) as HTMLInputElement) ||
      null;
    const newRoomId = Number(roomSelector.value);
    const newDate = dateInput.value;

    const result = await editBooking(bookingId, newRoomId, newDate);

    if (result.error) {
      console.error(result.error);
      alert("Failed to update booking.");
    } else {
      location.reload();
    }
  });
}
