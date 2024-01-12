/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/cart.css";
import { useGlobalContext } from "../contexts/context";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApiContext } from "../contexts/apiContext";
import { Loader } from "../components/helpers";
import { deleteAll } from "../apis/products";
import {
  CartCheckout,
  CartController,
  CartDelete,
  EmptyCartUI,
} from "../components/routes/cart";

const Cart = () => {
  const { handleLoginLogout, setShowNav, isDisable, setIsDisable } =
    useGlobalContext();

  const {
    getCartProduct,
    handleCartProduct,
    isLoading,
    handleDeleteCart,
    increaseHandler,
    decreaseHandler,
    isCartDisable,
  } = useApiContext();

  const authToken = sessionStorage.getItem("authToken");

  const navigate = useNavigate();
  const location = useLocation();

  let roundNumber;

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
                    <tr className="header-of-cart">
                      <td>Items</td>
                      <td>Price</td>
                      <td>Quantity</td>
                      <td>Subtotal</td>
                      <td></td>
                    </tr>
                    {getCartProduct &&
                      getCartProduct.map((each, i) => {
                        const { _id, image, name, price } = each;
                        // const cleanedString = price.replace(/,/g, ""); //Remove the commas
                        roundNumber = (each.counter * Number(price)).toFixed(2); //Round number to two decimal places
                        // check();
                        return (
                          <tr className="body-of-cart" key={i}>
                            <td>
                              <img src={image} alt={name} />
                              <p>{name}</p>
                            </td>
                            <td>${price}</td>

                            <CartController id={_id} counter={each.counter} />

                            <td>${roundNumber}</td>

                            <CartDelete id={_id} />
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {/* Static base of cart page */}
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
                <CartCheckout roundNumber={roundNumber} />
              </>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
