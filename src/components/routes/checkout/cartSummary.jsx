import React from "react";
import "../../../styles/checkout/cartSummary.css";

const CartSummary = () => {
  return (
    <div className="checkout-cart-summary">
      <h3>Order Summary</h3>
      <hr />
      <div className="items-total">
        <p>
          Item's total <span>(2)</span>
        </p>
        <p>N 2,525</p>
      </div>
      <hr />
      <div className="checkout-items-total">
        <h4>Total</h4>
        <h2>N2,525</h2>
      </div>
      <hr />
      <button className="checkout-pay-now-btn">PAY NOW</button>
      <p className="checkout-condition">
        By proceeding, you are automatically accepting the{" "}
        <a href="">Terms & Conditions</a>
      </p>
    </div>
  );
};

export default CartSummary;
