import axios from "axios";
import { actionType } from "../../constants";

const addToHistory = async (video, token, dataDispatch) => {
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

const deleteFromHistory = async (token, videoId, dataDispatch) => {
  try {
    const { data, status, statusText } = await axios.delete(
      `/api/user/history/${videoId}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status === 200)
      dataDispatch({
        type: actionType.DATA.UPDATE_HISTORY,
        payload: data.history,
      });
    else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

const clearHistory = async (token, dataDispatch) => {
  try {
    const { data, status, statusText } = await axios.delete(
      "/api/user/history/all",
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status === 200)
      dataDispatch({
        type: actionType.DATA.UPDATE_HISTORY,
        payload: data.history,
      });
    else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

export { addToHistory, deleteFromHistory, clearHistory };
