const axios = require("axios");

export async function register(
  email: string,
  password: string,
  recaptchaToken: string
) {
  try {
    const user = await axios.post(
      `${process.env.API_URL}/auth/register`,
      {
        email,
        password,
        recaptchaToken,
      },
      {
        withCredentials: true,
      }
    );
    if (user.status === 200) {
      const event = new CustomEvent("register");
      document.dispatchEvent(event);
      return;
    } else {
      return { error: user.statusText };
    }
  } catch (error: typeof AxiosError) {
    return { error: error.response || error.message };
  }
}

export async function login(email: string, password: string) {
  try {
    const user = await axios.post(
      `${process.env.API_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (user.status === 200) {
      const event = new CustomEvent("login");
      document.dispatchEvent(event);
      return;
    } else {
      return { error: user.statusText };
    }
  } catch (error: typeof AxiosError) {
    return { error: error.response || error.message };
  }
}

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
