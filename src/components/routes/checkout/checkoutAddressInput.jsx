import React from "react";
import "../../../styles/checkout/checkoutAddress.css";
import { useCheckoutContext } from "../../../contexts/checkoutContext";

const CheckoutAddressInput = () => {
  const { deliInfo, setDeliInfo } = useCheckoutContext();
  const { firstName, lastName, address, city, zipCode, mobileNumber, email } =
    deliInfo;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliInfo({
      ...deliInfo,
      [name]: value,
    });
  };

  return (
    <form className="checkout-form">
      <div className="names-con checkout-input-con">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={lastName}
          onChange={handleInputChange}
        />
      </div>
      <div className="address-con checkout-input-con">
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={address}
          onChange={handleInputChange}
        />
      </div>
      <div className="location-con checkout-input-con">
        <input
          type="text"
          placeholder="City/Town"
          name="city"
          value={city}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Zip Code"
          name="zipCode"
          value={zipCode}
          onChange={handleInputChange}
        />
      </div>
      <div className="contact-con checkout-input-con">
        <input
          type="number"
          placeholder="Mobile Number"
          name="mobileNumber"
          value={mobileNumber}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
      </div>
      <button className="checkout-info-btn">Submit Address</button>
    </form>
  );
};

export default CheckoutAddressInput;
