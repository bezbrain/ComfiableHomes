import React from "react";
import "../../styles/product.css";
import "../../styles/product2.css";
import { category } from "../../data";
import { sortProducts } from "../../utils/searchProduct";
import { toast } from "react-toastify";

const ProductCategory = ({
  borderBottom,
  setIsCategory,
  setBorderBottom,
  searchValue,
  setAllProducts,
  isCompany,
}) => {
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
                  await sortProducts(
                    searchValue,
                    cat,
                    isCompany,
                    setAllProducts,
                    toast
                  );
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
