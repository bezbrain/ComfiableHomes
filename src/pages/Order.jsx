import React from "react";
import "../styles/orders/orders.css";
import { Orders } from "../components/routes/orders";

const Order = () => {
  return (
    <main className="all-orders-page">
      <div>
        <h1>Orders</h1>
        <div className="order-type">
          <p>OPEN ORDERS</p>
          <p>CLOSED ORDERS</p>
        </div>
      </div>

      <section className="all-orders">
        <Orders />
      </section>
    </main>
  );
};

export default Order;
