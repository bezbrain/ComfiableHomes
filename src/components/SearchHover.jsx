/* eslint-disable react/prop-types */
import "../styles/home.css";
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from "../contexts/context";
import { Link } from "react-router-dom";

const SearchHover = ({ id }) => {
  const { hoveredIndex } = useGlobalContext();

  return (
    <>
      <div className="img-overlay"></div>
      {id === hoveredIndex && (
        <Link to={`/products/${id}`}>
          <FaSearch className="search-icon" />
        </Link>
      )}
    </>
  );
};

export default SearchHover;
