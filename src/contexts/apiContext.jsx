import React, { useContext, useEffect, useState } from "react";
import { getCartProducts, getSingleProduct } from "../apis/products";

const ApiContext = React.createContext();

export const ApiProvider = ({ children }) => {
  const [getProductDetails, setGetProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [getCartProduct, setGetCartProduct] = useState([]);

  const [cartCount, setCartCount] = useState(0);

  // Get the details of single product
  const getSingleDetails = async (productId) => {
    try {
      setIsLoading(true);
      const { products } = await getSingleProduct(productId);
      setGetProductDetails(products);
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message || error.message);
      setIsLoading(false);
    }
  };

  const handleCartProduct = async (authToken, toast, setShowNav) => {
    if (!authToken) {
      setShowNav("");
      toast.error("Please Login");
      return;
    }
    try {
      setIsLoading(true);
      const { items } = await getCartProducts();
      // console.log(items);
      setGetCartProduct(items);
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message || error.message);
      setIsLoading(false);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        getSingleDetails,
        getProductDetails,
        isLoading,
        setIsLoading,
        handleCartProduct,
        getCartProduct,
        setGetCartProduct,
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  return useContext(ApiContext);
};
