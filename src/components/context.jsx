import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [showNav, setShowNav] = useState("");
  const [pathname, setPathname] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(false);

  // Fetch all Products
  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/products");
      // console.log(data);
      setAllProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(allProducts);

  useEffect(() => {
    getAllProducts();
  }, []);

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
