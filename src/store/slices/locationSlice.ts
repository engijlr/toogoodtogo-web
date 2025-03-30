import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  postalCode: string;
  city: string;
}

const initialState: LocationState = {
  postalCode: "",
  city: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.postalCode = action.payload.postalCode;
      state.city = action.payload.city;
    },
    clearLocation: (state) => {
      state.postalCode = "";
      state.city = "";
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
