import "../../styles/general/headerPath.css";
import { useLocation, Link } from "react-router-dom";
import { useApiContext } from "../../contexts/apiContext";
import { useGlobalContext } from "../../contexts/context";
import { useEffect, useRef } from "react";

const HeaderPath = () => {
  const { getProductDetails, isLoading } = useApiContext();
  const { headerHeight, setPathHeight, pathHeight, filterHeight } =
    useGlobalContext();

  const headerPathRef = useRef(null);

  const location = useLocation();

  // When the screen resizes, header path height should set
  window.onresize = () => {
    if (headerPathRef.current) {
      const headerPathHeight =
        headerPathRef.current.getBoundingClientRect().height;
      setPathHeight(headerPathHeight);
    }
  };

  // Dynamically set the height of header path
  useEffect(() => {
    if (headerPathRef.current) {
      const headerPathHeight =
        headerPathRef.current.getBoundingClientRect().height;
      setPathHeight(headerPathHeight);
    }
  }, [filterHeight, pathHeight, headerHeight]);

  return (
    <>
      <section
        className="header-path"
        style={{ top: `${headerHeight}px` }}
        ref={headerPathRef}
      >
        <div>
          <p>
            <Link to={"/"} style={{ textDecoration: "none", color: "#000" }}>
              <span>Home</span> /
            </Link>
            {!isLoading && (
              <span style={{ color: "blue" }}>
                {" "}
                {location.pathname === "/about" ? (
                  "About"
                ) : location.pathname === "/products" ? (
                  "Products"
                ) : location.pathname === "/cart" ? (
                  "Cart"
                ) : location.pathname ===
                  `/products/${getProductDetails?._id}` ? (
                  <span>
                    <Link to="/products">Products</Link> /{" "}
                    {getProductDetails.type}
                  </span>
                ) : location.pathname === "/checkout" ? (
                  <span>
                    <Link to="/cart">Cart</Link> /Checkout
                  </span>
                ) : (
                  "Error Page"
                )}
              </span>
            )}
          </p>
        </div>
      </section>
    </>
  );
};

export default HeaderPath;
