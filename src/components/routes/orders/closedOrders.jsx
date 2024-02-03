import React, { useState } from "react";
import { OrderCard } from "./";
import { NoOrder } from "./";

const ClosedOrders = ({ isOrder }) => {
  return (
    <>
      {isOrder ? (
        <NoOrder noOrder="No Closed Order" />
      ) : (
        <div>
          <OrderCard />
        </div>
      )}
    </>
  );
};

export default ClosedOrders;
