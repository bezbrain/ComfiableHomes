import React from "react";
import "../../../styles/orders/noOrder.css";

const NoOrder = ({ noOrder }) => {
  return (
    <div className="no-order">
      <p>{noOrder}</p>
    </div>
  );
};

export default NoOrder;
