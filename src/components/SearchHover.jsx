import "../styles/home.css";
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from "./context";

const SearchHover = ({ i }) => {
  const { hoveredIndex } = useGlobalContext();

  return (
    <>
      <div className="img-overlay"></div>
      {i === hoveredIndex && <FaSearch className="search-icon" />}
    </>
  );
};

export default SearchHover;
