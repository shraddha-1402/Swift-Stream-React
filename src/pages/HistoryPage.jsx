import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { VideoCard } from "../components";
import { routes } from "../constants";
import { useAuth, useData } from "../context";
import {
  clearHistoryHandler,
  getAllHistoryVideosHandler,
} from "../utils/services";

const HistoryPage = () => {
  const {
    dataState: { history },
    dataDispatch,
  } = useData();

  const {
    authState: { token },
  } = useAuth();

  useEffect(() => {
    getAllHistoryVideosHandler({ token, dataDispatch });
  }, []);

  return (
    <div>
      {history.length ? (
        <>
          <div className="flex-row justify-spc-bet align-center mb-1">
            <h3>Recenty Viewed</h3>
            <button
              className="btn btn-solid-danger sm-btn"
              onClick={() => clearHistoryHandler({ token, dataDispatch })}
            >
              Clear
            </button>
          </div>
          <div className="grid-layout">
            {history?.map((video) => (
              <VideoCard key={video._id} video={video} isInHistory={true} />
            ))}
          </div>
        </>
      ) : (
        <p className="center-text my-3-5">
          History is empty.
          <Link to={routes.VIDEO_LISTING_PAGE} className="link">
            <span className="primary-text"> Continue Watching </span>
          </Link>
        </p>
      )}
    </div>
  );
};

export { HistoryPage };
