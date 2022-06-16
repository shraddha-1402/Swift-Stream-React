import axios from "axios";
import { toast } from "react-toastify";
import { actionType } from "../../constants";

const getAllHistoryVideosHandler = async ({ token, dataDispatch }) => {
  try {
    const { data, status, statusText } = await axios.get("/api/user/history", {
      headers: { authorization: token },
    });
    if (status === 200)
      dataDispatch({
        type: actionType.DATA.ADD_TO_HISTORY,
        payload: data.history,
      });
    else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

const addToHistoryHandler = async ({ video, token, dataDispatch }) => {
  try {
    const { data, status, statusText } = await axios.post(
      "/api/user/history",
      {
        video,
      },
      {
        headers: { authorization: token },
      }
    );
    if (status === 201)
      dataDispatch({
        type: actionType.DATA.UPDATE_HISTORY,
        payload: data.history,
      });
    else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

const deleteFromHistoryHandler = async ({ token, videoId, dataDispatch }) => {
  try {
    const { data, status, statusText } = await axios.delete(
      `/api/user/history/${videoId}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status === 200) {
      dataDispatch({
        type: actionType.DATA.UPDATE_HISTORY,
        payload: data.history,
      });
      toast.success("Video removed from history");
    } else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

const clearHistoryHandler = async ({ token, dataDispatch }) => {
  try {
    const { data, status, statusText } = await axios.delete(
      "/api/user/history/all",
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status === 200) {
      dataDispatch({
        type: actionType.DATA.UPDATE_HISTORY,
        payload: data.history,
      });
      toast.success("History Cleared");
    } else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllHistoryVideosHandler,
  addToHistoryHandler,
  deleteFromHistoryHandler,
  clearHistoryHandler,
};
