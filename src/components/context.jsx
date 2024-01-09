/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { products } from "../data";
import { useRef } from "react";

const AppContext = React.createContext();

import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { logoutUser } from "../apis/users";

/* =================== */
/* =================== */
// AppProvider Component
export const AppProvider = ({ children }) => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "comfiablehomes.firebaseapp.com",
    projectId: "comfiablehomes",
    storageBucket: "comfiablehomes.appspot.com",
    messagingSenderId: "778014108141",
    appId: "1:778014108141:web:925007899f36eaba085fe4",
  };

  initializeApp(firebaseConfig);

  const auth = getAuth();

  const [showNav, setShowNav] = useState("");
  const [pathname, setPathname] = useState("");
  const [homeProducts, setHomeProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(false);

  // For calculating the height of header path
  const pathHeightRef = useRef(null);
  const loginLogoutRef = useRef(null);

  // For login and logout
  const [toggleLoginLogout, setToggleLoginLogout] = useState(false);
  const [loginRegister, setloginRegister] = useState(false);
  const [loginLogoutOverlay, setLoginLogoutOverlay] = useState(false);

  // "Login"-nav item to Change to "Logout" if Logged in and vice versa
  const [isLogged, setIsLogged] = useState("Login");

  const [userToken, setUserToken] = useState("");

  const allProductInStorage = JSON.parse(localStorage.getItem("allProducts"));
  const getCartItems = JSON.parse(localStorage.getItem("addItem")) || [];

  const [count, setCount] = useState(1);

  const [cartCount, setCartCount] = useState(1);
  // const [getProductDetails, setGetProductDetails] = useState({});

  const [isDisable, setIsDisable] = useState(false);

  // Quantity of items in cart function
  const quantityOfProductInCart = (getCartProducts) => {
    let sum = 0;
    getCartProducts.forEach((each) => {
      sum += each.counter;
    });
    return sum;
  };

  // Logout user
  const handleLoginLogout = async (toastMessage, navigate) => {
    setShowNav("");
    if (loginLogoutRef.current.textContent === "Login") {
      setLoginLogoutOverlay(true);
    } else {
      try {
        setIsDisable(true);
        const { data } = await logoutUser();
        toastMessage.success(data.message);
        setIsLogged("Login");
        navigate("/");
        sessionStorage.removeItem("authToken"); // Clear the authentication token from session storage
        setIsDisable(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        // console.log(error);
        setIsDisable(false);
        toastMessage.error(error.response.data.message || error.message);
      }
    }
  };

  /* ================ */
  // Access the user to login or logout
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      setIsLogged("Logout");
    } else {
      setIsLogged("Login");
    }
  }, []);

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
        // dispatch,
        // initState,
        cartCount,
        setCartCount,
        getCartItems,
        // getProductDetails,
        // setGetProductDetails,
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
        loginLogoutRef,
        auth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        handleLoginLogout,
        userToken,
        setUserToken,
        isLogged,
        setIsLogged,
        isDisable,
        setIsDisable,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
