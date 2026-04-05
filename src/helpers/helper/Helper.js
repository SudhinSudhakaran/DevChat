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


  getRoomId(userId1, userId2) {

    console.log("userId1", userId1);
    console.log("userId2", userId2);
    const sortedIds = [userId1, userId2].sort();
    const roomId = sortedIds.join('_');
    return roomId;
  }
};
