import React, { useState } from "react";
import { useApiContext } from "../../../contexts/apiContext";
import { useNavigate } from "react-router-dom";
import "../../../styles/cart/cartCheckout.css";
import { useCheckoutContext } from "../../../contexts/checkoutContext";

const CartCheckout = () => {
  const { getCartProduct } = useApiContext();
  const { calculateSubtotal, shippingFee } = useCheckoutContext();

  const authToken = sessionStorage.getItem("authToken");

  const navigate = useNavigate();

  // IF LOGGED IN NAVIGATE TO CHECKOUT DETAILS
  const handleCheckoutNav = () => {
    if (authToken) {
      navigate("/checkout");
    } else {
      toast.error("Please Login");
    }
  };

  return (
    <section className="base-total">
      <table className="cart-summary">
        <tbody>
          <tr>
            <th>Subtotal :</th>
            <th>${calculateSubtotal(getCartProduct)}</th>
          </tr>
          <tr>
            <td>Shipping Fee :</td>
            <td>${shippingFee}</td>
          </tr>
          <tr>
            <th>Order Total :</th>
            <th>
              $
              {(
                Number(calculateSubtotal(getCartProduct)) + shippingFee
              ).toFixed(2)}
            </th>
          </tr>
        </tbody>
      </table>
      <button onClick={handleCheckoutNav}>
        {/* {authToken ? "LOGOUT" : "LOGIN"} */}
        CHECKOUT
      </button>
    </section>
  );
};

export default CartCheckout;
