import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeProvider } from "./hooks/theme-provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRouter />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
