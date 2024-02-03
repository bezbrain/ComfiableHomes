import React, { useEffect, useState } from "react";
import "../../styles/orders/orders.css";
import { OrderCard } from "../routes/orders";
import { useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

const Order = () => {
  const [isActive, setisActive] = useState(false);

  const location = useLocation();

  const handleOpenClick = () => {
    setisActive(false);
  };

  const handleCloseClick = () => {
    setisActive(true);
  };

  // Make sure active state is on closed when on closed page
  useEffect(() => {
    if (location.pathname === "/orders/closed") {
      setisActive(true);
    }
  }, [location.pathname]);

  return (
    <main className="all-orders-page">
      <div>
        <h1>Orders</h1>
        <div className="order-type">
          <Link
            to="/orders/open"
            className={`${!isActive ? "active-color" : ""}`}
            onClick={handleOpenClick}
          >
            OPEN <span className="hide-orders">ORDERS</span>
          </Link>
          <Link
            to="closed"
            className={`${isActive ? "second-active-color" : ""}`}
            onClick={handleCloseClick}
          >
            CLOSED <span className="hide-orders">ORDERS</span>
          </Link>
        </div>
      </div>

      <Outlet />
    </main>
  );
};

export default Order;
