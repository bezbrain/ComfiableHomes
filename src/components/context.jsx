import React, { useContext, useState } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [showNav, setShowNav] = useState("");
  const [pathname, setPathname] = useState("");

  return (
    <AppContext.Provider value={{ showNav, setShowNav, pathname, setPathname }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
