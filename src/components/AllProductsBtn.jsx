import { Link } from "react-router-dom";

const AllProductsBtn = ({ allProductBtn }) => {
  return (
    <>
      <div className="all-product-con">
        <Link to="/products">
          <button className={allProductBtn}>ALL PRODUCTS</button>
        </Link>
      </div>
    </>
  );
};

export default AllProductsBtn;
