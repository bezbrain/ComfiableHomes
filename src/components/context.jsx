import React, { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { products } from "../data";
import { useRef } from "react";

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
    const allProductInStorage = JSON.parse(localStorage.getItem("allProducts"));
    const getProduct = action.payload.products;
    const getId = action.payload.prodId;
    const getCounter = action.payload.counter;
    // Get equal Id's
    const productExists = currState.some((each) => each.prevId === getId);
    if (productExists) {
      return currState;
    }

    console.log(currState);

    const updatedState = {
      id: Date.now(),
      prevId: getId,
      name: allProductInStorage[getId - 1].type,
      price: allProductInStorage[getId - 1].price,
      image: allProductInStorage[getId - 1].image,
      isInCart: allProductInStorage[getId - 1].isInCart,
      isInStock: allProductInStorage[getId - 1].isInStock,
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

  // For calculating the height of header path
  const pathHeightRef = useRef(null);
  const loginLogoutRef = useRef(null);

  // For popup notification
  const [notification, setNotification] = useState(false);
  const [successNoti, setSuccessNoti] = useState(false);
  const [failureNoti, setFailureNoti] = useState(false);
  const [loginPopupNoti, setLoginPopupNoti] = useState(false);
  const [registerPopupNoti, setRegisterPopupNoti] = useState(false);
  const [showRegisterNoti, setShowRegisterNoti] = useState(false);
  const [showLoginNoti, setShowLoginNoti] = useState(false);
  const [showNavLoginNoti, setShowNavLoginNoti] = useState(false);

  // For login and logout
  const [toggleLoginLogout, setToggleLoginLogout] = useState(false);
  const [loginRegister, setloginRegister] = useState(false);
  const [loginLogoutOverlay, setLoginLogoutOverlay] = useState(false);

  const allProductInStorage = JSON.parse(localStorage.getItem("allProducts"));
  const getCartItems = JSON.parse(localStorage.getItem("addItem")) || [];

  const [count, setCount] = useState(1);

  const [cartCount, setCartCount] = useState(1);
  const [getProductDetails, setGetProductDetails] = useState({});

  // Using useReducer for Cart
  const [initState, dispatch] = useReducer(reducer, [], () => {
    const storedCartItems = localStorage.getItem("addItem");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  }); //The third arguement is an initializer that checks if there are any existing cart items stored in the local storage.

  // Get all Products
  const displayAllData = async () => {
    setIsLoading(true);
    localStorage.setItem("allProducts", JSON.stringify(products));
    const getStoredProducts = JSON.parse(localStorage.getItem("allProducts"));
    setAllProducts(getStoredProducts);
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

  // Quantity of items in cart function
  const quantityOfProductInCart = () => {
    let sum = 0;
    getCartItems.forEach((each) => {
      sum += each.counter;
    });
    return sum;
  };

  // Nav Bar Login and Logout text toggle
  const handleLoginLogout = () => {
    setShowNav("");
    if (loginLogoutRef.current.textContent === "Login") {
      setLoginLogoutOverlay(true);
    } else {
      setLoginLogoutOverlay(false);
      setToggleLoginLogout(false);
      setShowNavLoginNoti(true);
      setTimeout(() => {
        setShowNavLoginNoti(false);
      }, 3000);
    }
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
        quantityOfProductInCart,
        allProductInStorage,
        toggleLoginLogout,
        setToggleLoginLogout,
        loginLogoutOverlay,
        setLoginLogoutOverlay,
        loginRegister,
        setloginRegister,
        pathHeightRef,
        registerPopupNoti,
        setRegisterPopupNoti,
        loginPopupNoti,
        setLoginPopupNoti,
        showRegisterNoti,
        setShowRegisterNoti,
        showLoginNoti,
        setShowLoginNoti,
        loginLogoutRef,
        showNavLoginNoti,
        setShowNavLoginNoti,
        handleLoginLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
