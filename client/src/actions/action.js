import axios from "axios";

export const test = () => {
  axios
    .get("/api/users/test")
    .then(res => {
      // Save to localStorage
      const { token } = res.data;

      return token;
    })
    .catch(err => err);
};
