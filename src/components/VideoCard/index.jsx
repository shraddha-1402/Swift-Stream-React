import "./style.css";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { CardModal } from "../CardModal";
import { routes } from "../../constants";

const VideoCard = ({ video, ...rest }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { _id, thumbnail, title, creator, views, postedOn } = video;
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`${routes.VIDEO_LISTING_PAGE}/${_id}`);
  };

  return (
    <div className="card mw-16r">
      <img
        src={thumbnail}
        className="responsive-img curr-pointer"
        onClick={handleVideoClick}
        alt="video-thumbnail"
      />
      <div className="p-0-5">
        <div className="flex-row justify-spc-bet">
          <p className="text-ellipsis">{title}</p>
          <span className="ml-0-5 icon pos-rel">
            <FaEllipsisV onClick={() => setModalOpen(true)} />
            {isModalOpen && (
              <CardModal
                setModalOpen={setModalOpen}
                video = {video}
                rest={rest}
              />
            )}
          </span>
        </div>
        <p className="sm-text gray-text text-ellipsis">
          {creator} | {views} views | {postedOn} months ago
        </p>
      </div>
    </div>
  );
};

VideoCard.propTypes = {
  video: PropTypes.object,
};

export { VideoCard };
