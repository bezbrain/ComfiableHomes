import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApiContext } from "../../contexts/apiContext";
import { FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { toast } from "react-toastify";

const CartUI = ({
  decreaseHandler,
  increaseHandler,
  handleDeleteCart,
  calculateSubtotal,
  handleLoginLogout,
  roundNumber,
  clearCartHandler,
  shippingFee,
  // authToken,
  navigate,
}) => {
  const { getCartProduct, handleCartProduct } = useApiContext();
  const { isDisable, setShowNav } = useGlobalContext();

  const authToken = sessionStorage.getItem("authToken");

  return (
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
                        onClick={async () => {
                          await decreaseHandler(_id, toast);
                          // await handleCartProduct(authToken, toast, setShowNav); // Call this function to get the remaining data after deleting from db
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
                        await handleCartProduct(authToken, toast, setShowNav); // Call this function to get the remaining data after deleting from db
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
        <button onClick={() => handleLoginLogout(toast, navigate)}>
          {authToken ? "LOGOUT" : "LOGIN"}
        </button>
      </section>
    </>
  );
};

export default CartUI;
