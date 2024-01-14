/* eslint-disable no-unused-vars */
import { HomeImages } from "../../general";
import { AllProductsBtn } from "../../general";
import { useGlobalContext } from "../../../contexts/context";
import { Loader } from "../../helpers";
import "../../../styles/home/featuredPro.css";

const FeaturedPro = () => {
  const { isLoading, setIsLoading } = useGlobalContext();

  return (
    <>
      <div className="add-bg-con">
        <div className="featured-pro-con">
          <h2>Featured Products</h2>
          <hr />
          {isLoading && <Loader loaderCss="add-featured-loader-css" />}
          <HomeImages />
          <AllProductsBtn allProductBtn="all-product-btn" />
        </div>
      </div>
    </>
  );
};

export default FeaturedPro;
