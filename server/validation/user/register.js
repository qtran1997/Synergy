import validator from "validator";
import isEmpty from "../../util/isEmpty";

const validateRegisterInput = ({
  username,
  fname,
  lname,
  email,
  password,
  password2
}) => {
  let errors = {};

  username = !isEmpty(username) ? username : "";
  fname = !isEmpty(fname) ? fname : "";
  lname = !isEmpty(lname) ? lname : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  password2 = !isEmpty(password2) ? password2 : "";

  if (!validator.isLength(username, { min: 5, max: 18 })) {
    errors.username = "Username must be between 5 and 18 characters.";
  }

  if (!validator.isLength(fname, { min: 2, max: 30 })) {
    errors.fname = "First Name must be between 2 and 30 characters.";
  }

  if (!validator.isLength(lname, { min: 2, max: 30 })) {
    errors.lname = "Last Name must be between 2 and 30 characters.";
  }

  if (validator.isEmpty(username)) {
    errors.username = `Username field is required.`;
  }

  if (validator.isEmpty(fname)) {
    errors.fname = `First Name field is required.`;
  }

  if (validator.isEmpty(lname)) {
    errors.lname = `Last Name field is required.`;
  }

  if (validator.isEmpty(email)) {
    errors.email = `Email field is required.`;
  }

  if (!validator.isEmail(email)) {
    errors.email = `Email is invalid.`;
  }

  if (validator.isEmpty(password)) {
    errors.password = `Password field is required.`;
  }

  if (!validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (validator.isEmpty(password2)) {
    errors.password2 = `Confirm Password field is required.`;
  }

  if (!validator.equals(password, password2)) {
    errors.password2 = `Passwords must match.`;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateRegisterInput;
