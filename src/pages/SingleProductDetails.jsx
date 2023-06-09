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

const SingleProductDetails = () => {
  const { productId } = useParams();
  const [getProductDetails, setGetProductDetails] = useState({});
  const {
    isLoading,
    setIsLoading,
    dispatch,
    allProducts,
    setNotification,
    successNoti,
    setSuccessNoti,
    failureNoti,
    setFailureNoti,
    initState,
  } = useGlobalContext();

  console.log(productId);

  //   Get details of each product
  const getDetails = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/products/${productId}`
      );
      setGetProductDetails(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleDetails = () => {
    console.log(allProducts);
    console.log(productId);
    const data = allProducts[productId];
    setGetProductDetails(data);
    console.log(data);
  };

  useEffect(() => {
    // getDetails();
    getSingleDetails();
  }, []);

  // On click of "ADD TO CART" btn
  const handleCart = () => {
    // Access to single product id and also all products
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: { prodId: productId, products: allProducts },
    });

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
  };

  return (
    <>
      <main className="single-detail-page">
        {isLoading && <Loader loaderCss="add-details-loader-css" />}
        {getProductDetails.details && (
          <section className="display-details-con">
            <div className="back-to-product">
              <Link to="/products">BACK TO PRODUCTS</Link>
            </div>
            <div className="images-and-details-con">
              <div className="single-img-details-con">
                <img
                  src={getProductDetails.image}
                  alt={getProductDetails.details.name}
                />
              </div>
              <article>
                <h2>{getProductDetails.details.name}</h2>
                <p>
                  <span>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </span>
                  {getProductDetails.details.reviews}
                </p>
                <p>${getProductDetails.price}</p>
                <summary>{getProductDetails.details.content}</summary>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span>Available :</span>
                      </td>
                      <td>{getProductDetails.details.available}</td>
                    </tr>
                    <tr>
                      <td>
                        <span>SKU :</span>
                      </td>
                      <td>{getProductDetails.details.sku}</td>
                    </tr>
                    <tr>
                      <td>
                        <span>Brand :</span>
                      </td>
                      <td>{getProductDetails.details.brand}</td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                <CartIncDecrease cartCSS="add-cart-css" />
                <Link to="/cart" onClick={handleCart}>
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
