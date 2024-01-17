import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAll } from "../../../apis/products";
import { useGlobalContext } from "../../../contexts/context";
import { useApiContext } from "../../../contexts/apiContext";
import "../../../styles/cart/baseCart.css";

const BaseCart = () => {
  const { setShowNav, isDisable, setIsDisable } = useGlobalContext();

  const { handleCartProduct } = useApiContext();

  const authToken = sessionStorage.getItem("authToken");

  const clearCartHandler = async () => {
    try {
      setIsDisable(true);
      const data = await deleteAll();
      toast.success(data.message);
      setIsDisable(false);
      await handleCartProduct(authToken, toast, setShowNav); // Call this function to get the remaining data after deleting from db
    } catch (error) {
      // console.log(error);
      setIsDisable(false);
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div className="base-btns">
      <Link to="/products">
        Continue <span>Shopping</span>
      </Link>
      <button
        className="clear-shopping-cart-btn"
        onClick={clearCartHandler}
        disabled={isDisable}
      >
        Clear Cart
      </button>
    </div>
  );
};

export default BaseCart;
