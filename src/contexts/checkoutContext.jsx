import React, { createContext, useContext, useEffect, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [editController, setEditController] = useState(false);

  // const [roundNumber, setRoundNumber] = useState();
  const [shippingFee] = useState(5.34);

  //   CALCULATE THE SUBTOTAL
  const calculateSubtotal = (getCartProduct) => {
    let sum = 0;
    getCartProduct?.forEach((each) => {
      // const cleanedString = each.price.replace(/,/g, ""); //Remove the commas
      const roundNum = each.counter * Number(each.price);
      sum += Number(roundNum);
      // setRoundNumber(sum);
    });
    return sum.toFixed(2);
  };

  return (
    <CheckoutContext.Provider
      value={{
        editController,
        calculateSubtotal,
        shippingFee,
        // roundNumber,
        // setRoundNumber,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};
