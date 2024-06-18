const axios = require("axios");
const { AxiosError } = require("axios");

export async function getRooms() {
  try {
    const rooms = await axios.get(`${process.env.API_URL}/rooms/room`, {
      withCredentials: true,
    });
    return rooms.data;
  } catch (error: typeof AxiosError) {
    console.log(error.response.data);
    console.error("Getting bookings failed:", error);
    return { error: error.response || error.message };
  }
}
