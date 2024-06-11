const axios = require("axios");

const verifyRecaptcha = async (token) => {
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
  );
  return response.data.success;
};

module.exports = { verifyRecaptcha };
