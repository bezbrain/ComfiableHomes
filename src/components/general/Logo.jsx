/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/context";

const Logo = () => {
  const { setShowNav } = useGlobalContext();

  return (
    <>
      <Link
        className="logo-link"
        to="/"
        style={{ textDecoration: "none" }}
        onClick={() => setShowNav("")}
      >
        <h1>
          <span>Comfiable</span>
          <span>Homes</span>
        </h1>
      </Link>
    </>
  );
};

export default Logo;
