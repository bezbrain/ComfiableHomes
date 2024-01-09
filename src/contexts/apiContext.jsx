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
      console.log("Running");
      const response = await deleteCartProduct(index);
      toast.success(response.message);
      console.log("Delete run");
      // await handleCartProduct(authToken, toast, setShowNav); // Call this function to get the remaining data after deleting from db
      console.log("Cart run");
    } catch (error) {
      console.log(error);
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
        await handleDeleteCart(index, toast);
        console.log("Item deleted");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || error.message);
      }
      // return;
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
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  return useContext(ApiContext);
};
