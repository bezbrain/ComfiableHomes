import React, { useContext, useEffect, useState } from "react";
import {
  deleteCartProduct,
  getCartProducts,
  getSingleProduct,
} from "../apis/products";

const ApiContext = React.createContext();

export const ApiProvider = ({ children }) => {
  const [getProductDetails, setGetProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [getCartProduct, setGetCartProduct] = useState([]);

  const [cartCount, setCartCount] = useState(0);

  const [isCartDisable, setIsCartDisable] = useState(false);

  const [cartPageCount, setCartPageCount] = useState(1);

  // GET THE DETAILS OF SINGLE PRODUCT
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

  // FUNCTION TO HANDLE WHEN CART NAV ITEM IS CLICKED
  const handleCartProduct = async (authToken, toast, setShowNav) => {
    if (!authToken) {
      setShowNav("");
      toast.error("Please Login");
      return;
    }
    try {
      setIsLoading(true);
      setShowNav("");
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

  // FUNCTION TO HANDLE DELETING OF CART ITEM
  const handleDeleteCart = async (index, toast) => {
    try {
      const response = await deleteCartProduct(index);
      toast.success(response.message);
      // Call the db colection for cart
      const { items } = await getCartProducts();
      setGetCartProduct(items);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  // Cart Page IncreaseHandler
  const increaseHandler = (index) => {
    const newCartProduct = getCartProduct.find((each) => each._id === index);
    if (newCartProduct.counter < 10) {
      newCartProduct.counter++;
      setCartPageCount(newCartProduct.counter);
      return;
    }
  };

  // Cart Page DecreaseHandler
  const decreaseHandler = async (index, toast) => {
    const newCartProduct = getCartProduct.find((each) => each._id === index);
    newCartProduct.counter--;
    if (newCartProduct.counter === 0) {
      try {
        setIsCartDisable(true);
        await handleDeleteCart(index, toast);
        setIsCartDisable(false);
      } catch (error) {
        // console.log(error);
        toast.error(error.response.data.message || error.message);
        setIsCartDisable(false);
      }
    }
    setCartPageCount(newCartProduct.counter);
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
        handleDeleteCart,
        increaseHandler,
        decreaseHandler,
        cartPageCount,
        setCartPageCount,
        isCartDisable,
        setIsCartDisable,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  return useContext(ApiContext);
};
