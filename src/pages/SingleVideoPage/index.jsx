import "./style.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { MdOutlineWatchLater, MdOutlineVideoLibrary } from "react-icons/md";
import { useData, useAuth } from "../../context";
import { VideoCard } from "../../components";
import { getRandomVideos } from "../../utils/";
import { addToHistory } from "../../utils/services";
import { useLikeVideos } from "../../hooks";

const SingleVideoPage = () => {
  const { videoId } = useParams();
  const {
    dataState: { videos, history },
    dataDispatch,
  } = useData();
  const {
    authState: { token },
  } = useAuth();

  const [currVideo, setCurrVideo] = useState({});
  const [btnState, setBtnState] = useState({
    like: false,
  });
  const { isLiked, handlelikes } = useLikeVideos(currVideo);
  const handleLikeBtnClick = () => {
    setBtnState((prev) => ({
      like: !prev.like,
    }));
    handlelikes();
    setBtnState((prev) => ({
      like: !prev.like,
    }));
  };

  useEffect(() => {
    (async () => {
      const { data, status } = await axios.get(`/api/video/${videoId}`);
      if (status === 200) setCurrVideo(data.video);
      const isInHistory = history.find((curr) => curr._id === videoId);
      if (token && !isInHistory) addToHistory(data.video, token, dataDispatch);
    })();

    return () => setCurrVideo({});
  }, [videoId]);

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

              <button className="action-btns mr-1">
                <MdOutlineWatchLater className="sm-icon " />
              </button>
              <button className="action-btns">
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
