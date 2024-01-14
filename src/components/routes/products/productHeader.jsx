import React from "react";
import "../../../styles/products/productHeader.css";
import { sortBy } from "../../../data";

const ProductHeader = ({ allProducts, setIsSort }) => {
  const handleSorting = (e) => {
    const value = e.target.value;
    if (value === "Price (Lowest)") {
      setIsSort("price");
    } else if (value === "Price (Highest)") {
      setIsSort("-price");
    } else if (value === "Name (A - Z)") {
      setIsSort("type");
    } else {
      setIsSort("-type");
    }
  };

  return (
    <header className="product-header">
      {allProducts && (
        <p>
          {allProducts.length} product{allProducts.length < 2 ? "" : "s"} Found
        </p>
      )}
      <hr />
      <div className="sort-con">
        <p>Sort By: </p>
        <select
          name=""
          id=""
          onChange={(e) => {
            handleSorting(e);
          }}
        >
          {sortBy.map((each, i) => {
            const { id, sort } = each;
            return (
              <option value={sort} key={i}>
                {sort}
              </option>
            );
          })}
        </select>
      </div>
    </header>
  );
};

export default ProductHeader;
