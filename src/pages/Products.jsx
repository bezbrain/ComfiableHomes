import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../components/context";
import Loader from "../components/Loader";
import SearchHover from "../components/SearchHover";
import "../styles/product.css";
import "../styles/product2.css";
import { category, company, sortBy } from "../data";

const Products = () => {
  const { isLoading, allProducts, setHoveredIndex, setAllProducts } =
    useGlobalContext();
  const [borderBottom, setBorderBottom] = useState(null);
  const [rangeValue, setRangeValue] = useState(3099.99);
  const scrollPage = useRef(null);
  // const asideRef = useRef(null);

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };
  const handleMouseOut = () => {
    setHoveredIndex(false);
  };

  const allProductInStorage = JSON.parse(localStorage.getItem("allProducts"));
  // Handle each category
  const categoryHandler = (index, e) => {
    setBorderBottom(index);

    if (e.textContent === "All") {
      console.log("I am all");
      setAllProducts(allProductInStorage);
      return;
    }
    const newCategory = allProductInStorage.filter(
      (each) => each.category === e.textContent
    );
    setAllProducts(newCategory);
  };

  // Handle each company
  const companyHandler = (e) => {
    //First set category back to All
    setBorderBottom(1);
    setAllProducts(allProductInStorage);
    if (e.target.value === "All") {
      setAllProducts(allProductInStorage);
      return;
    }
    const newCompany = allProductInStorage.filter(
      (each) => each.brand === e.target.value
    );
    setAllProducts(newCompany);
  };

  const rangeValueHandler = (e) => {
    setRangeValue(e.target.value);
    const newRange = allProductInStorage.filter((each) => {
      //First set category back to All
      setBorderBottom(1);
      setAllProducts(allProductInStorage);
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
    setAllProducts(allProductInStorage);
    if (e.target.value === "Price (Highest)") {
      allProductInStorage.sort((a, b) => {
        let cleanedStringA = a.price.replace(/,/g, ""); //Remove the commas
        let cleanedStringB = b.price.replace(/,/g, ""); //Remove the commas
        let toNumberA = Number(cleanedStringA);
        let toNumberB = Number(cleanedStringB);
        return toNumberB - toNumberA;
      });
      setAllProducts(allProductInStorage);
    } else if (e.target.value === "Price (Lowest)") {
      allProductInStorage.sort((a, b) => {
        let cleanedStringA = a.price.replace(/,/g, ""); //Remove the commas
        let cleanedStringB = b.price.replace(/,/g, ""); //Remove the commas
        let toNumberA = Number(cleanedStringA);
        let toNumberB = Number(cleanedStringB);
        return toNumberA - toNumberB;
      });
      setAllProducts(allProductInStorage);
    } else if (e.target.value === "Name (A - Z)") {
      allProductInStorage.sort((a, b) => {
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
      setAllProducts(allProductInStorage);
    } else {
      allProductInStorage.sort((a, b) => {
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
      setAllProducts(allProductInStorage);
    }
  };
  // console.log(scrollPage.current);

  useEffect(() => {
    setBorderBottom(1); //To make "All" have the border botton when page loads
    setAllProducts(allProductInStorage); //To make sure the page has all products on first visit
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    // const asideElement = scrollPage.current;
    // const sectionElement = asideElement.nextElementSibling;
    // const scrollTop = window.scrollY;
    // console.log(window.scrollY);
    // console.log(scrollTop);
    // console.log(sectionElement.offsetTop);
    // if (scrollTop > sectionElement.offsetTop) {
    //   asideElement.style.transform = `translateY(${
    //     scrollTop - sectionElement.offsetTop
    //   }px)`;
    // } else {
    //   asideElement.style.transform = "none";
    // }
  };

  return (
    <>
      <main className="products">
        {/* Left hand side */}
        <aside ref={scrollPage}>
          <input type="text" placeholder="Search" />
          <div className="category">
            <h3>Category</h3>
            <div>
              <ul>
                {category.map((each, i) => {
                  const { id, cat } = each;
                  return (
                    <li
                      key={i}
                      className={`${borderBottom === id ? "add-li-css" : ""}`}
                      onClick={(e) => categoryHandler(id, e.target)}
                    >
                      {cat}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="company-con">
            <h3>Company</h3>
            <select name="" id="" onChange={(e) => companyHandler(e)}>
              {company.map((each, i) => {
                const { id, company } = each;
                return (
                  <option value={company} key={i}>
                    {company}
                  </option>
                );
              })}
            </select>
          </div>
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
          <button
            className="clear-filter-btn"
            onClick={() => {
              setBorderBottom(1);
              setAllProducts(allProductInStorage);
              setRangeValue(3099.99);
            }}
          >
            Clear Filters
          </button>
        </aside>
        {/* Right hand side */}
        <section className="products-images-sect scrolling-section">
          <header className="product-header">
            {allProducts && (
              <p>
                {allProducts.length} product{allProducts.length < 2 ? "" : "s"}{" "}
                Found
              </p>
            )}
            <hr className="wobble" />
            <div className="sort-con">
              <p>Sort By: </p>
              <select name="" id="" onChange={(e) => sortingHandler(e)}>
                {sortBy.map((each, i) => {
                  const { id, sort } = each;
                  return (
                    <option value={sort} key={i}>
                      {sort}
                    </option>
                  );
                })}
              </select>
            </div>
          </header>
          <section className="loader-and-image-sect">
            {isLoading && <Loader loaderCss="add-product-loader-css" />}
            {allProducts.map((each, i) => {
              const { id, image, type, price } = each;
              return (
                <div className="product-images-con" key={id}>
                  <div
                    className="image-con"
                    onMouseOver={() => handleMouseOver(id)}
                    onMouseOut={() => handleMouseOut(id)}
                  >
                    <SearchHover id={id} />
                    <img src={image} alt={type} />
                  </div>
                  <div className="name-and-amt-con">
                    <p>{type}</p>
                    <p>${price}</p>
                  </div>
                </div>
              );
            })}
          </section>
        </section>
      </main>
    </>
  );
};

export default Products;
