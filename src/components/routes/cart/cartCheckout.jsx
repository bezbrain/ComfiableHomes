import React, { useState } from "react";
import { useApiContext } from "../../../contexts/apiContext";
import { useNavigate } from "react-router-dom";

const CartCheckout = ({ roundNumber }) => {
  const [shippingFee] = useState(5.34);
  const { getCartProduct } = useApiContext();

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

  //   CALCULATE THE SUBTOTAL
  const calculateSubtotal = () => {
    let sum = 0;
    getCartProduct.forEach((each) => {
      // const cleanedString = each.price.replace(/,/g, ""); //Remove the commas
      roundNumber = each.counter * Number(each.price);
      sum += Number(roundNumber);
    });
    return sum.toFixed(2);
  };

  return (
    <section className="base-total">
      <table className="cart-summary">
        <tbody>
          <tr>
            <th>Subtotal :</th>
            <th>${calculateSubtotal()}</th>
          </tr>
          <tr>
            <td>Shipping Fee :</td>
            <td>${shippingFee}</td>
          </tr>
          <tr>
            <th>Order Total :</th>
            <th>${(Number(calculateSubtotal()) + shippingFee).toFixed(2)}</th>
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
