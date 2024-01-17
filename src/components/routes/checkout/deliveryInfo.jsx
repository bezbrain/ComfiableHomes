import React from "react";
import "../../../styles/checkout/deliverInfo.css";
import { RiEdit2Fill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { useCheckoutContext } from "../../../contexts/checkoutContext";
import { CheckoutAddressInput, AddressHighlight } from "./";

const DeliveryInfo = () => {
  const { editController } = useCheckoutContext();

  return (
    <section className="checkout-section">
      <div className="checkout-header">
        <h2>Delivery Information</h2>
        {editController && (
          <p>
            EDIT <RiEdit2Fill />
          </p>
        )}
      </div>

      {!editController ? <CheckoutAddressInput /> : <AddressHighlight />}

      <a href="/products" className="go-to-product">
        <IoIosArrowBack />
        Go back & continue shopping
      </a>
    </section>
  );
};

export default DeliveryInfo;
