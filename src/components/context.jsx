import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [showNav, setShowNav] = useState("");
  const [pathname, setPathname] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(false);
  // const { productId } = useParams();

  // Fetch all Products
  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/products");
      // console.log(data);
      // setAllProducts(data);
      localStorage.setItem("AllProducts", JSON.stringify(data));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const displayAllData = () => {
    setIsLoading(true);
    const getAllImages = JSON.parse(localStorage.getItem("AllProducts"));
    setAllProducts(getAllImages);
    setIsLoading(false);
  };

  useEffect(() => {
    // getAllProducts();
    displayAllData();
  }, [allProducts]);

  return (
    <AppContext.Provider
      value={{
        showNav,
        setShowNav,
        pathname,
        setPathname,
        products,
        setProducts,
        isLoading,
        setIsLoading,
        allProducts,
        setAllProducts,
        hoveredIndex,
        setHoveredIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
