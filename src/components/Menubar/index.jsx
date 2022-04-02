import "./style.css";
import React from "react";
import PropTypes from "prop-types";
import { AiOutlineVideoCamera, AiOutlineUser  } from "react-icons/ai";
import { CustomNavLink } from "../index";
import { useAuth } from "../../context";
import { routes } from "../../constants";

const Menubar = ({ setMenubarActive, menubarActive }) => {
  const {
    authState: { token },
  } = useAuth();

  const clickHandler = () => {
    if (menubarActive) setMenubarActive((prev) => !prev);
  };

  return (
    <ul
      className={`list-style-none ${
        menubarActive ? "menubar menubarToggle" : "menubar"
      }`}
    >
      <li>
        <CustomNavLink
          activeClassName="gray-bg text-bold-weight"
          className="link menubar-items"
          inactiveClassName="gray-text"
          to={routes.VIDEO_LISTING_PAGE}
          clickHandler={clickHandler}
        >
          <span className="flex-row align-center">
            <AiOutlineVideoCamera className="xs-icon mr-0-25" /> Explore
          </span>
        </CustomNavLink>
      </li>
      <li>
        <CustomNavLink
          activeClassName="gray-bg text-bold-weight"
          className="link menubar-items"
          inactiveClassName="gray-text"
          to={token ? routes.PROFILE_PAGE : routes.LOGIN_PAGE}
          clickHandler={clickHandler}
        >
          <span className="flex-row align-center">
            <AiOutlineUser className="xs-icon mr-0-25" />
            {token ? "Profile" : "Login"}
          </span>
        </CustomNavLink>
      </li>
    </ul>
  );
};

Menubar.propTypes = {
  setMenubarActive: PropTypes.func,
  menubarActive: PropTypes.bool,
};

export { Menubar };
