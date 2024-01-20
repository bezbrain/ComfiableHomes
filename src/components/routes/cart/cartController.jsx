import React, { useEffect, useState } from "react";
import { useApiContext } from "../../../contexts/apiContext";
import "../../../styles/cart/cartContol.css";
import { decreaseItem, increaseItem } from "../../../apis/cartController";
import { getCartProducts } from "../../../apis/cart";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../contexts/context";
import { Loader } from "../../helpers";

const CartController = ({ id, counter, isIncreaseBlur, isDecreaseBlur }) => {
  const [isCartControllerLoading, setIsCartControllerLoading] = useState(false);

  const { getCartProduct, handleCartProduct, counterNumberRef } =
    useApiContext();
  const { setShowNav } = useGlobalContext();

  const authToken = sessionStorage.getItem("authToken");

  // DECREASE CONTROLLER
  const decreaseHandler = async (index) => {
    try {
      setIsCartControllerLoading(true);
      const data = await decreaseItem(index);
      await handleCartProduct(authToken, toast, setShowNav);
      // console.log(data);
      setIsCartControllerLoading(false);
      if (data.updateCounter.isDecreaseBlur) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      setIsCartControllerLoading(false);
      toast.error(error.response.data.message || error.message);
    }
  };

  // INCREASE CONTROLLER
  const increaseHandler = async (index) => {
    try {
      setIsCartControllerLoading(true);
      const data = await increaseItem(index);
      await handleCartProduct(authToken, toast, setShowNav);
      // console.log(data);
      setIsCartControllerLoading(false);
      if (data.updateCounter.isIncreaseBlur) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      setIsCartControllerLoading(false);
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <td>
      <div className="count-con">
        <button
          className={isDecreaseBlur ? "cart-decrease" : ""}
          onClick={() => decreaseHandler(id)}
          disabled={isCartControllerLoading}
        >
          -
        </button>
        {isCartControllerLoading ? (
          <Loader />
        ) : (
          <p ref={counterNumberRef}>{counter} </p>
        )}
        <button
          disabled={isCartControllerLoading}
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
