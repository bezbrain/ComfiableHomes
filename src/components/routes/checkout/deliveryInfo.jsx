import React from "react";
import "../../../styles/checkout/deliverInfo.css";
import { RiEdit2Fill } from "react-icons/ri";
import { useCheckoutContext } from "../../../contexts/checkoutContext";

const DeliveryInfo = () => {
  const { editController } = useCheckoutContext();
  return (
    <section className="checkout-form">
      <div className="checkout-header">
        <h2>Delivery Information</h2>
        {editController && (
          <p>
            EDIT <RiEdit2Fill />
          </p>
        )}
      </div>
      <form>
        <div className="names-con checkout-input-con">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <div className="address-con checkout-input-con">
          <input type="text" placeholder="Address" />
        </div>
        <div className="location-con checkout-input-con">
          <input type="text" placeholder="City/Town" />
          <input type="text" placeholder="Zip Code" />
        </div>
        <div className="contact-con checkout-input-con">
          <input type="text" placeholder="Mobile Number" />
          <input type="text" placeholder="Email Address" />
        </div>
        <button className="checkout-info-btn">Submit Address</button>
      </form>
    </section>
  );
};

export default DeliveryInfo;
