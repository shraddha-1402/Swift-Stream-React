import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { VideoListingPage } from "./pages";
import { Menubar, Navbar } from "./components";
import { routes } from "./constants";

function App() {
  const [menubarActive, setMenubarActive] = useState(false);

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
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
