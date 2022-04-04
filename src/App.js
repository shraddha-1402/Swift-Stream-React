import "./App.css";
import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  VideoListingPage,
  SingleVideoPage,
  LoginPage,
  SignupPage,
  ProfilePage,
  HistoryPage,
  LikedVideosPage,
  PlaylistPage,
} from "./pages";
import { Menubar, Navbar } from "./components";
import { useAuth } from "./context";
import { routes } from "./constants";

function App() {
  const [menubarActive, setMenubarActive] = useState(false);
  const {
    authState: { token },
  } = useAuth();

  return (
    <div>
      <Navbar setMenubarActive={setMenubarActive} />
      <main className="flex-row">
        <Menubar
          setMenubarActive={setMenubarActive}
          menubarActive={menubarActive}
        />
        <div className="videos-container ">
          <Routes>
            <Route
              element={<VideoListingPage />}
              path={routes.VIDEO_LISTING_PAGE}
            />
            <Route
              element={<SingleVideoPage />}
              path={`${routes.VIDEO_LISTING_PAGE}/:videoId`}
            />
            <Route element={<LoginPage />} path={routes.LOGIN_PAGE} />
            <Route element={<SignupPage />} path={routes.SIGNUP_PAGE} />
            <Route
              element={
                token ? <ProfilePage /> : <Navigate to={routes.LOGIN_PAGE} />
              }
              path={routes.PROFILE_PAGE}
            />
            <Route
              element={
                token ? (
                  <LikedVideosPage />
                ) : (
                  <Navigate to={routes.LOGIN_PAGE} />
                )
              }
              path={routes.LIKED_VIDEOS_PAGE}
            />
            <Route
              element={
                token ? <PlaylistPage /> : <Navigate to={routes.LOGIN_PAGE} />
              }
              path={routes.PLAYLIST_PAGE}
            />
            <Route
              element={
                token ? <HistoryPage /> : <Navigate to={routes.LOGIN_PAGE} />
              }
              path={routes.HISTORY_PAGE}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
