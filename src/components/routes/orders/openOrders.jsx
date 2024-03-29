import React, { useState } from "react";
import { OrderCard } from "./";
import { NoOrder } from "./";

const OpenOrders = ({ isOrder }) => {
  return (
    <>
      {isOrder ? (
        <NoOrder noOrder="No Open Order" />
      ) : (
        <div>
          <OrderCard />
        </div>
      )}
    </>
  );
};

export default OpenOrders;
