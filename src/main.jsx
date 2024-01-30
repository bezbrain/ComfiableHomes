import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./contexts/context.jsx";
import { ApiProvider } from "./contexts/apiContext.jsx";
import { CheckoutProvider } from "./contexts/checkoutContext.jsx";
import { PaymentProvider } from "./contexts/paymentContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <ApiProvider>
        <CheckoutProvider>
          <PaymentProvider>
            <App />
          </PaymentProvider>
        </CheckoutProvider>
      </ApiProvider>
    </AppProvider>
  </React.StrictMode>
);
