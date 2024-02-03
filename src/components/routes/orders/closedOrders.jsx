import React, { useState } from "react";
import { OrderCard } from "./";
import { NoOrder } from "./";

const ClosedOrders = () => {
  const [isOrder, setIsOrder] = useState(true);

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
