import React, { useEffect } from "react";
import "../../../styles/checkout/checkoutAddress.css";
import { useCheckoutContext } from "../../../contexts/checkoutContext";
import { toast } from "react-toastify";
import { deliveryInfo, getDeliveryInfo } from "../../../apis/checkout";

const CheckoutAddressInput = () => {
  const {
    deliInfo,
    setDeliInfo,
    isAddressLoading,
    setIsAddressLoading,
    setEditController,
    addressPreviewLoading,
    setAddressPreviewLoading,
  } = useCheckoutContext();
  const { firstName, lastName, address, city, zipCode, mobileNumber, email } =
    deliInfo;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliInfo({
      ...deliInfo,
      [name]: value,
    });
  };

  const handleInputsClick = async (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !zipCode ||
      !mobileNumber ||
      !email
    ) {
      toast.error("No field should be empty");
    } else {
      try {
        setIsAddressLoading(true);
        const { data } = await deliveryInfo(deliInfo);
        toast.success(data.message);
        setIsAddressLoading(false);
        setEditController(data.address.isAddress);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || error.message);
      }
    }
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        setAddressPreviewLoading(true);
        const { data } = await getDeliveryInfo();
        setAddressPreviewLoading(false);
        setEditController(data.address.isAddress || false);
      } catch (error) {
        console.log(error);
      }
    };
    getAddress();
  }, []);

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
      <button
        className="checkout-info-btn"
        onClick={handleInputsClick}
        disabled={isAddressLoading}
      >
        {isAddressLoading ? "Submitting..." : "Submit Address"}
      </button>
    </form>
  );
};

export default CheckoutAddressInput;
