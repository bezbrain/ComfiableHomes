import React from "react";
import { sortProducts } from "../../utils/searchProduct";
import "../../styles/product.css";
import "../../styles/product2.css";
import { company } from "../../data";

const ProductCompany = ({
  setIsCompany,
  // searchValue,
  // isCategory,
  isCompany,
}) => {
  return (
    <div className="company-con">
      <h3>Company</h3>
      <select
        name=""
        id=""
        onChange={async (e) => {
          setIsCompany(e.target.value);
          console.log(e.target.value);
          // console.log(isCategory);
          await sortProducts(isCompany);
        }}
      >
        {company.map((each, i) => {
          const { id, company } = each;
          return (
            <option value={company} key={i}>
              {company}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ProductCompany;
