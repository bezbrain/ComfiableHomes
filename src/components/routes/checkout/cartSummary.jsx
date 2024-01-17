import React from "react";
import "../../../styles/checkout/cartSummary.css";

const CartSummary = () => {
  return (
    <div className="checkout-cart-summary">
      <h2>CART SUMMARY</h2>
      <div>
        <p>Subtotal</p>
        <p>N 2,525</p>
      </div>
      <button>PAY NOW</button>
    </div>
  );
};

export default CartSummary;
