import "./style.css";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import { routes } from "../../constants";

const Navbar = ({ setMenubarActive }) => {
  return (
    <nav className="pos-sticky-t0 z-1">
      <div className="nav justify-spc-bet pos-rel">
        <div className="flex-row align-center">
          <FaBars
            className="mr-0-5 nav-hamburger"
            onClick={() => setMenubarActive((prev) => !prev)}
          />
          <Link
            className="link flex-row align-center"
            to={routes.VIDEO_LISTING_PAGE}
          >
            <h1 className="nav-heading primary-text">Swift Stream</h1>
          </Link>
        </div>

        <div className="nav-search-bar">
          <input
            type="search"
            name="search"
            id="search-videos"
            className="nav-search-input"
            placeholder="search videos"
          />
          <button className="nav-search-btn">
            <FaSearch />
          </button>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  setMenubarActive: PropTypes.func,
};

export { Navbar };
