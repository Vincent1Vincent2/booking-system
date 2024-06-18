const { removeBooking } = require("../../utils/api/bookings");
const { updateBookingBadge } = require("../../utils/bookingBadge");

export function editButton(id: number, container: HTMLElement) {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit Booking";

  container.appendChild(editButton);

  editButton.addEventListener("click", async () => {
    const result = await removeBooking(id);

    if (result.error) {
      console.error(result.error);
      alert("Failed to remove booking.");
    } else {
      container.remove();
      alert("Booking removed successfully.");
      await updateBookingBadge();
    }
  });
}
