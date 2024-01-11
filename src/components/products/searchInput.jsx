import React from "react";
import { sortProducts } from "../../utils/searchProduct";
import "../../styles/product.css";
import "../../styles/product2.css";

const SearchInput = ({ searchValue, setSearchValue }) => {
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    sortProducts(searchValue);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  );
};

export default SearchInput;
