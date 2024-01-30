import { createContext, useContext } from "react";

const AppContext = createContext();

export const PaymentProvider = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const paymentGlobalContext = () => {
  return useContext(AppContext);
};
