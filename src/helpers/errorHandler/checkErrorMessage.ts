import Toast from "react-native-simple-toast";

export const checkErrorMessage = (
  error: any,
  setError?: (msg: string) => void
): string => {
  let message = "Something went wrong. Please try again.";

  switch (error?.code) {
    // 🔐 COMMON (Login + Signup)
    case "auth/invalid-email":
      message = "Invalid email format";
      break;

    case "auth/user-disabled":
      message = "This account has been disabled";
      break;

    case "auth/network-request-failed":
      message = "Network error. Check your internet connection.";
      break;

    case "auth/too-many-requests":
      message = "Too many attempts. Try again later.";
      break;

    case "auth/internal-error":
      message = "Something went wrong. Please try again.";
      break;

    // 🔑 LOGIN ERRORS
    case "auth/invalid-credential":
      message = "Invalid email or password";
      break;

    case "auth/user-not-found":
      message = "User not found";
      break;

    case "auth/wrong-password":
      message = "Incorrect password";
      break;

    // 📝 SIGNUP ERRORS
    case "auth/email-already-in-use":
      message = "This email is already registered";
      break;

    case "auth/weak-password":
      message = "Password should be at least 6 characters";
      break;

    case "auth/operation-not-allowed":
      message = "Email/password accounts are not enabled";
      break;

    // ⚠️ EDGE CASES
    case "auth/missing-email":
      message = "Please enter your email";
      break;

    case "auth/missing-password":
      message = "Please enter your password";
      break;

    default:
      message = error?.message || message;
  }

  // 🔥 Show Toast
  Toast.show(message, Toast.SHORT);

  // Optional: set state
  if (setError) {
    setError(message);
  }

  return message;
};