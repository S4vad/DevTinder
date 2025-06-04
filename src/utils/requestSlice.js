import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequest: (state, action) =>
      state.filter((item) => item._id !== action.payload),
  },
});

export default requestSlice.reducer;
export const {addRequest,removeRequest}= requestSlice.actions;