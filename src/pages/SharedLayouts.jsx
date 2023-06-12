import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Nav from "./Home/Nav";
import Footer from "./Footer";
import HeaderPath from "../components/HeaderPath";
import Register_Login from "../components/Register_Login";

const SharedLayouts = () => {
  const location = useLocation();

  return (
    <>
      <Register_Login />
      <Nav />
      {location.pathname === "/" ? "" : <HeaderPath />}
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayouts;
