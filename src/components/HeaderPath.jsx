import "../styles/about.css";
import { useLocation, Link } from "react-router-dom";
import { useGlobalContext } from "./context";

const HeaderPath = () => {
  const { allProducts } = useGlobalContext();
  const location = useLocation();

  return (
    <>
      <section className="header-path">
        <div>
          <p>
            <Link to={"/"} style={{ textDecoration: "none", color: "#000" }}>
              <span>Home</span> /
            </Link>
            <span style={{ color: "blue" }}>
              {" "}
              {location.pathname === "/about"
                ? "About"
                : location.pathname === "/products"
                ? "Products"
                : location.pathname === "/cart"
                ? "Cart"
                : // : location.pathname === "/products/2"
                  // ? location.pathname
                  "Error Page"}
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default HeaderPath;
