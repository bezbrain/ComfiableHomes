import React, { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { products } from "../data";

const AppContext = React.createContext();

export const ACTIONS = {
  ADD_TO_CART: "add-to-cart",
  DELETE_FROM_CART: "delete-from-cart",
  INCREASE_COUNT: "increase-count",
  DECREASE_COUNT: "decreaase-count",
  CLEAR_CART: "clear-cart",
};

/* ======== */
// The reducer function
const reducer = (currState, action) => {
  // Add to cart
  if (action.type === ACTIONS.ADD_TO_CART) {
    const getProduct = action.payload.products;
    const getId = action.payload.prodId;
    const getCounter = action.payload.counter;
    // Get equal Id's
    const productExists = currState.some((each) => each.prevId === getId);
    if (productExists) {
      return currState;
    }

    const updatedState = {
      // ...currState,
      id: Date.now(),
      prevId: getId,
      name: getProduct[getId - 1].details.name,
      price: getProduct[getId - 1].price,
      image: getProduct[getId - 1].image,
      isInCart: getProduct[getId - 1].isInCart,
      isInStock: getProduct[getId - 1].isInStock,
      counter: getCounter,
    };

    let accAddedCart = [...currState, updatedState];
    localStorage.setItem("addItem", JSON.stringify(accAddedCart));
    const getCartItems = JSON.parse(localStorage.getItem("addItem"));
    return getCartItems;
    // Delete from cart
  } else if (action.type === ACTIONS.DELETE_FROM_CART) {
    let filterId = action.payload.filterId;
    const newProduct = currState.filter((each) => each.id !== filterId);
    localStorage.setItem("addItem", JSON.stringify(newProduct));
    console.log(newProduct);
    return newProduct;
    // Increase Counter
  } else if (action.type === ACTIONS.INCREASE_COUNT) {
    let id = action.payload.filterId;
    const updateCounterState = currState.map((each) => {
      if (each.id === id) {
        return {
          ...each,
          counter: each.counter < 10 ? each.counter + 1 : (each.counter = 10),
        };
      }
      return each;
    });
    localStorage.setItem("addItem", JSON.stringify(updateCounterState));
    return updateCounterState;
    // Decrease Counter
  } else if (action.type === ACTIONS.DECREASE_COUNT) {
    let id = action.payload.filterId;
    const updateCounterState = currState.map((each) => {
      if (each.id === id) {
        return {
          ...each,
          counter: each.counter > 1 ? each.counter - 1 : (each.counter = 1),
        };
      }
      return each;
    });
    localStorage.setItem("addItem", JSON.stringify(updateCounterState));
    return updateCounterState;
    // Clear cart
  } else if (action.type === ACTIONS.CLEAR_CART) {
    localStorage.removeItem("addItem");
    return [];
  }
  return currState;
};

/* =================== */
/* =================== */
// AppProvider Component
export const AppProvider = ({ children }) => {
  const [showNav, setShowNav] = useState("");
  const [pathname, setPathname] = useState("");
  const [homeProducts, setHomeProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(false);
  // const notiRef = useRef(null);
  const [notification, setNotification] = useState(false);
  const [successNoti, setSuccessNoti] = useState(false);
  const [failureNoti, setFailureNoti] = useState(false);

  const getCartItems = JSON.parse(localStorage.getItem("addItem")) || [];

  const [count, setCount] = useState(1);

  const [cartCount, setCartCount] = useState(1);
  const [getProductDetails, setGetProductDetails] = useState({});

  // Using useReducer for Cart
  const [initState, dispatch] = useReducer(reducer, [], () => {
    const storedCartItems = localStorage.getItem("addItem");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  }); //The third arguement is an initializer that checks if there are any existing cart items stored in the local storage.

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

  const displayAllData = async () => {
    setIsLoading(true);
    localStorage.setItem("allProducts", JSON.stringify(products));
    setAllProducts(products);
    setIsLoading(false);
  };

  useEffect(() => {
    // getAllProducts();
    displayAllData();
    const storedCartItems = localStorage.getItem("addItem");
    if (storedCartItems) {
      dispatch({ type: "", payload: { products: [], prodId: "" } }); // Initial dispatch to set the stored cart items as the initial state
    }
  }, []);

  // Cart Page IncreaseHandler
  const increaseHandler = (index) => {
    dispatch({
      type: ACTIONS.INCREASE_COUNT,
      payload: { filterId: index },
    });
  };

  // Cart Page DecreaseHandler
  const decreaseHandler = (index) => {
    dispatch({
      type: ACTIONS.DECREASE_COUNT,
      payload: { filterId: index },
    });
  };

  return (
    <AppContext.Provider
      value={{
        showNav,
        setShowNav,
        pathname,
        setPathname,
        homeProducts,
        setHomeProducts,
        isLoading,
        setIsLoading,
        allProducts,
        setAllProducts,
        hoveredIndex,
        setHoveredIndex,
        dispatch,
        initState,
        notification,
        setNotification,
        successNoti,
        setSuccessNoti,
        failureNoti,
        setFailureNoti,
        cartCount,
        setCartCount,
        getCartItems,
        increaseHandler,
        decreaseHandler,
        getProductDetails,
        setGetProductDetails,
        count,
        setCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
