import "./style.css";
import React from "react";
import PropTypes from "prop-types";
import { AiOutlineHome,  } from "react-icons/ai";
import { CustomNavLink } from "../index";
import { routes } from "../../constants";

const Menubar = ({ setMenubarActive, menubarActive }) => {

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
            <AiOutlineHome className="xs-icon mr-0-25" /> Home
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
