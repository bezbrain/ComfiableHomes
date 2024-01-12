import "../styles/about.css";
import { useLocation, Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/context";
import { useApiContext } from "../contexts/apiContext";

const HeaderPath = () => {
  const { pathHeightRef } = useGlobalContext();

  const { getProductDetails, isLoading } = useApiContext();

  const location = useLocation();

  return (
    <>
      <section className="header-path" ref={pathHeightRef}>
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
