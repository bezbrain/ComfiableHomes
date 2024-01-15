import React, { useEffect } from "react";
import { useApiContext } from "../../../contexts/apiContext";
import "../../../styles/cart/cartContol.css";

const CartController = ({ id, counter }) => {
  const {
    increaseHandler,
    decreaseHandler,
    isIncreaseBlur,
    setIsIncreaseBlur,
    isDecreaseBlur,
    setIsDecreaseBlur,
    counterNumberRef,
    setIsCartDecrease,
    getCartProduct,
    blurTrack,
    setBlurTrack,
  } = useApiContext();

  const newCartProduct = getCartProduct.find((each) => each._id === id);
  useEffect(() => {
    // console.log("Running");

    getCartProduct.forEach((each) => {
      if (each.counter === 1) {
        setBlurTrack(id);
        console.log("I am one");
      } else {
        setBlurTrack(false);
        console.log("Not one");
      }
    });
  }, [newCartProduct.counter]);

  return (
    <td>
      <div className="count-con">
        <button
          className={
            isDecreaseBlur === id || blurTrack === id ? "cart-decrease" : ""
          }
          onClick={async () => {
            await decreaseHandler(id);
          }}
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
