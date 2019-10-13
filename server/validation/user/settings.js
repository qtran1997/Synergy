import validator from "validator";
import isEmpty from "../../util/isEmpty";

const validateModifyUserSettingsInput = ({
  username,
  fname,
  lname,
  email,
  password,
  password2
}) => {
  let errors = {};

  if (
    !isEmpty(username) &&
    !validator.isLength(username, { min: 5, max: 18 })
  ) {
    errors.username = "Username must be between 5 and 18 characters.";
  }

  if (!isEmpty(fname) && !validator.isLength(fname, { min: 2, max: 30 })) {
    errors.fname = "First Name must be between 2 and 30 characters.";
  }

  if (!isEmpty(lname) && !validator.isLength(lname, { min: 2, max: 30 })) {
    errors.lname = "Last Name must be between 2 and 30 characters.";
  }

  if (!isEmpty(email) && !validator.isEmail(email)) {
    errors.email = `Email is invalid.`;
  }

  if (
    !isEmpty(password) &&
    !validator.isLength(password, { min: 6, max: 30 })
  ) {
    errors.password = "Password must be at least 6 characters.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateModifyUserSettingsInput;
