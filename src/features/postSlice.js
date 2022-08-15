import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload);
    },
    removePost: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updatePost: (state, action) => {
      state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
          item.decription = action.payload.decription;
        }
      });
    },
  },
});

export const { addPost, removePost, updatePost } = postSlice.actions;

export default postSlice.reducer;
