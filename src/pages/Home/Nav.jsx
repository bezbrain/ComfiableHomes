import { Link, useLocation } from "react-router-dom";
// Importing icons
import { FaTimes } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

import Logo from "../../components/Logo";
import "../../styles/nav.css";
// import { navData } from "../../../data/pagesData";
import { useGlobalContext } from "../../components/context";

const Nav = () => {
  const { showNav, setShowNav, setPathname } = useGlobalContext();
  const location = useLocation();

  const handleOpen = () => {
    setShowNav("add-show-nav-css");
  };

  const closeNav = () => {
    setShowNav("");
    setPathname(location);
  };

  return (
    <>
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
              to="/cart"
              style={{ textDecoration: "none", color: "#000" }}
              onClick={closeNav}
            >
              <p>
                Cart
                <FaCartPlus />
              </p>
            </Link>
            <p>
              Logout
              <FaUser />
            </p>
          </section>
        </nav>
      </header>
    </>
  );
};

export default Nav;
