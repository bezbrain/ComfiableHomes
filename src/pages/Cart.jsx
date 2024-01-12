/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/cart.css";
import { useGlobalContext } from "../components/context";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApiContext } from "../contexts/apiContext";
import CartUI from "../components/cart/cartUI";
import Loader from "../components/Loader";
import { deleteAll } from "../apis/products";

const Cart = () => {
  const { handleLoginLogout, setShowNav, setIsDisable } = useGlobalContext();

  const {
    getCartProduct,
    handleCartProduct,
    isLoading,
    handleDeleteCart,
    increaseHandler,
    decreaseHandler,
  } = useApiContext();

  const authToken = sessionStorage.getItem("authToken");

  const [shippingFee] = useState(5.34);

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

  // Calculate the subtotal
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
              <CartUI
                decreaseHandler={decreaseHandler}
                increaseHandler={increaseHandler}
                handleDeleteCart={handleDeleteCart}
                calculateSubtotal={calculateSubtotal}
                handleLoginLogout={() => handleLoginLogout(toast, navigate)}
                roundNumber={roundNumber}
                clearCartHandler={clearCartHandler}
                shippingFee={shippingFee}
                authToken={authToken}
                toast={toast}
                navigate={navigate}
              />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
