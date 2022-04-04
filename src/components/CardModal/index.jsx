import "./style.css";
import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useOnClickOutside } from "../../hooks";
import { deleteFromHistory } from "../../utils/services";
import { useAuth, useData } from "../../context";

const CardModal = ({ video, setModalOpen, rest }) => {
  const { isInHistory } =
    Object.entries(rest).length > 0 ? rest : false;
    
  const ref = useRef();
  useOnClickOutside(ref, () => setModalOpen(false));

  const { dataDispatch } = useData();
  const {
    authState: { token },
  } = useAuth();

  return (
    <ul ref={ref} className="list-style-none pos-abs card-modal">
      <li className="card-modal-item" onClick={() => setModalOpen(false)}>
        Add to Watch Later
      </li>
      <li className="card-modal-item" onClick={() => setModalOpen(false)}>
        Save to Playlist
      </li>
      {isInHistory && (
        <li
          className="card-modal-item red-text"
          onClick={() => {
            deleteFromHistory({token, videoId:video._id, dataDispatch});
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
