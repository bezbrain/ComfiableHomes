import HomeImages from "../HomeImages";
import AllProducts from "../AllProducts";

const FeaturedPro = () => {
  return (
    <>
      <div className="add-bg-con">
        <div className="featured-pro-con">
          <h2>Featured Products</h2>
          <hr />
          <HomeImages />
          <AllProducts allProductBtn={"all-product-btn"} />
        </div>
      </div>
    </>
  );
};

export default FeaturedPro;
