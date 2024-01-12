import React from "react";
import { Link } from "react-router-dom";

const EmptyCartUI = () => {
  return (
    <>
      <h2>Your cart is empty</h2>
      <Link to="/products" className="fill-it-btn">
        FILL IT
      </Link>
    </>
  );
};

export default EmptyCartUI;
