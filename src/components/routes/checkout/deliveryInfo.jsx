import React from "react";
import "../../../styles/checkout/deliverInfo.css";
import { RiEdit2Fill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { useCheckoutContext } from "../../../contexts/checkoutContext";
import { CheckoutAddressInput, AddressHighlight } from "./";
import { Loader } from "../../helpers";

const DeliveryInfo = () => {
  const {
    editController,
    setEditController,
    addressPreviewLoading,
    changeAddressBtn,
    setChangeAddressBtn,
  } = useCheckoutContext();

  const checkLoading = () => {
    if (addressPreviewLoading) {
      return <Loader />;
    } else {
      if (!editController) {
        return <CheckoutAddressInput />;
      }
      return <AddressHighlight />;
    }
  };

  const handleEditClick = () => {
    setEditController(false);
    setChangeAddressBtn(false);
  };

  return (
    <section className="checkout-section">
      <div className="checkout-header">
        <h2>Delivery Information</h2>
        {editController && (
          <p onClick={handleEditClick}>
            EDIT <RiEdit2Fill />
          </p>
        )}
      </div>

      {checkLoading()}

      <a href="/products" className="go-to-product">
        <IoIosArrowBack />
        Go back & continue shopping
      </a>
    </section>
  );
};

export default DeliveryInfo;
