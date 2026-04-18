import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for your slice state
interface UiState {
 
  isRtl?: boolean;
 isShowWalkThrough?: boolean;
 language?: string;
}

// Initial state typed correctly
const initialState: UiState = {
  isShowWalkThrough: false,

  isRtl: false,
language: "en",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsRtl: (state, action: PayloadAction<boolean>) => {
      state.isRtl = action.payload;
    },
setShowWalkThrough: (state, action: PayloadAction<boolean>) => {
      state.isShowWalkThrough = action.payload;
    },
     
setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },  



  },
});

export const {
  setIsRtl, 
  setShowWalkThrough,
  setLanguage,
} = uiSlice.actions;
export default uiSlice.reducer;
