import React from "react";
import "../../../styles/checkout/addressHighlight.css";
import { useCheckoutContext } from "../../../contexts/checkoutContext";

const AddressHighlight = () => {
  const { addresssInfo, setAddressInfo } = useCheckoutContext();

  // console.log(addresssInfo);
  const {
    firstName,
    lastName,
    address,
    city,
    state,
    country,
    zipCode,
    mobileNumber,
  } = addresssInfo;

  return (
    <div className="address-highlight-con">
      <h2>
        {firstName} {lastName}
      </h2>
      <address>
        {address}, {city}, {state}, {country}, {zipCode}
      </address>
      <p>{mobileNumber}</p>
    </div>
  );
};

export default AddressHighlight;
