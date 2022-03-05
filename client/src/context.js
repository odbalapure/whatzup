import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  /**
   * @desc Check if a user is logged in and is an admin or not
   */
  useEffect(() => {
    if (localStorage.getItem("whatzup_user")) {
      if (JSON.parse(localStorage.getItem("whatzup_user")).name !== "") {
        setIsLoggedIn(true);
        setUserName(JSON.parse(localStorage.getItem("whatzup_user")).name);
      }

      if (JSON.parse(localStorage.getItem("whatzup_user")).role === "ADMIN") {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        userName,
        isAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
