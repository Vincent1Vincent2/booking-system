const { removeBooking } = require("../../utils/api/bookings");
const { updateBookingBadge } = require("../../utils/bookingBadge");

export function removeButton(id: number, container: HTMLElement) {
  const removeButton = document.createElement("button");
  removeButton.setAttribute("data-cy", "deleteBookingBtn");
  removeButton.textContent = "Remove Booking";

  const confirmationButton = document.createElement("button");
  confirmationButton.setAttribute("data-cy", "confirmDeleteBtn");
  confirmationButton.textContent = "Are you sure?";

  container.appendChild(removeButton);

  removeButton.addEventListener("click", async () => {
    container.appendChild(confirmationButton);
  });

  confirmationButton.addEventListener("click ", async () => {
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
