/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTimes,
  FaRegUser,
  FaBars,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { BsBox2 } from "react-icons/bs";
import { Logo } from "../general";
import "../../styles/sharedLayouts.css/nav.css";
import "../../styles/sharedLayouts.css/nav2.css";
import { useGlobalContext } from "../../contexts/context";
import { toast } from "react-toastify";
import { useApiContext } from "../../contexts/apiContext";
import { getCartProducts } from "../../apis/cart";

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
    headerHeight,
    setHeaderHeight,
    pathHeight,
    filterHeight,
  } = useGlobalContext();

  const { handleCartProduct, getCartProduct, setGetCartProduct } =
    useApiContext();

  const navRef = useRef(null);

  // Dynamically set the height of nav header
  useEffect(() => {
    if (navRef.current) {
      const getHeaderHeight = navRef.current.getBoundingClientRect().height;
      setHeaderHeight(getHeaderHeight);
    }
  }, [filterHeight, pathHeight, headerHeight]);

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
        const { items } = await getCartProducts();
        setGetCartProduct(items);
      } catch (error) {
        // console.log(error);
        toast.error(error.response.data.message || error.message);
      }
    };
    // Run useEffect only if authToken is available
    if (authToken) {
      getCartCount();
    }
  }, []);

  return (
    <>
      <header className="nav-header" ref={navRef}>
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
                <MdOutlineShoppingCart />
              </p>
              <div className="products-in-cart">
                {authToken ? quantityOfProductInCart(getCartProduct) : 0}
              </div>
            </Link>
            <div className="full-profile">
              <p>
                <FaRegUser />
                User <FaAngleDown /> <FaAngleUp className="profile-up" />
              </p>
              <div className="profile-drop-down">
                <p>
                  <BsBox2 /> Orders
                </p>
                <button
                  className="login-logout"
                  ref={loginLogoutRef}
                  onClick={() => handleLoginLogout(toast, navigate)}
                  disabled={isDisable}
                >
                  <IoLogOutOutline />
                  {isLogged}
                </button>
              </div>
            </div>
          </section>
        </nav>
      </header>
    </>
  );
};

export default Nav;
