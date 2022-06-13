import React from "react";
import { useNavigate } from "react-router-dom";
import { actionType, routes } from "../constants";
import { useAuth, useData } from "../context";
import { useDynamicTitle } from "../hooks";

const ProfilePage = () => {
  useDynamicTitle();
  const {
    authState: { userInfo },
    authDispatch,
  } = useAuth();
  const { firstName, lastName, email } = userInfo;
  const { dataDispatch } = useData();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    authDispatch({ type: actionType.AUTH.USER_LOGOUT });
    dataDispatch({ type: actionType.DATA.RESET_DATA });
    navigate(routes.VIDEO_LISTING_PAGE);
  };

  return (
    <div>
      <h2>Profile</h2>
      <main className="flex-row align-start gap-2 my-2">
        <div className="md-avatar txt-avatar round-avatar">
          {firstName[0].toUpperCase()}
          {lastName[0].toUpperCase()}
        </div>
        <div>
          <h3>
            {firstName} {lastName}
          </h3>
          <p> {email} </p>
          <button
            className="btn btn-solid-danger my-1 sm-btn"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export { ProfilePage };
