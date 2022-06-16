import axios from "axios";
import { toast } from "react-toastify";
import { actionType } from "../../constants";

const getAllPlaylistHandler = async ({ token, dataDispatch }) => {
  try {
    const { data, status, statusText } = await axios.get(
      "/api/user/playlists",
      {
        headers: { authorization: token },
      }
    );
    if (status === 200)
      dataDispatch({
        type: actionType.DATA.UPDATE_PLAYLISTS,
        payload: data.playlists,
      });
    else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

const addPlaylistHandler = async ({ playlistName, token, dataDispatch }) => {
  try {
    const { data, status, statusText } = await axios.post(
      "/api/user/playlists",
      {
        playlist: { title: playlistName },
      },
      {
        headers: { authorization: token },
      }
    );
    if (status === 201)
      dataDispatch({
        type: actionType.DATA.UPDATE_PLAYLISTS,
        payload: data.playlists,
      });
    else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

const deletePlaylistHandler = async ({ playlist, token, dataDispatch }) => {
  try {
    const { data, status, statusText } = await axios.delete(
      `/api/user/playlists/${playlist._id}`,
      {
        headers: { authorization: token },
      }
    );
    if (status === 200)
      dataDispatch({
        type: actionType.DATA.UPDATE_PLAYLISTS,
        payload: data.playlists,
      });
    else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

const addToPlaylistHandler = async ({
  selectedVideo,
  playlist,
  token,
  dataDispatch,
}) => {
  try {
    const { data, status, statusText } = await axios.post(
      `/api/user/playlists/${playlist._id}`,
      { video: selectedVideo },
      { headers: { authorization: token } }
    );
    if (status === 201) {
      dataDispatch({
        type: actionType.DATA.UPDATE_PLAYLIST_VIDEOS,
        payload: data.playlist,
      });
      toast.success(`Video added to ${playlist.title} playlist`);
    } else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

const deleteFromPlaylistHandler = async ({
  selectedVideo,
  playlist,
  token,
  dataDispatch,
}) => {
  try {
    const { data, status, statusText } = await axios.delete(
      `/api/user/playlists/${playlist._id}/${selectedVideo._id}`,
      {
        headers: { authorization: token },
      }
    );
    if (status === 200)
      dataDispatch({
        type: actionType.DATA.UPDATE_PLAYLIST_VIDEOS,
        payload: data.playlist,
      });
    else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllPlaylistHandler,
  addPlaylistHandler,
  deletePlaylistHandler,
  addToPlaylistHandler,
  deleteFromPlaylistHandler,
};
