import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextWrapper = ({ children }) => {
  const [auth, setAuth] = useState({
    isLogin: false,
    token: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ isLogin: true, token });
    }
  }, []); // This runs only once when the component mounts

  // When the user logs in, store the token in localStorage
  useEffect(() => {
    if (auth.isLogin) {
      localStorage.setItem("token", auth.token);
    } else {
      localStorage.removeItem("token"); 
    }
  }, [auth.isLogin, auth.token]); 

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(authContext);
};
 