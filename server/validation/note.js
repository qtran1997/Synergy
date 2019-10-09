import validator from "validator";
import isEmpty from "../util/isEmpty";

const validateNoteModification = data => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";

  if (validator.isEmpty(data.title)) {
    errors.title = `Note title cannot be blank`;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateNoteModification;
