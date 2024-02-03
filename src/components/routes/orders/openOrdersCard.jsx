import React from "react";
import "../../../styles/orders/openOrderCard.css";

const OpenOrderCard = () => {
  return (
    <div className="open-order-card">
      <img
        src="https://www.course-api.com/images/store/product-12.jpeg"
        alt="Order"
      />
      <summary className="order-summary">
        <p>Name of the product</p>
        <p>status</p>
        <p>On 23-12</p>
      </summary>
      <button>SEE DETAILS</button>
    </div>
  );
};

export default OpenOrderCard;
