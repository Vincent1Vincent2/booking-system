const { removeBooking } = require("../../utils/api/bookings");
const { updateBookingBadge } = require("../../utils/bookingBadge");

export function removeButton(id: number, container: HTMLElement) {
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove Booking";

  container.appendChild(removeButton);

  removeButton.addEventListener("click", async () => {
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
