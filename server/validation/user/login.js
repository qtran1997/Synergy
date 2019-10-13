import validator from "validator";
import isEmpty from "../../util/isEmpty";

const validateLoginInput = ({ username, password }) => {
  let errors = {};

  username = !isEmpty(username) ? username : "";
  password = !isEmpty(password) ? password : "";

  if (validator.isEmpty(username)) {
    errors.username = `Username field is required`;
  }

  if (validator.isEmpty(password)) {
    errors.password = `Password field is required`;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateLoginInput;
