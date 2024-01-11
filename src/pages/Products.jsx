/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../components/context";
import Loader from "../components/Loader";
import "../styles/product.css";
import "../styles/product2.css";
import { toast } from "react-toastify";
import { sortProducts } from "../utils/searchProduct";
import ProductCategory from "../components/products/productCategory";
import ProductCompany from "../components/products/productCompany";
import SearchInput from "../components/products/searchInput";
import ProductRadio from "../components/products/productRadio";
import ProductHeader from "../components/products/productHeader";
import ProductCard from "../components/products/productCard";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const Products = () => {
  const { isLoading, setIsLoading } = useGlobalContext();
  const [borderBottom, setBorderBottom] = useState(null);
  const scrollPage = useRef(null);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [allProducts, setAllProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isCategory, setIsCategory] = useState("");
  const [isCompany, setIsCompany] = useState("");
  const [isSort, setIsSort] = useState("");
  const [rangeValue, setRangeValue] = useState(3099.99);

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

  return (
    <>
      <main className="products">
        {/* Left hand side */}
        <aside ref={scrollPage}>
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
              // setRangeValue(3099.99);
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
