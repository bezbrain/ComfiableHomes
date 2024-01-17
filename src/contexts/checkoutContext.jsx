import React, { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [editController, setEditController] = useState(false);

  return (
    <CheckoutContext.Provider value={{}}>{children}</CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};
