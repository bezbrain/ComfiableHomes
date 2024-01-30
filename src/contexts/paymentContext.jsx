import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const PaymentProvider = ({ children }) => {
  const paymentDetails = {
    email: "",
    amount: "",
  };

  const [details, setDetails] = useState(paymentDetails);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const paymentGlobalContext = () => {
  return useContext(AppContext);
};
