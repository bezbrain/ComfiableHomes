/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";

const LogoutContext = createContext();

export const LogoutProvider = ({ children }) => {
  return <LogoutContext.Provider value={{}}>{children}</LogoutContext.Provider>;
};

export const useLogoutContext = () => {
  return useContext(LogoutContext);
};
