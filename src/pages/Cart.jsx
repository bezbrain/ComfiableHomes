/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "../styles/cart.css";
import { useGlobalContext } from "../components/context";
import Notification from "../components/Notification";
import { ACTIONS } from "../components/context";
import { useState } from "react";

const Cart = () => {
  const {
    initState,
    dispatch,
    notification,
    successNoti,
    setSuccessNoti,
    setFailureNoti,
    getCartItems,
    increaseHandler,
    decreaseHandler,
    toggleLoginLogout,
    setLoginLogoutOverlay,
    handleLoginLogout,
    showNavLoginNoti,
    setShowNavLoginNoti,
  } = useGlobalContext();

  const [shippingFee] = useState(5.34);

  const navigate = useNavigate();

  let roundNumber;

  const handleDeleteCart = (index) => {
    dispatch({
      type: ACTIONS.DELETE_FROM_CART,
      payload: { filterId: index },
    });
  };

  const clearCartHandler = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  // Calculate the subtotal
  const calculateSubtotal = () => {
    let sum = 0;
    getCartItems.forEach((each) => {
      const cleanedString = each.price.replace(/,/g, ""); //Remove the commas
      roundNumber = each.counter * Number(cleanedString);
      sum += Number(roundNumber);
    });
    return sum.toFixed(2);
  };

  const authToken = sessionStorage.getItem("authToken");

  return (
    <>
      {notification && (
        <Notification
          notiText={`${
            successNoti ? "Added to cart" : "Product already in cart"
          }`}
        />
      )}
      <section className="cart-sect">
        {getCartItems.length === 0 ? (
          <>
            <h2>Your cart is empty</h2>
            <Link to="/products" className="fill-it-btn">
              FILL IT
            </Link>
          </>
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
                {getCartItems &&
                  getCartItems.map((each, i) => {
                    const { id, image, name, price } = each;
                    const cleanedString = price.replace(/,/g, ""); //Remove the commas
                    roundNumber = (
                      each.counter * Number(cleanedString)
                    ).toFixed(2); //Round number to two decimal places
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
                              onClick={() => decreaseHandler(id)}
                            >
                              -
                            </button>
                            <p>{each.counter}</p>
                            <button
                              className="increase"
                              onClick={() => increaseHandler(id)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>${roundNumber}</td>
                        <td>
                          <FaTrash
                            className="delete-product"
                            onClick={() => handleDeleteCart(id)}
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
              >
                Clear Cart
              </button>
            </div>
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
                    <th>
                      ${(Number(calculateSubtotal()) + shippingFee).toFixed(2)}
                    </th>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={() => {
                  setFailureNoti(false);
                  handleLoginLogout();
                  setTimeout(() => {
                    navigate("/");
                  }, 2000);
                }}
              >
                {authToken ? "LOGOUT" : "LOGIN"}
              </button>
            </section>
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
