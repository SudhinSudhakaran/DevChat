import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for userDetails if possible
interface UserDetails {
  fullname?: string;
  email?: string;
  profile_pic?: string;
  markDeletion?: boolean;
  [key: string]: any; // for flexibility, remove if you have full structure
}

// Define the state interface
interface UserState {
  userDetails: UserDetails | null;
  fcmToken: string | null;
  isFirstLogin: boolean;
  currentLanguage: string;
  name: string;
  sessionToken: string | null;
  isPremiumUser: boolean;
  changeBiometric: boolean | null;
  rememberUser: UserDetails | null;
  isBiometric?: boolean;
  isNotificationEnabled?: boolean;
  isUserLoggedIn: boolean;
}

const initialState: UserState = {
  userDetails: null,
  fcmToken: null,
  isFirstLogin: true,
  currentLanguage: "en",
  name: "",
  sessionToken: null,
  isPremiumUser: false,
  isUserLoggedIn: false,
  changeBiometric: null,
  rememberUser: null,
  isBiometric: false,
  isNotificationEnabled: false,
};

const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetails | null>) => {
      state.userDetails = action.payload;
    },
    setRememberUserDetails: (
      state,
      action: PayloadAction<UserDetails | null>
    ) => {
      state.rememberUser = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      if (state.userDetails) {
        state.userDetails.fullname = action.payload;
      }
    },
    setMarkDeletion: (state, action: PayloadAction<boolean>) => {
      if (state.userDetails) {
        state.userDetails.markDeletion = action.payload;
      }
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      if (state.userDetails) {
        state.userDetails.email = action.payload;
      }
    },
    setProfilePicture: (state, action: PayloadAction<string>) => {
      if (state.userDetails) {
        state.userDetails.profile_pic =
          action.payload + "&" + "test=12" + new Date().getTime();
      }
    },
    setIsFirstLogin: (state, action: PayloadAction<boolean>) => {
      state.isFirstLogin = action.payload;
    },
    _setSelectedLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
    },
    setFcmToken: (state, action: PayloadAction<string | null>) => {
      state.fcmToken = action.payload;
    },
    setSessionToken: (state, action: PayloadAction<string | null>) => {
      state.sessionToken = action.payload;
    },
    setIsPremiumUser: (state, action: PayloadAction<boolean>) => {
      state.isPremiumUser = action.payload;
    },
    setIsUserIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isUserLoggedIn = action.payload;
    },
    changeBiometric: (state, action: PayloadAction<boolean>) => {
      state.isBiometric = action.payload;
    },
    setIsNotificationEnabled: (state, action: PayloadAction<boolean>) => {
      state.isNotificationEnabled = action.payload;
    },
  },
});

export const {
  setUserDetails,
  setIsFirstLogin,
  _setSelectedLanguage,
  setFcmToken,
  setSessionToken,
  setIsPremiumUser,
  setIsUserIsLoggedIn,
  setProfilePicture,
  setUserName,
  setUserEmail,
  setMarkDeletion,
  changeBiometric,
  setRememberUserDetails,
  setIsNotificationEnabled,
} = userSlice.actions;

export default userSlice.reducer;
