import React from "react";
import "../../styles/product.css";
import "../../styles/product2.css";
import { sortBy } from "../../data";

const ProductHeader = ({ allProducts }) => {
  return (
    <header className="product-header">
      {allProducts && (
        <p>
          {allProducts.length} product{allProducts.length < 2 ? "" : "s"} Found
        </p>
      )}
      <hr className="wobble" />
      <div className="sort-con">
        <p>Sort By: </p>
        <select name="" id="" onChange={(e) => sortingHandler(e)}>
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
