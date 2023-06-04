import HomeImages from "../../components/HomeImages";
import AllProductsBtn from "../../components/AllProductsBtn";

const FeaturedPro = () => {
  return (
    <>
      <div className="add-bg-con">
        <div className="featured-pro-con">
          <h2>Featured Products</h2>
          <hr />
          <HomeImages />
          <AllProductsBtn allProductBtn={"all-product-btn"} />
        </div>
      </div>
    </>
  );
};

export default FeaturedPro;
