import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../apis/products";

const ApiContext = React.createContext();

export const ApiProvider = ({ children }) => {
  //   const { productId } = useParams();

  const [getProductDetails, setGetProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <ApiContext.Provider
      value={{ getSingleDetails, getProductDetails, isLoading, setIsLoading }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  return useContext(ApiContext);
};
