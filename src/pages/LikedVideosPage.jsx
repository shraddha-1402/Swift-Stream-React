import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { VideoCard } from "../components";
import { useAuth, useData } from "../context";
import { actionType, routes } from "../constants";
import axios from "axios";

const LikedVideosPage = () => {
  const {
    dataState: { likes },
    dataDispatch,
  } = useData();

  const {
    authState: { token },
  } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const { data, status, statusText } = await axios.get(
          "/api/user/likes",
          { headers: { authorization: token } }
        );
        if (status === 200)
          dataDispatch({
            type: actionType.DATA.UPDATE_LIKES,
            payload: {
              likes: data.likes,
            },
          });
        else throw new Error(statusText);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      {likes.length ? (
        <>
          <h3 className="mb-1">Liked Videos</h3>
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
