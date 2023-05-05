import { useEffect, useState } from "react";
// Importing Components
import Nav from "./Nav";
import FirstSect from "./FirstSect";
import FeaturedPro from "./FeaturedPro";
import ThirdSect from "./ThirdSect";
import FourthSect from "./FourthSect";
import Footer from "./Footer";
import Logo from "../Logo";
// Icons
import { FaBars } from "react-icons/fa";
// Importing Styles
import "../../styles/home.css";
import "../../styles/home2.css";

const Home = () => {
  const [showNav, setShowNav] = useState("");

  const handleOpen = () => {
    console.log("Open clicked");
    setShowNav("add-show-nav-css");
  };

  const closeNav = () => {
    setShowNav("");
  };

  return (
    <>
      <div className="home-page">
        {/* {openNavBar && <FaBars className="open" />} */}
        <FaBars className="open" onClick={handleOpen} />
        {/* Header Section */}
        <header>
          <Logo />
          <Nav showNavClassName={showNav} closeHandle={closeNav} />
        </header>
        {/* First Body Section */}
        <FirstSect />
        {/* Second Body Section */}
        <FeaturedPro />
        {/* Third Body Section */}
        <ThirdSect />
        {/* Fourth Body/ Footer Section */}
        <FourthSect />
        {/* Footer Section */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
