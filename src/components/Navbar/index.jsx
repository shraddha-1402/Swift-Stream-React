import "./style.css";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import { actionType, routes } from "../../constants";
import { useData } from "../../context";

const Navbar = ({ setMenubarActive }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { dataDispatch } = useData();

  const handleSearch = () => {
    if (pathname !== routes.VIDEO_LISTING_PAGE)
      navigate(routes.VIDEO_LISTING_PAGE);
    dataDispatch({
      type: actionType.DATA.SEARCH_VIDEOS,
      payload: searchText,
    });
  };

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
            autoComplete="off"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyUpCapture={handleSearch}
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
