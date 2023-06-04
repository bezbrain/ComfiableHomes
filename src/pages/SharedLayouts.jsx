import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Nav from "./Home/Nav";
import Footer from "./Footer";
import HeaderPath from "../components/HeaderPath";

const SharedLayouts = () => {
  const location = useLocation();

  return (
    <>
      <Nav />
      {location.pathname === "/" ? "" : <HeaderPath />}
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayouts;
