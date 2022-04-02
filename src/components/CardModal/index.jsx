import "./style.css";
import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useOnClickOutside } from "../../hooks";

const CardModal = ({ setModalOpen }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setModalOpen(false));

  return (
    <ul ref={ref} className="list-style-none pos-abs card-modal">
      <li
        className="card-modal-item"
        onClick={() => setModalOpen(false)}
      >
        Add to Watch Later
      </li>
      <li className="card-modal-item" onClick={() => setModalOpen(false)}>
        Save to Playlist
      </li>
    </ul>
  );
};

CardModal.propTypes = {
  video: PropTypes.object,
  setModalOpen: PropTypes.func,
};

export { CardModal };
