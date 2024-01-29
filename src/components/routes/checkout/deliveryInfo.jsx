import React from "react";
import "../../../styles/checkout/deliverInfo.css";
import { RiEdit2Fill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { useCheckoutContext } from "../../../contexts/checkoutContext";
import { CheckoutAddressInput, AddressHighlight } from "./";
import { Loader } from "../../helpers";
import { getDeliveryInfo } from "../../../apis/checkout";
import { toast } from "react-toastify";

const DeliveryInfo = () => {
  const {
    editController,
    setEditController,
    addressPreviewLoading,
    changeAddressBtn,
    setChangeAddressBtn,
    deliInfo,
    setDeliInfo,
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

  const handleEditClick = async () => {
    setEditController(false);
    setChangeAddressBtn(false);
    const { data } = await getDeliveryInfo(toast);
    // console.log(data.address);
    setDeliInfo({
      ...deliInfo,
      firstName: data.address.firstName,
      lastName: data.address.lastName,
      address: data.address.address,
      city: data.address.city,
      zipCode: data.address.zipCode,
      mobileNumber: data.address.mobileNumber,
      email: data.address.email,
      state: data.address.state,
      country: data.address.country,
    });
    setChangeAddressBtn(false); // Set this to false again because the api call above can cause it to turn to true
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
