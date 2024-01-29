import React, { createContext, useContext, useEffect, useState } from "react";
import { getDeliveryInfo } from "../apis/checkout";

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
    state: "",
    country: "",
  };
  const [editController, setEditController] = useState(false);
  const [deliInfo, setDeliInfo] = useState(deliveryInfo);
  const [changeAddressBtn, setChangeAddressBtn] = useState(true);

  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [addressPreviewLoading, setAddressPreviewLoading] = useState(false);

  const [addresssInfo, setAddressInfo] = useState({});

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

  // USE THIS TO MAKE SURE ADDRESS PREVIEW RENDERS IF ADDRESS HAD BEEN FIRST INPUTTED
  const getAddress = async (toast) => {
    try {
      // setEditController(true);
      // setAddressPreviewLoading(true);
      const { data } = await getDeliveryInfo();
      setAddressInfo(data.address || "");
      setEditController(data.success);
      setAddressPreviewLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
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
        addresssInfo,
        setAddressInfo,
        getAddress,
        changeAddressBtn,
        setChangeAddressBtn,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};
