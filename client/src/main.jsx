import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter.jsx";
import { store, persistor } from "./app/store";
import { ThemeProvider } from "./hooks/theme-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
