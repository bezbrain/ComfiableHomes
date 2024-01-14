import React from "react";
import "../../../styles/products/productComp.css";
import { company } from "../../../data";

const ProductCompany = ({ setIsCompany }) => {
  return (
    <div className="company-con">
      <h3>Company</h3>
      <select
        name=""
        id=""
        onChange={async (e) => {
          setIsCompany(e.target.value);
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
