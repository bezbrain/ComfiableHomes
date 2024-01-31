import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [makePaymentLoading, setMakePaymentLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{ email, setEmail, makePaymentLoading, setMakePaymentLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const paymentGlobalContext = () => {
  return useContext(AppContext);
};
