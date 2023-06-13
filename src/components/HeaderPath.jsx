import "../styles/about.css";
import { useLocation, Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import { useEffect } from "react";

const HeaderPath = () => {
  const { allProducts, getProductDetails, allProductInStorage, pathHeightRef } =
    useGlobalContext();
  const location = useLocation();

  // Get single object from the localStorage
  const getSingleObj = JSON.parse(localStorage.getItem("singleItem")) || {};

  return (
    <>
      <section className="header-path" ref={pathHeightRef}>
        <div>
          <p>
            <Link to={"/"} style={{ textDecoration: "none", color: "#000" }}>
              <span>Home</span> /
            </Link>
            <span style={{ color: "blue" }}>
              {" "}
              {location.pathname === "/about" ? (
                "About"
              ) : location.pathname === "/products" ? (
                "Products"
              ) : location.pathname === "/cart" ? (
                "Cart"
              ) : location.pathname === `/products/${getSingleObj.id}` ? (
                <span>
                  <Link to="/products">Products</Link> / {getSingleObj.type}
                </span>
              ) : (
                "Error Page"
              )}
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default HeaderPath;
