import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [makePaymentLoading, setMakePaymentLoading] = useState(false);

  // FUNCTION TO HANDLE WHEN CART NAV ITEM IS CLICKED
  const handleOrderProducts = async (authToken, toast, setShowNav) => {
    if (!authToken) {
      setShowNav("");
      toast.error("Please Login to view this page");
      return;
    }
    try {
      setShowNav("");
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        email,
        setEmail,
        makePaymentLoading,
        setMakePaymentLoading,
        handleOrderProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const paymentGlobalContext = () => {
  return useContext(AppContext);
};
