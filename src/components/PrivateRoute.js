import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { routes } from "../constants";
import { useAuth } from "../context";

const PrivateRoute = ({ authRoute = false }) => {
  const location = useLocation();
  const {
    authState: { token },
  } = useAuth();

  if (authRoute)
    return token ? <Navigate replace={true} to={-1} /> : <Outlet />;

  return token ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} to={routes.LOGIN_PAGE} />
  );
};

PrivateRoute.propTypes = {
  authRoute: PropTypes.bool,
};

export { PrivateRoute };
