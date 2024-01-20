import React from "react";
import "../../../styles/checkout/cartSummary.css";
import { useCheckoutContext } from "../../../contexts/checkoutContext";
import { useApiContext } from "../../../contexts/apiContext";
import { useGlobalContext } from "../../../contexts/context";

const CartSummary = () => {
  const { calculateSubtotal, shippingFee } = useCheckoutContext();
  const { getCartProduct } = useApiContext();
  const { quantityOfProductInCart } = useGlobalContext();

  return (
    <div className="checkout-cart-summary">
      <h3>Order Summary</h3>
      <hr />
      <div className="items-total">
        <p>
          Item's total <span>({quantityOfProductInCart(getCartProduct)})</span>
        </p>
        <p>
          $
          {(Number(calculateSubtotal(getCartProduct)) + shippingFee).toFixed(2)}
        </p>
      </div>
      <hr />
      <div className="checkout-items-total">
        <h4>Total</h4>
        <h2>
          $
          {(Number(calculateSubtotal(getCartProduct)) + shippingFee).toFixed(2)}
        </h2>
      </div>
      <hr />
      <button className="checkout-pay-now-btn">PAY NOW</button>
      <p className="checkout-condition">
        By proceeding, you are automatically accepting the{" "}
        <a href="">Terms & Conditions</a>
      </p>
    </div>
  );
};

export default CartSummary;
