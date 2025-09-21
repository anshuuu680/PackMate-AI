import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { category, item } = action.payload;
      if (!state[category]) state[category] = [];
      if (!state[category].find((i) => i.name === item.name)) {
        state[category].push(item);
      }
    },
    removeItem: (state, action) => {
      const { category, itemName } = action.payload;
      if (state[category]) {
        state[category] = state[category].filter((i) => i.name !== itemName);
      }
    },
    resetItems: () => initialState,
  },
});

export const { addItem, removeItem, resetItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
