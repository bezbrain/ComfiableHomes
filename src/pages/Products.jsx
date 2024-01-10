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

const Products = () => {
  const { isLoading, setIsLoading, setHoveredIndex, pathHeightRef } =
    useGlobalContext();
  const [borderBottom, setBorderBottom] = useState(null);
  const [rangeValue, setRangeValue] = useState(3099.99);
  const scrollPage = useRef(null);

  const [allProducts, setAllProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isCategory, setIsCategory] = useState("");
  const [isCompany, setIsCompany] = useState("");

  const allProductInStorage = async () => {
    try {
      setIsLoading(true);
      const { products } = await getAllProducts();
      setAllProducts(products);
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      toast.error(error.response.data.message || error.message);
    }
  };

  // Handle each category
  const categoryHandler = (index, e) => {
    setBorderBottom(index);

    if (e.textContent === "All") {
      console.log("I am all");
      setAllProducts(allProductInStorage());
      return;
    }
    const newCategory = allProductInStorage().filter(
      (each) => each.category === e.textContent
    );
    // console.log(newCategory);
    setAllProducts(newCategory);
  };

  // Handle each company
  const companyHandler = (e) => {
    //First set category back to All
    setBorderBottom(1);
    setAllProducts(allProductInStorage());
    if (e.target.value === "All") {
      setAllProducts(allProductInStorage());
      return;
    }
    const newCompany = allProductInStorage().filter(
      (each) => each.brand === e.target.value
    );
    setAllProducts(newCompany);
  };

  const rangeValueHandler = (e) => {
    setRangeValue(e.target.value);
    const newRange = allProductInStorage().filter((each) => {
      //First set category back to All
      setBorderBottom(1);
      setAllProducts(allProductInStorage());
      const cleanedString = each.price.replace(/,/g, ""); //Remove the commas
      const toNumber = Number(cleanedString);
      return toNumber >= Number(rangeValue) && toNumber <= 3099.99;
    });
    setAllProducts(newRange);
  };

  // "Sort by" Filter function
  const sortingHandler = (e) => {
    //First set category back to All
    setBorderBottom(1);
    setAllProducts(allProductInStorage());
    if (e.target.value === "Price (Highest)") {
      allProductInStorage().sort((a, b) => {
        let cleanedStringA = a.price.replace(/,/g, ""); //Remove the commas
        let cleanedStringB = b.price.replace(/,/g, ""); //Remove the commas
        let toNumberA = Number(cleanedStringA);
        let toNumberB = Number(cleanedStringB);
        return toNumberB - toNumberA;
      });
      setAllProducts(allProductInStorage());
    } else if (e.target.value === "Price (Lowest)") {
      allProductInStorage().sort((a, b) => {
        let cleanedStringA = a.price.replace(/,/g, ""); //Remove the commas
        let cleanedStringB = b.price.replace(/,/g, ""); //Remove the commas
        let toNumberA = Number(cleanedStringA);
        let toNumberB = Number(cleanedStringB);
        return toNumberA - toNumberB;
      });
      setAllProducts(allProductInStorage());
    } else if (e.target.value === "Name (A - Z)") {
      allProductInStorage().sort((a, b) => {
        let nameA = a.type.toUpperCase();
        let nameB = b.type.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setAllProducts(allProductInStorage());
    } else {
      allProductInStorage().sort((a, b) => {
        let nameA = a.type.toUpperCase();
        let nameB = b.type.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
      setAllProducts(allProductInStorage());
    }
  };

  useEffect(() => {
    setBorderBottom(1); //To make "All" have the border botton when page loads
    allProductInStorage();
  }, []);

  return (
    <>
      <main className="products">
        {/* Left hand side */}
        <aside ref={scrollPage}>
          <SearchInput
            searchValue={searchValue}
            isCategory={isCategory}
            isCompany={isCompany}
            setAllProducts={setAllProducts}
            setSearchValue={setSearchValue}
            toast={toast}
          />
          <ProductCategory
            borderBottom={borderBottom}
            setIsCategory={setIsCategory}
            setBorderBottom={setBorderBottom}
            searchValue={searchValue}
            setAllProducts={setAllProducts}
            isCompany={isCompany}
            toast={toast}
          />
          <ProductCompany
            setIsCompany={setIsCompany}
            searchValue={searchValue}
            isCategory={isCategory}
            setAllProducts={setAllProducts}
            toast={toast}
          />
          <ProductRadio
            rangeValue={rangeValue}
            rangeValueHandler={rangeValueHandler}
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
