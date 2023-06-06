import "../styles/home.css";
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";

const SearchHover = ({ i }) => {
  const { hoveredIndex } = useGlobalContext();

  return (
    <>
      <div className="img-overlay"></div>
      {i === hoveredIndex && (
        <Link to={`/products/${i + 1}`}>
          <FaSearch className="search-icon" />
        </Link>
      )}
    </>
  );
};

export default SearchHover;
