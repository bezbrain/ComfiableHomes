import React from "react";
import "../../../styles/product.css";
import "../../../styles/product2.css";

const ProductRadio = ({ rangeValue, rangeValueHandler }) => {
  return (
    <div className="radio-price-con">
      <label htmlFor="price">${rangeValue}</label>
      <br />
      <input
        type="range"
        id="price"
        name="price"
        min="0"
        max="3099.99"
        step="0.01"
        value={rangeValue}
        onChange={rangeValueHandler}
      />
    </div>
  );
};

export default ProductRadio;
