import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for your slice state
interface UiState {
  languageSwitchingIsFrom: string | null;
  swipablePanalActive: boolean;
  selectedSubjectItem: any; // You can replace `any` with a more specific type if known
  showRtlTab?: boolean;
  isRtl?: boolean;
  isRefreshDashBoard?: boolean;
  isLoginButtonLoading?: boolean;
  isSignupButtonLoading?: boolean;
}

// Initial state typed correctly
const initialState: UiState = {
  languageSwitchingIsFrom: null,
  swipablePanalActive: false,
  selectedSubjectItem: null,
  showRtlTab: false,
  isRtl: false,
  isRefreshDashBoard: false,
  isLoginButtonLoading: false,
  isSignupButtonLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsRtl: (state, action: PayloadAction<boolean>) => {
      state.isRtl = action.payload;
    },

    setShowRtlTab: (state, action: PayloadAction<boolean>) => {
      state.showRtlTab = action.payload;
    },
    setSwipablePanalActive: (state, action: PayloadAction<boolean>) => {
      state.swipablePanalActive = action.payload;
    },
    setSelectedSubjectItem: (state, action: PayloadAction<any>) => {
      state.selectedSubjectItem = action.payload;
    },
    setRefreshDashBoard: (state) => {
      state.isRefreshDashBoard = !state.isRefreshDashBoard;
    },
    setIsLoginButtonLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoginButtonLoading = action.payload;
    },
    setIsSignupButtonLoading: (state, action: PayloadAction<boolean>) => {
      state.isSignupButtonLoading = action.payload;
    },
  },
});

export const {
  setIsRtl,
  setShowRtlTab,
  setSwipablePanalActive,
  setSelectedSubjectItem,
  setRefreshDashBoard,
  setIsLoginButtonLoading,
  setIsSignupButtonLoading,
} = uiSlice.actions;
export default uiSlice.reducer;
