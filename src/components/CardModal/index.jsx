import "./style.css";
import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useOnClickOutside } from "../../hooks";
import { deleteFromHistoryHandler } from "../../utils/services";
import { useAuth, useData, usePlaylist } from "../../context";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";

const CardModal = ({ video, setModalOpen, rest }) => {
  const { isInHistory } = Object.entries(rest).length > 0 ? rest : false;

  const ref = useRef();
  useOnClickOutside(ref, () => setModalOpen(false));
  const navigate = useNavigate();

  const { dataDispatch } = useData();
  const {
    authState: { token },
  } = useAuth();

  const { setSelectedVideo, setShowPlaylistModal } = usePlaylist();

  const handlePlaylistClick = () => {
    if (!token) navigate(routes.LOGIN_PAGE);
    else {
      setModalOpen(false);
      setSelectedVideo(video);
      setShowPlaylistModal(true);
    }
  };

  return (
    <ul ref={ref} className="list-style-none pos-abs card-modal">
      <li className="card-modal-item" onClick={() => setModalOpen(false)}>
        Add to Watch Later
      </li>
      <li className="card-modal-item" onClick={handlePlaylistClick}>
        Save to Playlist
      </li>
      {isInHistory && (
        <li
          className="card-modal-item red-text"
          onClick={() => {
            deleteFromHistoryHandler({
              token,
              videoId: video._id,
              dataDispatch,
            });
            setModalOpen(false);
          }}
        >
          Remove From History
        </li>
      )}
    </ul>
  );
};

CardModal.propTypes = {
  video: PropTypes.object,
  setModalOpen: PropTypes.func,
  rest: PropTypes.any,
};

export { CardModal };
