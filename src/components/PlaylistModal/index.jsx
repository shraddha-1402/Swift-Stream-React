import "./style.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData, useAuth, usePlaylist } from "../../context";
import { routes } from "../../constants";
import {
  addPlaylistHandler,
  addToPlaylistHandler,
  deleteFromPlaylistHandler,
} from "../../utils/services";
import { FaTimes } from "react-icons/fa";

const PlaylistModal = () => {
  const {
    setShowPlaylistModal,
    checkInPlaylist,
    selectedVideo,
  } = usePlaylist();
  const navigate = useNavigate();
  const {
    authState: { token },
  } = useAuth();
  const {
    dataState: { playlists },
    dataDispatch,
  } = useData();
  const [playlistName, setPlaylistName] = useState("");

  const handleAddPlaylist = async (e) => {
    e.preventDefault();
    if (!token) navigate(routes.LOGIN_PAGE);
    else addPlaylistHandler({ playlistName, token, dataDispatch });
    setPlaylistName("");
  };

  const handlePlaylistCheckbox = (event, playlist) => {
    if (event.target.checked)
      addToPlaylistHandler({ playlist, selectedVideo, token, dataDispatch });
    else
      deleteFromPlaylistHandler({
        playlist,
        selectedVideo,
        token,
        dataDispatch,
      });
  };

  return (
    <div className="playlist-modal">
      <FaTimes
        className="playlist-close"
        onClick={() => setShowPlaylistModal(false)}
      />
      <div className="playlist-display-box">
        {playlists.length ? (
          playlists.map((playlist) => {
            const { title, _id } = playlist;
            const inPlaylist = checkInPlaylist(playlist);
            return (
              <div className="my-0-5" key={_id}>
                <label htmlFor={_id}>
                  <input
                    className="mr-0-25"
                    type="checkbox"
                    checked={inPlaylist}
                    id={_id}
                    onChange={(event) =>
                      handlePlaylistCheckbox(event, playlist)
                    }
                  />
                  {title}
                </label>
              </div>
            );
          })
        ) : (
          <p className="sm-text mb-1">No Playlist Created</p>
        )}
      </div>
      <form onSubmit={handleAddPlaylist}>
        <input
          type="text"
          placeholder="Create Playlist"
          className="playlist-input"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          required
        />
        <button type="submit" className="create-btn btn-solid-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export { PlaylistModal };
