import React from "react";
import "../../../styles/products/productCat.css";
import { category } from "../../../data";

const ProductCategory = ({ borderBottom, setIsCategory, setBorderBottom }) => {
  return (
    <div className="category">
      <h3>Category</h3>
      <div>
        <ul>
          {category.map((each, i) => {
            const { id, cat } = each;
            return (
              <li
                key={i}
                className={`${borderBottom === id ? "add-li-css" : ""}`}
                onClick={async () => {
                  setIsCategory(cat);
                  setBorderBottom(id);
                }}
              >
                {cat}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProductCategory;
