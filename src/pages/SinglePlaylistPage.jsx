import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideoCard } from "../components";
import { routes } from "../constants";
import { useAuth, useData } from "../context";

const SinglePlaylistPage = () => {
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const {
    authState: { token },
  } = useAuth();

  const {
    dataState: { playlists },
  } = useData();

  const [currPlaylist, setCurrPlalist] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data, status, statusText } = await axios.get(
          `/api/user/playlists/${playlistId}`,
          {
            headers: { authorization: token },
          }
        );
        if (data.playlist === undefined) navigate(routes.PLAYLIST_PAGE);
        else if (status === 200) setCurrPlalist(data.playlist);
        else throw new Error(statusText);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [playlistId, playlists]);

  return (
    <div>
      {!!Object.entries(currPlaylist).length && (
        <>
          <h3>
            {currPlaylist.title} ( {currPlaylist.videos.length} )
          </h3>
          <div className="grid-layout">
            {currPlaylist.videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export { SinglePlaylistPage };
