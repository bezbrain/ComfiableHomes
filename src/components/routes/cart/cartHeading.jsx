import React from "react";
import "../../../styles/cart/cartHeading.css";

const CartHeading = () => {
  return (
    <tr className="header-of-cart">
      <td>Items</td>
      <td>Price</td>
      <td>Quantity</td>
      <td>Subtotal</td>
      <td></td>
    </tr>
  );
};

export default CartHeading;
