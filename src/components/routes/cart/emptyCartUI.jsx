import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/cart/emptyCart.css";

const EmptyCartUI = () => {
  return (
    <div className="empty-cart-con">
      <h2>Your cart is empty</h2>
      <Link to="/products" className="fill-it-btn">
        FILL IT
      </Link>
    </div>
  );
};

export default EmptyCartUI;
