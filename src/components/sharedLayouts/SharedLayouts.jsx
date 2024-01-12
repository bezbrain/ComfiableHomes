/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Nav, Footer } from "./";
import { HeaderPath } from "../general";
import { Register_Login } from "../auth";

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
