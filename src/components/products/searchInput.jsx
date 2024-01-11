import React from "react";
import { sortProducts } from "../../utils/searchProduct";
import "../../styles/product.css";
import "../../styles/product2.css";

const SearchInput = ({
  searchValue,
  isCategory,
  isCompany,
  setSearchValue,
}) => {
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    sortProducts(searchValue, isCategory, isCompany);
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
