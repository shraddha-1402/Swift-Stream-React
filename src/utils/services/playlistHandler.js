import axios from "axios";
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

export { getAllPlaylistHandler, deletePlaylistHandler };
