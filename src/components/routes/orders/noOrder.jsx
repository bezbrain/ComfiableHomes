import React from "react";
import "../../../styles/orders/noOrder.css";

const NoOrder = ({ noOrder }) => {
  return (
    <div className="no-order">
      <img
        src="https://th.bing.com/th/id/OIP.XVKrnIzpHLbIF-jRUqiy1gHaFj?w=273&h=205&c=7&r=0&o=5&pid=1.7"
        alt=""
      />
      <p>{noOrder}</p>
    </div>
  );
};

export default NoOrder;
