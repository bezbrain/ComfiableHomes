import { useEffect, useState } from "react";
// Importing icons
import { FaTimes } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
// import Logo from "../Logo";
const Nav = ({ showNavClassName, closeHandle }) => {
  // const closeHandle = () => {
  //   console.log("It is closed");
  // };

  return (
    <>
      {/* {closeNavBar && <FaTimes className="close" />} */}
      <nav className={showNavClassName}>
        {/* {closeNavBar && <Logo />} */}
        <FaTimes className="close" onClick={closeHandle} />
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Products</li>
          <li>Checkout</li>
        </ul>
        <section className="cart-and-logout-sect">
          <p>
            Cart
            <FaCartPlus />
          </p>
          <p>
            Logout
            <FaUser />
          </p>
        </section>
      </nav>
    </>
  );
};

export default Nav;
