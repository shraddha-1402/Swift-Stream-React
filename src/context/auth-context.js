import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import { authReducer } from "../reducer";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("data"));
  const [authState, authDispatch] = useReducer(authReducer, {
    token: userData ? userData.token : null,
    userInfo: userData ? userData.userInfo : {},
  });

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export { useAuth, AuthProvider };
