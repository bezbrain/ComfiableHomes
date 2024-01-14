/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../../styles/general/allProductBtn.css";

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
