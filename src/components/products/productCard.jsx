import React from "react";
import "../../styles/product.css";
import "../../styles/product2.css";
import SearchHover from "../SearchHover";
import { useGlobalContext } from "../context";

const ProductCard = ({ _id, image, type, price }) => {
  const { setHoveredIndex } = useGlobalContext();

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };
  const handleMouseOut = () => {
    setHoveredIndex(false);
  };

  return (
    <div className="product-images-con">
      <div
        className="image-con"
        onMouseOver={() => handleMouseOver(_id)}
        onMouseOut={() => handleMouseOut(_id)}
      >
        <SearchHover id={_id} />
        <img src={image} alt={type} />
      </div>
      <div className="name-and-amt-con">
        <p>{type}</p>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;