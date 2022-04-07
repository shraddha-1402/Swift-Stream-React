import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { VideoCard } from "../components";
import { useAuth, useData } from "../context";
import { routes } from "../constants";
import { getLikedVideosHandler } from "../utils/services";

const LikedVideosPage = () => {
  const {
    dataState: { likes },
    dataDispatch,
  } = useData();

  const {
    authState: { token },
  } = useAuth();

  useEffect(() => {
    getLikedVideosHandler(token, dataDispatch);
  }, []);

  return (
    <div>
      {likes?.length ? (
        <>
          <h3 className="mb-1">Liked Videos ( {likes.length} )</h3>
          <div className="grid-layout">
            {likes.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </>
      ) : (
        <p className="center-text my-3-5">
          No Liked Videos Yet
          <Link to={routes.VIDEO_LISTING_PAGE} className="link">
            <span className="primary-text"> Continue Watching </span>
          </Link>
        </p>
      )}
    </div>
  );
};

export { LikedVideosPage };
