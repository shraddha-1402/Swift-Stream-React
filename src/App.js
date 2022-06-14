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
  SinglePlaylistPage,
  WatchlaterPage,
  PageNotFound,
} from "./pages";
import { Menubar, Navbar, PlaylistModal, PrivateRoute } from "./components";
import { usePlaylist } from "./context";
import { routes } from "./constants";

function App() {
  const [menubarActive, setMenubarActive] = useState(false);

  const { showPlaylistModal } = usePlaylist();

  return (
    <div>
      <Navbar setMenubarActive={setMenubarActive} />
      {!!showPlaylistModal && (
        <div className="playlist-overlay">
          <PlaylistModal />
        </div>
      )}
      <main className="flex-row">
        <Menubar
          setMenubarActive={setMenubarActive}
          menubarActive={menubarActive}
        />
        <div className="videos-container ">
          <Routes>
            <Route
              path="/"
              element={<Navigate to={routes.VIDEO_LISTING_PAGE} />}
            />
            <Route
              element={<VideoListingPage />}
              path={routes.VIDEO_LISTING_PAGE}
            />
            <Route
              element={<SingleVideoPage />}
              path={`${routes.VIDEO_LISTING_PAGE}/:videoId`}
            />

            <Route element={<PrivateRoute authRoute={true} />}>
              <Route element={<LoginPage />} path={routes.LOGIN_PAGE} />
              <Route element={<SignupPage />} path={routes.SIGNUP_PAGE} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route element={<ProfilePage />} path={routes.PROFILE_PAGE} />
              <Route
                element={<LikedVideosPage />}
                path={routes.LIKED_VIDEOS_PAGE}
              />

              <Route
                element={<WatchlaterPage />}
                path={routes.WATCHLATER_PAGE}
              />

              <Route element={<PlaylistPage />} path={routes.PLAYLIST_PAGE} />
              <Route
                element={<SinglePlaylistPage />}
                path={`${routes.PLAYLIST_PAGE}/:playlistId`}
              />
              <Route element={<HistoryPage />} path={routes.HISTORY_PAGE} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
