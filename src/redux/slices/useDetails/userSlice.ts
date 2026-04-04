import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for userDetails if possible
interface UserDetails {
  fullname?: string;
  email?: string;
  profile_pic?: string;
 password?: string;
}

// Define the state interface
interface UserState {
  userDetails: UserDetails | null;
  
  isFirstLogin: boolean;
  currentLanguage: string;
  name: string;
   
  isUserLoggedIn: boolean;
}

const initialState: UserState = {
  userDetails: null,
  
  isFirstLogin: true,
  currentLanguage: "en",
   name: "",
  
  isUserLoggedIn: false,
  
};

const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetails | null>) => {
      state.userDetails = action.payload;
    },
 
 
 

  
 
    setIsFirstLogin: (state, action: PayloadAction<boolean>) => {
      state.isFirstLogin = action.payload;
    },
    setSelectedLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
    },
 
 
    setIsUserIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isUserLoggedIn = action.payload;
    },
    
  },
});

export const {
  setUserDetails,
  setIsFirstLogin,
  setSelectedLanguage,
  setIsUserIsLoggedIn,
} = userSlice.actions;

export default userSlice.reducer;
