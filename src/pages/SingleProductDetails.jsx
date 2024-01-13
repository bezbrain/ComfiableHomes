/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader } from "../components/helpers";
import { FaStar } from "react-icons/fa";
import "../styles/singleproduct.css";
import { toast } from "react-toastify";
import { addToCart, getSingleProduct } from "../apis/products";
import { useApiContext } from "../contexts/apiContext";

const SingleProductDetails = () => {
  const { productId } = useParams();

  const { getSingleDetails, getProductDetails, isLoading } = useApiContext();

  useEffect(() => {
    getSingleDetails(productId);
  }, []);

  const authToken = sessionStorage.getItem("authToken");

  // On click of "ADD TO CART" btn
  const handleCart = async () => {
    if (!authToken) {
      toast.error("Please Login");
    } else {
      try {
        const toCart = await addToCart(productId);
        toast.success(toCart.message);
      } catch (error) {
        // console.log(error);
        toast.error(error.response.data.message || error.message);
      }
    }
  };

  return (
    <>
      <main className="single-detail-page">
        {isLoading ? (
          <Loader loaderCss="add-details-loader-css" />
        ) : (
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
