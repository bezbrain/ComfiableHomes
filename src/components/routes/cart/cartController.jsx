import React, { useEffect, useState } from "react";
import { useApiContext } from "../../../contexts/apiContext";
import "../../../styles/cart/cartContol.css";
import { decreaseItem, increaseItem } from "../../../apis/cartController";

const CartController = ({ id, counter }) => {
  const {
    // increaseHandler,
    // decreaseHandler,
    isIncreaseBlur,
    isDecreaseBlur,
    counterNumberRef,
  } = useApiContext();

  const [counterValue, setCounterValue] = useState(1);

  const decreaseHandler = async (index) => {
    console.log(index);
    try {
      const data = await decreaseItem(index);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseHandler = async (index) => {
    console.log(index);
    try {
      const data = await increaseItem(index);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <td>
      <div className="count-con">
        <button
          className={isDecreaseBlur === id ? "cart-decrease" : ""}
          onClick={() => decreaseHandler(id)}
        >
          -
        </button>
        <p ref={counterNumberRef}>{counter}</p>
        <button
          className={isIncreaseBlur === id ? "cart-increase" : ""}
          onClick={() => increaseHandler(id)}
        >
          +
        </button>
      </div>
    </td>
  );
};

export default CartController;
