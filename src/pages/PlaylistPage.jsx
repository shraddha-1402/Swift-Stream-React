import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { routes } from "../constants";
import { useAuth, useData } from "../context";
import { PlaylistCard } from "../components";
import { getAllPlaylistHandler } from "../utils/services/";

const PlaylistPage = () => {
  const {
    dataState: { playlists },
    dataDispatch,
  } = useData();

  const {
    authState: { token },
  } = useAuth();

  useEffect(() => {
    getAllPlaylistHandler({ token, dataDispatch });
  }, []);

  return (
    <div>
      {playlists?.length ? (
        <>
          <h3 className="mb-1">Your Playlists ( {playlists.length} ) </h3>
          <div className="grid-layout">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist._id} playlist={playlist} />
            ))}
          </div>
        </>
      ) : (
        <p className="center-text my-3-5">
          No Playlists Created.
          <Link to={routes.VIDEO_LISTING_PAGE} className="link">
            <span className="primary-text"> Continue Watching </span>
          </Link>
        </p>
      )}
    </div>
  );
};

export { PlaylistPage };
