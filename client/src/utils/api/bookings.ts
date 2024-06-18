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
    console.error("Getting current and future bookings failed:", error);
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
    console.error("Getting archived bookings failed:", error);
    return { error: error.response || error.message };
  }
}

export async function createBooking(roomId: number, date: string) {
  try {
    const booking = await axios.post(
      `${process.env.API_URL}/bookings/book`,
      { roomId, date },
      {
        withCredentials: true,
      }
    );
    if (booking.status === 200) {
      return booking.data;
    } else {
      return { error: booking.statusText };
    }
  } catch (error: typeof AxiosError) {
    console.error("Creating bookings failed:", error);
    return { error: error.response || error.message };
  }
}

export async function removeBooking(id: number) {
  try {
    const removedBooking = await axios.delete(
      `${process.env.API_URL}/bookings/${id}`,
      {
        withCredentials: true,
      }
    );
    if (removedBooking.status === 200) {
      return removedBooking.data;
    } else {
      return { error: removedBooking.statusText };
    }
  } catch (error: typeof AxiosError) {
    console.error("Creating bookings failed:", error);
    return { error: error.response || error.message };
  }
}

export async function editBooking(
  bookingId: string,
  roomId: number,
  date: string
) {
  try {
    const removedBooking = await axios.put(
      `${process.env.API_URL}/bookings/${bookingId}`,
      { roomId, date },
      {
        withCredentials: true,
      }
    );
    if (removedBooking.status === 200) {
      return removedBooking.data;
    } else {
      return { error: removedBooking.statusText };
    }
  } catch (error: typeof AxiosError) {
    console.error("Creating bookings failed:", error);
    return { error: error.response || error.message };
  }
}
