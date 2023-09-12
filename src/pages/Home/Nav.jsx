/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router-dom";
import { FaTimes, FaCartPlus, FaUserPlus, FaBars } from "react-icons/fa";
import Logo from "../../components/Logo";
import "../../styles/nav.css";
// import { navData } from "../../../data/pagesData";
import { useGlobalContext } from "../../components/context";
import { useEffect, useRef } from "react";
import Notification from "../../components/Notification";

const Nav = () => {
  const {
    showNav,
    setShowNav,
    setPathname,
    quantityOfProductInCart,
    toggleLoginLogout,
    setToggleLoginLogout,
    setLoginLogoutOverlay,
    notification,
    setNotification,
    loginLogoutRef,
    showNavLoginNoti,
    setFailureNoti,
    setSuccessNoti,
    setShowNavLoginNoti,
    handleLoginLogout,
    isLogged,
  } = useGlobalContext();
  const location = useLocation();
  // const navHeightRef = useRef(null);

  const handleOpen = () => {
    setShowNav("add-show-nav-css");
  };

  const closeNav = () => {
    setShowNav("");
    setPathname(location);
  };

  const authToken = sessionStorage.getItem("authToken");

  return (
    <>
      {showNavLoginNoti && <Notification notiText="You are logged out" />}
      {notification && <Notification notiText="Please Login" />}
      <header>
        <Logo />
        <FaBars className="open" onClick={handleOpen} />
        <nav className={showNav}>
          <Logo onClick={closeNav} />
          <FaTimes className="close" onClick={closeNav} />
          <ul>
            <Link to="/" onClick={closeNav}>
              <li>Home</li>
            </Link>
            <Link to="about" onClick={closeNav}>
              <li>About</li>
            </Link>
            <Link to="products" onClick={closeNav}>
              <li>Products</li>
            </Link>
          </ul>
          <section className="cart-and-logout-sect">
            <Link
              to={`${authToken ? "/cart" : ""}`}
              style={{ textDecoration: "none", color: "#000" }}
              onClick={() => {
                setSuccessNoti(false);
                closeNav;
                setNotification(true);
                setFailureNoti(true);
                setTimeout(() => {
                  setNotification(false);
                }, 2000);
              }}
            >
              <p>
                Cart
                <FaCartPlus />
              </p>
              <div className="products-in-cart">
                {authToken ? quantityOfProductInCart() : 0}
              </div>
            </Link>
            <p ref={loginLogoutRef} onClick={handleLoginLogout}>
              {isLogged}
              <FaUserPlus />
            </p>
          </section>
        </nav>
      </header>
    </>
  );
};

export default Nav;
