/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import { useGlobalContext } from "../components/context";
import { FaStar } from "react-icons/fa";
import "../styles/singleproduct.css";
import { ACTIONS } from "../components/context";
import CartIncDecrease from "../components/CartIncDecrease";
import { products } from "../data";
import Notification from "../components/Notification";

const SingleProductDetails = () => {
  const { productId } = useParams();

  const {
    isLoading,
    setIsLoading,
    dispatch,
    allProducts,
    setNotification,
    setSuccessNoti,
    failureNoti,
    setFailureNoti,
    initState,
    cartCount,
    getCartItems,
    getProductDetails,
    setGetProductDetails,
    count,
    setCount,
  } = useGlobalContext();

  // Get the details of single product
  const getSingleDetails = () => {
    const getSingleCartItem =
      JSON.parse(localStorage.getItem("allProducts")) || [];
    const singleObj = getSingleCartItem[productId - 1];
    localStorage.setItem("singleItem", JSON.stringify(singleObj));
    const getSingleObj = JSON.parse(localStorage.getItem("singleItem"));
    // console.log(getSingleObj);
    setGetProductDetails(getSingleObj);
  };

  useEffect(() => {
    getSingleDetails();
  }, []);

  const authToken = sessionStorage.getItem("authToken");
  // On click of "ADD TO CART" btn
  const handleCart = () => {
    if (!authToken) {
      setFailureNoti(true);
      setTimeout(() => {
        setFailureNoti(false);
      }, 3000);
    } else {
      // Access to single product id and also all products
      dispatch({
        type: ACTIONS.ADD_TO_CART,
        payload: { prodId: productId, products: allProducts, counter: count },
      });
      setCount(1);

      const newProd = initState.some((each) => each.prevId === productId); //Get equal Id's
      // If product already in cart, send a negative notification
      if (newProd) {
        setNotification(true);
        setFailureNoti(true);
        setSuccessNoti(false);
        setTimeout(() => {
          setNotification(false);
        }, 2000);
        return;
      }
      // If product not in cart, send a positive notification
      setNotification(true);
      setSuccessNoti(true);
      setFailureNoti(false);
      setTimeout(() => {
        setNotification(false);
      }, 2000);
    }
  };

  const SingleProIncrease = () => {
    if ((count < 10) & (count > 0)) {
      setCount(count + 1);
    }
  };

  const SingleProDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <>
      {failureNoti && <Notification notiText="Please Login" />}
      <main className="single-detail-page">
        {isLoading && <Loader loaderCss="add-details-loader-css" />}
        {getProductDetails && (
          <section className="display-details-con">
            <div className="back-to-product">
              <Link to="/products">BACK TO PRODUCTS</Link>
            </div>
            <div className="images-and-details-con">
              <div className="single-img-details-con">
                <img
                  src={getProductDetails.image}
                  alt={getProductDetails.type}
                />
              </div>
              <article>
                <h2>{getProductDetails.type}</h2>
                <p>
                  <span>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </span>
                  {getProductDetails.reviews}
                </p>
                <p>${getProductDetails.price}</p>
                <summary>{getProductDetails.content}</summary>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span>Available :</span>
                      </td>
                      <td>{getProductDetails.available}</td>
                    </tr>
                    <tr>
                      <td>
                        <span>SKU :</span>
                      </td>
                      <td>{getProductDetails.sku}</td>
                    </tr>
                    <tr>
                      <td>
                        <span>Brand :</span>
                      </td>
                      <td>{getProductDetails.brand}</td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                <div className={`count-con add-cart-css`}>
                  <button className="decrease" onClick={SingleProDecrease}>
                    -
                  </button>
                  <p>{count}</p>
                  <button className="increase" onClick={SingleProIncrease}>
                    +
                  </button>
                </div>
                <Link to={`${!authToken ? "" : "/cart"}`} onClick={handleCart}>
                  ADD TO CART
                </Link>
              </article>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default SingleProductDetails;
