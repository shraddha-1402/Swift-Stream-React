import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { VideoCard } from "../components";
import { useAuth, useData } from "../context";
import { routes } from "../constants";
import { getAllWatchLaterVideos } from "../utils/services";

const WatchlaterPage = () => {
  const {
    dataState: { watchlater },
    dataDispatch,
  } = useData();

  const {
    authState: { token },
  } = useAuth();

  useEffect(() => {
    getAllWatchLaterVideos({ token, dataDispatch });
  });

  return (
    <div>
      {watchlater.length ? (
        <>
          <h3 className="mb-1">
            Your Watch Later List ( {watchlater.length} )
          </h3>
          <div className="grid-layout">
            {watchlater.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </>
      ) : (
        <p className="center-text my-3-5">
          No videos in Watch Later.
          <Link to={routes.VIDEO_LISTING_PAGE} className="link">
            <span className="primary-text"> Continue Watching </span>
          </Link>
        </p>
      )}
    </div>
  );
};

export { WatchlaterPage };
