import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import { useGlobalContext } from "../components/context";
import { FaStar } from "react-icons/fa";
import "../styles/singleproduct.css";

const SingleProductDetails = () => {
  const { productId } = useParams();
  const [getProductDetails, setGetProductDetails] = useState({});
  const { isLoading, setIsLoading } = useGlobalContext();

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

  // console.log(getProductDetails);
  // console.log(productId);
  // console.log(getProductDetails.details.name);

  useEffect(() => {
    getDetails();
  }, []);

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
                <div className="count-con">
                  <button className="decrease">-</button>
                  <p>1</p>
                  <button className="increase">+</button>
                </div>
                <button className="add-to-cart-btn">ADD TO CART</button>
              </article>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default SingleProductDetails;
