import React, { createContext, useContext, useEffect, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const deliveryInfo = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    mobileNumber: "",
    email: "",
  };
  const [editController, setEditController] = useState(false);
  const [deliInfo, setDeliInfo] = useState(deliveryInfo);

  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [addressPreviewLoading, setAddressPreviewLoading] = useState(false);

  const [shippingFee] = useState(5.34);

  //   CALCULATE THE SUBTOTAL
  const calculateSubtotal = (getCartProduct) => {
    let sum = 0;
    getCartProduct?.forEach((each) => {
      // const cleanedString = each.price.replace(/,/g, ""); //Remove the commas
      const roundNum = each.counter * Number(each.price);
      sum += Number(roundNum);
    });
    return sum.toFixed(2);
  };

  return (
    <CheckoutContext.Provider
      value={{
        editController,
        setEditController,
        calculateSubtotal,
        shippingFee,
        deliInfo,
        setDeliInfo,
        isAddressLoading,
        setIsAddressLoading,
        addressPreviewLoading,
        setAddressPreviewLoading,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};
