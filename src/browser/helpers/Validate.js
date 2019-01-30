export default {
  // Tests if the username is between 4 and 50 characters
  username: un => /^.{4,50}$/.test(un),

  // Tests if the email is valid
  email: str => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str),

  // Tests if the password has at least 8 characters, an uppercase letter and a number
  password: pw => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pw)
};

// This helper tests a rule (or an array of rules)
// against a value
export function validateValue (validate, value) {

  // Valid until proven otherwise
  let isValid = true;

  // If no validate func is provided,
  // the input is always valid
  if (validate !== undefined) {

    // Multiple validation rules
    if (Array.isArray(validate)) {
      isValid = validate.reduce((areOtherRulesValids, validateFn) => {

        // Check if the array element is a validate function
        // use it if that's the case, ignore otherwise
        return typeof validateFn !== 'function'
          ? areOtherRulesValids
          : areOtherRulesValids && validateFn(value);
      }, true);

      // Single validation rule
    } else {
      isValid = validate(value);
    }
  }

  return isValid;
}
