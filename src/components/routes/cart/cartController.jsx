import React from "react";
import { useApiContext } from "../../../contexts/apiContext";
import { toast } from "react-toastify";

const CartController = ({ id, counter }) => {
  const { increaseHandler, decreaseHandler, isCartDisable } = useApiContext();

  return (
    <td>
      <div className="count-con">
        <button
          className="decrease"
          disabled={isCartDisable}
          onClick={async () => {
            await decreaseHandler(id, toast);
          }}
        >
          -
        </button>
        <p>{counter}</p>
        <button className="increase" onClick={() => increaseHandler(id)}>
          +
        </button>
      </div>
    </td>
  );
};

export default CartController;
