import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./components/context.jsx";
import { LogoutProvider } from "./utils/logoutContex.jsx";
import { ApiProvider } from "./contexts/apiContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <LogoutProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </LogoutProvider>
    </AppProvider>
  </React.StrictMode>
);
