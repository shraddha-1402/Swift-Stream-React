import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";
import { useDynamicTitle } from "../hooks";

const PageNotFound = () => {
  useDynamicTitle();
  const navigate = useNavigate();
  return (
    <div className="p-1 flex-col align-center gap-1 mx-auto my-3-5">
      <h2>404 Page Not Found</h2>
      <p>Oops! The page you are looking for does not exists</p>
      <button
        className="btn btn-solid-primary"
        onClick={() => navigate(routes.VIDEO_LISTING_PAGE)}
      >
        Back To Explore
      </button>
    </div>
  );
};

export { PageNotFound };
