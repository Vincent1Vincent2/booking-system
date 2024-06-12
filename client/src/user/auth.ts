const axios = require("axios");

export async function isAuthenticated() {
  try {
    const response = await axios.get(`${process.env.API_URL}/auth/user`, {
      withCredentials: true,
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}
