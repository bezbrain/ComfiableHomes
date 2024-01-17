import React from "react";
import { CartSummary, DeliveryInfo } from "../components/routes/checkout";
import "../styles/checkout/checkout.css";

const Checkout = () => {
  return (
    <main className="checkout-page">
      <DeliveryInfo />
      <CartSummary />
    </main>
  );
};

export default Checkout;
