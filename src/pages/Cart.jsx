/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/cart/cart.css";
import { useGlobalContext } from "../contexts/context";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApiContext } from "../contexts/apiContext";
import { Loader } from "../components/helpers";
import {
  BaseCart,
  CartCheckout,
  CartController,
  CartDelete,
  CartHeading,
  EmptyCartUI,
} from "../components/routes/cart";
import { getCartProducts } from "../apis/cart";
import { useCheckoutContext } from "../contexts/checkoutContext";

const Cart = () => {
  const { setShowNav } = useGlobalContext();
  const { getCartProduct, handleCartProduct, isLoading } = useApiContext();
  const { roundNumber } = useCheckoutContext();

  const authToken = sessionStorage.getItem("authToken");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/cart") {
      handleCartProduct(authToken, toast, setShowNav);
    }
  }, []);

  return (
    <>
      <section className="cart-sect">
        {isLoading ? (
          <Loader loaderCss="add-product-loader-css" />
        ) : (
          <>
            {getCartProduct.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <>
                <table className="cart-content">
                  <tbody>
                    <CartHeading />
                    {getCartProduct &&
                      getCartProduct?.map((each, i) => {
                        const { _id, image, name, price } = each;
                        // const cleanedString = price.replace(/,/g, ""); //Remove the commas
                        const roundNum = (each.counter * Number(price)).toFixed(
                          2
                        ); //Round number to two decimal places
                        return (
                          <tr className="body-of-cart" key={i}>
                            <td>
                              <img src={image} alt={name} />
                              <p>{name}</p>
                            </td>
                            <td>${price}</td>
                            <CartController
                              id={_id}
                              counter={each.counter}
                              isIncreaseBlur={each.isIncreaseBlur}
                              isDecreaseBlur={each.isDecreaseBlur}
                            />
                            <td>${roundNum}</td>
                            <CartDelete id={_id} />
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {/* Static base of cart page */}
                <BaseCart />
                <CartCheckout />
              </>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
