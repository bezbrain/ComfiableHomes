/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../contexts/context";
import { Loader } from "../components/helpers";
import "../styles/product.css";
import "../styles/product2.css";
import { toast } from "react-toastify";
import { sortProducts } from "../utils/searchProduct";
import {
  ProductCategory,
  ProductCompany,
  SearchInput,
  ProductRadio,
  ProductHeader,
  ProductCard,
} from "../components/routes/products";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Products = () => {
  const {
    isLoading,
    setIsLoading,
    pathHeight,
    headerHeight,
    filterHeight,
    setFilterHeight,
  } = useGlobalContext();
  const [borderBottom, setBorderBottom] = useState(null);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [allProducts, setAllProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isCategory, setIsCategory] = useState("");
  const [isCompany, setIsCompany] = useState("");
  const [isSort, setIsSort] = useState("");
  const [rangeValue, setRangeValue] = useState(3099.99);

  const [isShowFilter, setIsShowFilter] = useState(false);

  // Update the URL with the current sorting parameters
  const updatedParams = queryString.stringify({
    search: searchValue,
    category: isCategory,
    brand: isCompany,
    sort: isSort,
    maxPrice: rangeValue,
  });

  // Effect to replace query params with the right one
  useEffect(() => {
    const { search, category, brand, sort, maxPrice } = queryParams;
    // Replace the current URL without causing a page reload
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${updatedParams}`
    );
    // Call the sorting function with the updated parameters
    sortProducts(search, category, brand, sort, maxPrice);
  }, [updatedParams]);

  // GET ALL PRODUCTS
  const allProductInStorage = async () => {
    try {
      setIsLoading(true);
      const products = await sortProducts(
        searchValue,
        isCategory,
        isCompany,
        isSort,
        rangeValue
      );
      setAllProducts(products);
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    setBorderBottom(1); //To make "All" have the border botton when page loads
  }, []);

  useEffect(() => {
    allProductInStorage();
  }, [
    searchValue,
    isCategory,
    isCompany,
    setAllProducts,
    setIsLoading,
    isSort,
    rangeValue,
  ]);

  // Aggregate nav and headerPath heights
  const headersAgg = pathHeight + headerHeight;

  const filterOptionsRef = useRef(null);

  // Dynamically set the height of filter options
  useEffect(() => {
    if (filterOptionsRef.current) {
      const filterOptionsHeight =
        filterOptionsRef.current.getBoundingClientRect().height;
      setFilterHeight(filterOptionsHeight);
    }
  }, [filterHeight, pathHeight, headerHeight]);

  // Aggregate nav, headerPath and filter heights
  const heightAgg = filterHeight + pathHeight + headerHeight;

  return (
    <>
      <main className="products">
        {/* Left hand side */}
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
        <aside
          style={{ top: `${heightAgg}px` }}
          className={`${isShowFilter ? "" : "filter-options"}`}
          onClick={() => setIsShowFilter(false)}
        >
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <ProductCategory
            borderBottom={borderBottom}
            setIsCategory={setIsCategory}
            setBorderBottom={setBorderBottom}
          />
          <ProductCompany setIsCompany={setIsCompany} />
          <ProductRadio
            rangeValue={rangeValue}
            rangeValueHandler={(e) => setRangeValue(e.target.value)}
          />
          <button
            className="clear-filter-btn"
            onClick={async () => {
              setBorderBottom(1);
              setSearchValue("");
              setIsCategory("");
              setIsCompany("");
              setIsSort("");
              setRangeValue(3099.99);
              await allProductInStorage();
            }}
          >
            Clear Filters
          </button>
        </aside>
        {/* Right hand side */}
        <section className="products-images-sect scrolling-section">
          <ProductHeader allProducts={allProducts} setIsSort={setIsSort} />

          <section className="loader-and-image-sect">
            {isLoading ? (
              <Loader loaderCss="add-product-loader-css" />
            ) : (
              allProducts.map((each, i) => {
                return <ProductCard {...each} key={i} />;
              })
            )}
          </section>
        </section>
      </main>
    </>
  );
};

export default Products;
