/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/cart.css";
import { useGlobalContext } from "../contexts/context";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApiContext } from "../contexts/apiContext";
import CartUI from "../components/routes/cart/cartUI";
import { Loader } from "../components/helpers";
import { deleteAll } from "../apis/products";
import { FaTrash } from "react-icons/fa";
import { CartCheckout } from "../components/routes/cart";

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
              <>
                <h2>Your cart is empty</h2>
                <Link to="/products" className="fill-it-btn">
                  FILL IT
                </Link>
              </>
            ) : (
              // <CartUI
              //   decreaseHandler={decreaseHandler}
              //   increaseHandler={increaseHandler}
              //   handleDeleteCart={handleDeleteCart}
              //   calculateSubtotal={calculateSubtotal}
              //   handleLoginLogout={() => handleLoginLogout(toast, navigate)}
              //   roundNumber={roundNumber}
              //   clearCartHandler={clearCartHandler}
              //   shippingFee={shippingFee}
              //   authToken={authToken}
              //   toast={toast}
              //   navigate={navigate}
              // />
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
                            <td>
                              <div className="count-con">
                                <button
                                  className="decrease"
                                  disabled={isCartDisable}
                                  onClick={async () => {
                                    await decreaseHandler(_id, toast);
                                  }}
                                >
                                  -
                                </button>
                                <p>{each.counter}</p>
                                <button
                                  className="increase"
                                  onClick={() => increaseHandler(_id)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td>${roundNumber}</td>
                            <td>
                              <FaTrash
                                className="delete-product"
                                onClick={async () => {
                                  await handleDeleteCart(_id, toast);
                                  await handleCartProduct(
                                    authToken,
                                    toast,
                                    setShowNav
                                  ); // Call this function to get the remaining data after deleting from db
                                }}
                              />
                            </td>
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
