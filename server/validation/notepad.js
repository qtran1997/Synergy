// import validator from "validator";
import isEmpty from "../util/isEmpty";

export const validateNotepadCreation = data => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  //  TODO
  //  REGEX
  //  MAKE SURE ITS NOT JAVASCRIPT

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export const validateNotepadModification = data => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  //  TODO
  //  REGEX
  //  MAKE SURE ITS NOT JAVASCRIPT

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
