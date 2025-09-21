import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import chatReducer from "../features/chat.slice";
import selectedItemsReducer from "../features/items.slice";

const persistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  chat: chatReducer,
  selectedItems: selectedItemsReducer, // ✅ use plural to match slice
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    storage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
