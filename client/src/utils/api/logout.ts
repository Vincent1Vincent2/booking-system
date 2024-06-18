const axios = require("axios");

export async function logout() {
  try {
    await axios.post(
      `${process.env.API_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    const event = new CustomEvent("logout");
    document.dispatchEvent(event);
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
