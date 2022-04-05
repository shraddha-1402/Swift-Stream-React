import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const PlaylistContext = createContext();

const usePlaylist = () => useContext(PlaylistContext);

const PlaylistProvider = ({ children }) => {
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({});

  const checkInPlaylist = (playlist) => {
    return Boolean(
      playlist.videos.find((curr) => curr._id === selectedVideo._id)
    );
  };

  return (
    <PlaylistContext.Provider
      value={{
        setShowPlaylistModal,
        setSelectedVideo,
        selectedVideo,
        showPlaylistModal,
        checkInPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

PlaylistProvider.propTypes = {
  children: PropTypes.any,
};

export { usePlaylist, PlaylistProvider };
