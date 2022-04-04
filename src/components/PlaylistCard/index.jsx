import "./style.css";
import React from "react";
import PropTypes from "prop-types";
import { MdPlayArrow, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { deletePlaylistHandler } from "../../utils/services";
import { useData, useAuth } from "../../context";

const PlaylistCard = ({ playlist }) => {
  const { _id, title, videos } = playlist;
  const navigate = useNavigate();
  const { dataDispatch } = useData();
  const {
    authState: { token },
  } = useAuth();
  return (
    <div className="card mw-16r pos-rel">
      <button
        className="playlist-delete"
        onClick={() => deletePlaylistHandler({ playlist, token, dataDispatch })}
      >
        <MdDelete className="xs-icon" />
      </button>
      <img
        src={videos.length ? videos[0].thumbnail : "/no-video-thumbnail.png"}
        className="responsive-img thumbnail"
        alt="video-thumbnail"
      />
      <div
        className="playlist-info"
        onClick={() =>
          videos.length && navigate(`${routes.PLAYLIST_PAGE}/${_id}`)
        }
      >
        <MdPlayArrow className="sm-icon" />
        <p className="playlist-title">
          {title.toUpperCase()} ({videos.length})
        </p>
      </div>
    </div>
  );
};

PlaylistCard.propTypes = {
  playlist: PropTypes.object,
  handleDeletePlaylistClick: PropTypes.func,
};

export { PlaylistCard };
