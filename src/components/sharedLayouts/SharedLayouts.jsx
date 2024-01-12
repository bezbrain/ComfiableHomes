/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "../../pages/Footer";
import HeaderPath from "../HeaderPath";
import Register_Login from "../Register_Login";

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
