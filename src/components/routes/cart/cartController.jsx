import React, { useEffect, useState } from "react";
import { useApiContext } from "../../../contexts/apiContext";
import "../../../styles/cart/cartContol.css";
import { decreaseItem, increaseItem } from "../../../apis/cartController";
import { getCartProducts } from "../../../apis/cart";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../contexts/context";

const CartController = ({ id, counter }) => {
  const {
    // increaseHandler,
    // decreaseHandler,
    isIncreaseBlur,
    isDecreaseBlur,
    setIsIncreaseBlur,
    setIsDecreaseBlur,
    counterNumberRef,
  } = useApiContext();

  const { getCartProduct, handleCartProduct } = useApiContext();
  const { setShowNav } = useGlobalContext();

  const authToken = sessionStorage.getItem("authToken");

  const decreaseHandler = async (index) => {
    // console.log(index);
    try {
      if (counter > 0) {
        setIsDecreaseBlur(false);
        const data = await decreaseItem(index);
        await handleCartProduct(authToken, toast, setShowNav);
        console.log(data);
      } else {
        setIsDecreaseBlur(index);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const increaseHandler = async (index) => {
    // console.log(index);
    try {
      if (counter < 10) {
        setIsIncreaseBlur(false);
        const data = await increaseItem(index);
        await handleCartProduct(authToken, toast, setShowNav);
        console.log(data);
      } else {
        setIsIncreaseBlur(index);
      }
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
