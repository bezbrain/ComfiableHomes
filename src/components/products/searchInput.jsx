import React from "react";
import { sortProducts } from "../../utils/searchProduct";
import { toast } from "react-toastify";

const SearchInput = ({
  searchValue,
  isCategory,
  isCompany,
  setAllProducts,
  setSearchValue,
}) => {
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    sortProducts(searchValue, isCategory, isCompany, setAllProducts, toast);
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
