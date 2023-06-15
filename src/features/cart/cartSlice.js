import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./cartAPI";

const initialState = {
  value: 0,
  status: "idle",
};

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    extraReducers: (builder) => {
      builder
        .addCase(incrementAsync.pending, (state) => {
          state.status = "loading";
        })
        .addCase(incrementAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.value += action.payload;
        });
    },
  },
});

export const { increment } = cartSlice.actions;

export const selectCount = (state) => state.counter.value;

export default cartSlice.reducer;
