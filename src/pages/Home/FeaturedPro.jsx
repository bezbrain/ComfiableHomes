/* eslint-disable no-unused-vars */
import HomeImages from "../../components/HomeImages";
import AllProductsBtn from "../../components/AllProductsBtn";
import { useGlobalContext } from "../../components/context";
import Loader from "../../components/Loader";

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
          <AllProductsBtn allProductBtn={"all-product-btn"} />
        </div>
      </div>
    </>
  );
};

export default FeaturedPro;
