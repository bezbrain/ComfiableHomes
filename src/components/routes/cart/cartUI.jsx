import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApiContext } from "../../../contexts/apiContext";

import { useGlobalContext } from "../../../contexts/context";
import { toast } from "react-toastify";

const CartUI = ({
  decreaseHandler,
  increaseHandler,
  handleDeleteCart,
  // calculateSubtotal,
  roundNumber,
  clearCartHandler,
  shippingFee,
}) => {
  const { getCartProduct, handleCartProduct, isCartDisable } = useApiContext();
  const { isDisable, setShowNav } = useGlobalContext();

  const authToken = sessionStorage.getItem("authToken");

  const navigate = useNavigate();

  return <>{/*  */}</>;
};

export default CartUI;
