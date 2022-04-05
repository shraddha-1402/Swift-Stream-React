import "./style.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import {
  MdOutlineWatchLater,
  MdWatchLater,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { VideoCard } from "../../components";
import { getRandomVideos } from "../../utils/";
import { useLikeVideos, useWatchLater } from "../../hooks";
import { addToHistoryHandler } from "../../utils/services";
import { useData, useAuth, usePlaylist } from "../../context";
import { routes } from "../../constants";

const SingleVideoPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const {
    dataState: { videos, history },
    dataDispatch,
  } = useData();
  const {
    authState: { token },
  } = useAuth();
  const { setShowPlaylistModal, setSelectedVideo } = usePlaylist();

  const [currVideo, setCurrVideo] = useState({});
  const [btnState, setBtnState] = useState({
    like: false,
    watchlater: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, status, statusText } = await axios.get(
          `/api/video/${videoId}`
        );
        if (status === 200) {
          setCurrVideo(data.video);
          const isInHistory = history.find((curr) => curr._id === videoId);
          if (token && !isInHistory)
            addToHistoryHandler({ video: data.video, token, dataDispatch });
        } else throw new Error(statusText);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => setCurrVideo({});
  }, [videoId]);

  const { isLiked, handlelikes } = useLikeVideos(currVideo);
  const { inWatchLater, handleWatchLater } = useWatchLater(currVideo);

  const handleLikeBtnClick = () => {
    setBtnState((prev) => ({
      ...prev,
      like: !prev.like,
    }));
    handlelikes();
    setBtnState((prev) => ({
      ...prev,
      like: !prev.like,
    }));
  };

  const handlePlaylistBtnClick = () => {
    if (!token) navigate(routes.LOGIN_PAGE);
    else {
      setSelectedVideo(currVideo);
      setShowPlaylistModal(true);
    }
  };

  const handleWatchLaterBtnClick = () => {
    setBtnState((prev) => ({
      ...prev,
      watchlater: !prev.watchlater,
    }));
    handleWatchLater();
    setBtnState((prev) => ({
      ...prev,
      watchlater: !prev.watchlater,
    }));
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="w-100p">
          <iframe
            src={`https://www.youtube.com/embed/${currVideo?._id}`}
            className="single-video"
          />
          <h3 className="my-0-5"> {currVideo?.title} </h3>
          <div className="video-details-wrapper">
            <div className="gray-text"> 4 months ago | 13M views </div>

            <div>
              <button
                className="action-btns mr-1"
                disabled={btnState.like}
                onClick={handleLikeBtnClick}
              >
                {isLiked ? (
                  <AiFillLike className="sm-icon red-text" />
                ) : (
                  <AiOutlineLike className="sm-icon" />
                )}
              </button>

              <button
                className="action-btns mr-1"
                disabled={btnState.watchlater}
                onClick={handleWatchLaterBtnClick}
              >
                {inWatchLater ? (
                  <MdWatchLater className="sm-icon" />
                ) : (
                  <MdOutlineWatchLater className="sm-icon" />
                )}
              </button>
              <button className="action-btns" onClick={handlePlaylistBtnClick}>
                <MdOutlineVideoLibrary className="sm-icon " />
              </button>
            </div>
          </div>
          <p className="my-1">{currVideo?.description}</p>
        </div>
        <div className="other-videos-wrapper">
          <h3>Other Videos</h3>
          {getRandomVideos(videos, 4).map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </>
  );
};

export { SingleVideoPage };
