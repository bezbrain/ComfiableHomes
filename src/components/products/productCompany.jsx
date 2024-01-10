import React from "react";
import { sortProducts } from "../../utils/searchProduct";
import { toast } from "react-toastify";
import { company } from "../../data";

const ProductCompany = ({
  setIsCompany,
  searchValue,
  isCategory,
  setAllProducts,
}) => {
  return (
    <div className="company-con">
      <h3>Company</h3>
      <select
        name=""
        id=""
        onChange={async (e) => {
          setIsCompany(e.target.value);
          await sortProducts(
            searchValue,
            isCategory,
            e.target.value,
            setAllProducts,
            toast
          );
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
