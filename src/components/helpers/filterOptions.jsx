import React, { useRef } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const FilterOptions = ({
  isShowFilter,
  setIsShowFilter,
  headersAgg,
  filterOptionsRef,
}) => {
  return (
    <div
      className="filter-con"
      style={{ top: `${headersAgg}px` }}
      ref={filterOptionsRef}
      onClick={() => setIsShowFilter(!isShowFilter)}
    >
      <p>Filter Options</p>
      {isShowFilter && <IoIosArrowDown className="arrow-down" />}
      {!isShowFilter && <IoIosArrowUp className="arrow-up" />}
    </div>
  );
};

export default FilterOptions;
