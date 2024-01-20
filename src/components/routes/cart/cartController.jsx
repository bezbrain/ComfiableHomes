import React, { useEffect, useState } from "react";
import { useApiContext } from "../../../contexts/apiContext";
import "../../../styles/cart/cartContol.css";
import { decreaseItem, increaseItem } from "../../../apis/cartController";
import { getCartProducts } from "../../../apis/cart";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../contexts/context";

const CartController = ({ id, counter, isIncreaseBlur, isDecreaseBlur }) => {
  const { counterNumberRef } = useApiContext();

  const { getCartProduct, handleCartProduct } = useApiContext();
  const { setShowNav } = useGlobalContext();

  const authToken = sessionStorage.getItem("authToken");

  const decreaseHandler = async (index) => {
    try {
      const data = await decreaseItem(index);
      await handleCartProduct(authToken, toast, setShowNav);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseHandler = async (index) => {
    try {
      const { updateCounter } = await increaseItem(index);
      await handleCartProduct(authToken, toast, setShowNav);
      console.log(updateCounter);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <td>
      <div className="count-con">
        <button
          className={isDecreaseBlur ? "cart-decrease" : ""}
          onClick={() => decreaseHandler(id)}
        >
          -
        </button>
        <p ref={counterNumberRef}>{counter}</p>
        <button
          className={isIncreaseBlur ? "cart-increase" : ""}
          onClick={() => increaseHandler(id)}
        >
          +
        </button>
      </div>
    </td>
  );
};

export default CartController;
