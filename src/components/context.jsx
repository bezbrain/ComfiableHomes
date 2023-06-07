import React, { useContext, useEffect, useReducer, useState } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";

const AppContext = React.createContext();

export const ACTIONS = {
  ADD_TO_CART: "add-to-cart",
};

const cart = {
  name: "",
  price: "",
  image: "",
  isInCart: false,
  isInStock: true,
  cart: [],
};

const reducer = (currState, action) => {
  if (action.type === ACTIONS.ADD_TO_CART) {
    const getProduct = action.payload.products;
    const getId = action.payload.prodId;
    console.log(getProduct);
    console.log(getId);
    const updatedState = {
      ...currState,
      name: getProduct[getId - 1].details.name,
      price: getProduct[getId - 1].price,
      image: getProduct[getId - 1].image,
      isInCart: getProduct[getId - 1].isInCart,
      isInStock: getProduct[getId - 1].isInStock,
    };
    const updatedCart = [...currState.cart, updatedState];
    console.log(updatedCart);
    return { ...currState, cart: updatedCart };
  }
  return currState;
};

export const AppProvider = ({ children }) => {
  const [showNav, setShowNav] = useState("");
  const [pathname, setPathname] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(false);

  // Using useReducer for Cart
  const [initState, dispatch] = useReducer(reducer, cart);

  // console.log(initState.cart);

  // Fetch all Products
  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/products");
      setAllProducts(data);
      localStorage.setItem("AllProducts", JSON.stringify(data));
      // const getAllImages = JSON.parse(localStorage.getItem("AllProducts"));
      // setAllProducts(getAllImages);
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
    getAllProducts();
    // displayAllData();
  }, []);

  const handleIncrease = () => {
    return;
  };

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
        dispatch,
        initState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
