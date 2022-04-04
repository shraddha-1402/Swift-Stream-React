import axios from "axios";
import { actionType } from "../../constants";

const getAllWatchLaterVideos = async ({ token, dataDispatch }) => {
  try {
    const { data, status, statusText } = await axios.get(
      "/api/user/watchlater",
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status === 200)
      dataDispatch({
        type: actionType.DATA.UPDATE_WATCH_LATER,
        payload: {
          watchlater: data.watchlater,
        },
      });
    else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

const addToWatchlater = async ({ token, video, dataDispatch }) => {
  try {
    const { data, status, statusText } = await axios.post(
      "/api/user/watchlater",
      {
        video,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status === 201)
      dataDispatch({
        type: actionType.DATA.UPDATE_WATCH_LATER,
        payload: {
          watchlater: data.watchlater,
        },
      });
    else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

const removeFromWatchlater = async ({ token, video, dataDispatch }) => {
  try {
    const { data, status, statusText } = await axios.delete(
      `/api/user/watchlater/${video._id}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status === 200)
      dataDispatch({
        type: actionType.DATA.UPDATE_WATCH_LATER,
        payload: {
          watchlater: data.watchlater,
        },
      });
    else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

export { getAllWatchLaterVideos, addToWatchlater, removeFromWatchlater };
