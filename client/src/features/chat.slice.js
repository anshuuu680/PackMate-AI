import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChat: null,
  chatId: null,
  chats: [],
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeChat: (state, action) => {
      const id = action.payload;
      state.chats = state.chats.filter((chat) => chat.id !== id);
      if (state.chatId === id) {
        state.chatId = null;
        state.activeChat = null;
        state.messages = [];
      }
    },
  },
});

export const {
  setActiveChat,
  setChatId,
  setChats,
  setMessages,
  addMessage,
  removeChat,
} = chatSlice.actions;

export default chatSlice.reducer;
