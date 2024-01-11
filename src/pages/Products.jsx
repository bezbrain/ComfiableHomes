/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../components/context";
import Loader from "../components/Loader";
import SearchHover from "../components/SearchHover";
import "../styles/product.css";
import "../styles/product2.css";
import { category, company, sortBy } from "../data";
import { getAllProducts } from "../apis/products";
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
  const { isLoading, setIsLoading, setHoveredIndex, pathHeightRef } =
    useGlobalContext();
  const [borderBottom, setBorderBottom] = useState(null);
  const [rangeValue, setRangeValue] = useState(3099.99);
  const scrollPage = useRef(null);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [allProducts, setAllProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isCategory, setIsCategory] = useState("");
  const [isCompany, setIsCompany] = useState("");

  // Update the URL with the current sorting parameters
  const updatedParams = queryString.stringify({
    search: searchValue,
    category: isCategory,
    brand: isCompany,
  });

  useEffect(() => {
    const { search, category, brand } = queryParams;
    // Replace the current URL without causing a page reload
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${updatedParams}`
    );
    // Call the sorting function with the updated parameters
    sortProducts(search, category, brand, setAllProducts);
    // console.log("I am running");
  }, [updatedParams]);

  // GET ALL PRODUCTS
  const allProductInStorage = async () => {
    try {
      setIsLoading(true);
      const products = await sortProducts(searchValue, isCategory, isCompany);
      setAllProducts(products);
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      toast.error(error.message || error.response.data.message);
    }
  };

  // const rangeValueHandler = (e) => {
  //   setRangeValue(e.target.value);
  //   const newRange = allProductInStorage().filter((each) => {
  //     //First set category back to All
  //     setBorderBottom(1);
  //     setAllProducts(allProductInStorage());
  //     const cleanedString = each.price.replace(/,/g, ""); //Remove the commas
  //     const toNumber = Number(cleanedString);
  //     return toNumber >= Number(rangeValue) && toNumber <= 3099.99;
  //   });
  //   setAllProducts(newRange);
  // };

  useEffect(() => {
    setBorderBottom(1); //To make "All" have the border botton when page loads
  }, []);

  useEffect(() => {
    allProductInStorage();
  }, [searchValue, isCategory, isCompany, setAllProducts, setIsLoading]);

  return (
    <>
      <main className="products">
        {/* Left hand side */}
        <aside ref={scrollPage}>
          <SearchInput
            searchValue={searchValue}
            isCategory={isCategory}
            isCompany={isCompany}
            setSearchValue={setSearchValue}
          />
          <ProductCategory
            borderBottom={borderBottom}
            setIsCategory={setIsCategory}
            setBorderBottom={setBorderBottom}
            // searchValue={searchValue}
            // isCompany={isCompany}
            isCategory={isCategory}
          />
          <ProductCompany
            setIsCompany={setIsCompany}
            // searchValue={searchValue}
            // isCategory={isCategory}
            isCompany={isCompany}
          />
          <ProductRadio
          // rangeValue={rangeValue}
          // rangeValueHandler={rangeValueHandler}
          />
          <button
            className="clear-filter-btn"
            onClick={() => {
              setBorderBottom(1);
              setAllProducts(allProductInStorage());
              setRangeValue(3099.99);
            }}
          >
            Clear Filters
          </button>
        </aside>
        {/* Right hand side */}
        <section className="products-images-sect scrolling-section">
          <ProductHeader allProducts={allProducts} />

          <section className="loader-and-image-sect">
            {isLoading ? (
              <Loader loaderCss="add-product-loader-css" />
            ) : (
              allProducts.map((each, i) => {
                const { _id, image, type, price } = each;
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
