/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTimes, FaCartPlus, FaUserPlus, FaBars } from "react-icons/fa";
import Logo from "../../components/Logo";
import "../../styles/nav.css";
// import { navData } from "../../../data/pagesData";
import { useGlobalContext } from "../../components/context";
import { useEffect, useRef } from "react";
import Notification from "../../components/Notification";
import { toast } from "react-toastify";
import { logoutUser } from "../../apis/users";
import { useApiContext } from "../../contexts/apiContext";
import { getCartProducts } from "../../apis/products";

const Nav = () => {
  const {
    showNav,
    setShowNav,
    setPathname,
    quantityOfProductInCart,
    loginLogoutRef,
    isLogged,
    handleLoginLogout,
    isDisable,
  } = useGlobalContext();

  const { handleCartProduct, getCartProduct, cartCount, setCartCount } =
    useApiContext();

  const location = useLocation();
  const navigate = useNavigate();

  const handleOpen = () => {
    setShowNav("add-show-nav-css");
  };

  const closeNav = () => {
    setShowNav("");
    setPathname(location);
  };

  const authToken = sessionStorage.getItem("authToken") || "";

  useEffect(() => {
    // This is to trigger the number of cart items in nav bar
    const getCartCount = async () => {
      try {
        const res = await getCartProducts();
        setCartCount(res.count);
      } catch (error) {
        // console.log(error);
        toast.error(error.response.data.message || error.message);
      }
    };
    // Run useEffect only if authToken is available
    if (authToken) {
      getCartCount();
    }
  }, [getCartProduct]);

  return (
    <>
      <header>
        <Logo />
        <FaBars className="open" onClick={handleOpen} />
        <nav className={showNav}>
          <Logo onClick={closeNav} />
          <FaTimes className="close" onClick={closeNav} />
          <ul>
            <Link
              to="/"
              onClick={closeNav}
              className={`${location.pathname === "/" ? "active-page" : ""}`}
            >
              <li>Home</li>
            </Link>
            <Link
              to="about"
              onClick={closeNav}
              className={`${
                location.pathname === "/about" ? "active-page" : ""
              }`}
            >
              <li>About</li>
            </Link>
            <Link
              to="products"
              onClick={closeNav}
              className={`${
                location.pathname === "/products" ? "active-page" : ""
              }`}
            >
              <li>Products</li>
            </Link>
          </ul>
          <section className="cart-and-logout-sect">
            <Link
              to={`${authToken ? "/cart" : ""}`}
              style={{ textDecoration: "none", color: "#000" }}
              className={`${
                location.pathname === "/cart" ? "active-page" : ""
              }`}
              onClick={() => handleCartProduct(authToken, toast, setShowNav)}
            >
              <p>
                Cart
                <FaCartPlus />
              </p>
              <div className="products-in-cart">
                {authToken
                  ? cartCount || quantityOfProductInCart(getCartProduct)
                  : 0}
              </div>
            </Link>
            <button
              className="login-logout"
              ref={loginLogoutRef}
              onClick={() => handleLoginLogout(toast, navigate)}
              disabled={isDisable}
            >
              {isLogged}
              <FaUserPlus />
            </button>
          </section>
        </nav>
      </header>
    </>
  );
};

export default Nav;
