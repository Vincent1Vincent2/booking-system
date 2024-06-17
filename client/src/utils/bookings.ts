const axios = require("axios");
const { AxiosError } = require("axios");

export async function getMyBookings() {
  try {
    const bookings = await axios.get(
      `${process.env.API_URL}/bookings/bookings`,
      {
        withCredentials: true,
      }
    );
    return bookings.data;
  } catch (error: typeof AxiosError) {
    console.error("Getting bookings failed:", error);
    return { error: error.response || error.message };
  }
}

export async function getMyArchivedBookings() {
  try {
    const bookings = await axios.get(
      `${process.env.API_URL}/bookings/bookings/archived`,
      {
        withCredentials: true,
      }
    );
    if (bookings.status === 200) {
      return bookings.data;
    } else {
      return { error: bookings.statusText };
    }
  } catch (error: typeof AxiosError) {
    console.error("Getting bookings failed:", error);
    return { error: error.response || error.message };
  }
}
