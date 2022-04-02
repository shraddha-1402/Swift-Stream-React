import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const CustomNavLink = ({
  activeClassName,
  className,
  inactiveClassName,
  to,
  clickHandler,
  ...rest
}) => {
  const location = useLocation();
  const isActive = location.pathname.includes(to);

  const allClassName =
    className +
    (isActive === true ? ` ${activeClassName}` : ` ${inactiveClassName}`);

  return (
    <Link className={allClassName} to={to} onClick={clickHandler} {...rest} />
  );
};

CustomNavLink.propTypes = {
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  inactiveClassName: PropTypes.string,
  to: PropTypes.string,
  clickHandler: PropTypes.func,
};
