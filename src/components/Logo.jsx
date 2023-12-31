/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";

const Logo = () => {
  const { closeNav } = useGlobalContext();

  return (
    <>
      <Link className="logo-link" to="/" style={{ textDecoration: "none" }}>
        <h1>
          <span>Comfiable</span>
          <span>Homes</span>
        </h1>
      </Link>
    </>
  );
};

export default Logo;
