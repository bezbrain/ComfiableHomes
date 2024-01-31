import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [email, setEmail] = useState("");

  return (
    <AppContext.Provider value={{ email, setEmail }}>
      {children}
    </AppContext.Provider>
  );
};

export const paymentGlobalContext = () => {
  return useContext(AppContext);
};
