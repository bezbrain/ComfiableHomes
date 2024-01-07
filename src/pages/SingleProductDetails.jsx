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
import { toast } from "react-toastify";
import { addToCart, getSingleProduct } from "../apis/products";
import { useApiContext } from "../contexts/apiContext";

const SingleProductDetails = () => {
  const { productId } = useParams();

  const { dispatch, allProducts, initState, count, setCount } =
    useGlobalContext();

  const { getSingleDetails, getProductDetails, isLoading, setIsLoading } =
    useApiContext();

  useEffect(() => {
    getSingleDetails(productId);
  }, []);

  const authToken = sessionStorage.getItem("authToken");

  // On click of "ADD TO CART" btn
  const handleCart = async () => {
    if (!authToken) {
      toast.error("Please Login");
    } else {
      // Access to single product id and also all products
      // dispatch({
      //   type: ACTIONS.ADD_TO_CART,
      //   payload: { prodId: productId, products: allProducts, counter: count },
      // });
      try {
        const { toCart } = await addToCart(productId);
        toast.success(toCart.message);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }

      setCount(1);

      // const newProd = initState.some((each) => each.prevId === productId); //Get equal Id's
      // If product already in cart, send a negative notification
      // if (newProd) {
      //   toast.error("Item already in cart");
      //   return;
      // }
      // toast.success("Item added to cart");
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
