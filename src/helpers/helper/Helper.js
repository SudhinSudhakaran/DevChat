//Validations
export const Helper = {
  // Validation function for Email
  isValidEmail(email) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  },
  // Validation for the text is empty or not
  isEmpty(text) {
    return (text?.trim() ?? '').length === 0;
  },
};
