import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCartProducts, getSingleProduct } from "../apis/products";

const ApiContext = React.createContext();

export const ApiProvider = ({ children }) => {
  //   const { productId } = useParams();

  const [getProductDetails, setGetProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [getCartProduct, setGetCartProduct] = useState([]);

  // let items = 0;

  const [cartCount, setCartCount] = useState(0);

  // Get the details of single product
  const getSingleDetails = async (productId) => {
    try {
      setIsLoading(true);
      const { products } = await getSingleProduct(productId);
      setGetProductDetails(products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleCartProduct = async (authToken, toast, setShowNav) => {
    authToken ? "" : toast.error("Please Login");
    setShowNav("");
    try {
      // console.log(items);
      const { items } = await getCartProducts();
      // console.log(items);
      setGetCartProduct(items);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
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
