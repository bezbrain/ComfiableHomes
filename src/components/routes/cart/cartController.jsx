import React from "react";
import { useApiContext } from "../../../contexts/apiContext";

const CartController = ({ id, counter }) => {
  const {
    increaseHandler,
    decreaseHandler,
    isCartIncrease,
    isCartDecrease,
    setIsCartIncrease,
    setIsCartDecrease,
  } = useApiContext();

  return (
    <td>
      <div className="count-con">
        <button
          className={isCartDecrease ? "decrease" : ""}
          // disabled={isCartDisable}
          onClick={async () => {
            await decreaseHandler(id);
          }}
        >
          -
        </button>
        <p>{counter}</p>
        <button
          className={isCartIncrease ? "increase" : ""}
          onClick={() => increaseHandler(id)}
        >
          +
        </button>
      </div>
    </td>
  );
};

export default CartController;
