const axios = require("axios");
export async function getRooms() {
  try {
    const response = await axios.get(`${process.env.API_URL}/auth/room`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
