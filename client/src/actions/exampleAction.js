import axios from "axios";

export const test = () => {
  axios
    .get("/api/users/test")
    .then(res => {
      // Retrieve token (data) from the REST call
      const { token } = res.data;

      return token;
    })
    .catch(err => err);
};
