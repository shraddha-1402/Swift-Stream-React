import "./style.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineWatchLater, MdOutlineVideoLibrary } from "react-icons/md";
import { useData, useAuth } from "../../context";
import { VideoCard } from "../../components";
import { getRandomVideos } from "../../utils/";
import { addToHistoryHandler } from "../../utils/services";

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

  useEffect(() => {
    (async () => {
      const {data, status} = await axios.get(`/api/video/${videoId}`);
      if (status === 200) setCurrVideo(data.video);
      const isInHistory = history.find((curr) => curr._id === videoId);
      if (token && !isInHistory) addToHistoryHandler({video: data.video, token, dataDispatch});
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
              <button className="action-btns">
                <AiOutlineLike className="sm-icon mr-1 icon" />
              </button>

              <button className="action-btns">
                <MdOutlineWatchLater className="sm-icon mr-1 icon" />
              </button>
              <button className="action-btns">
                <MdOutlineVideoLibrary className="sm-icon icon" />
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
