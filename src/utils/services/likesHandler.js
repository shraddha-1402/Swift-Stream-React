import axios from "axios";
import { actionType } from "../../constants";

const likeVideoHandler = async (video, token, dataDispatch) => {
  try {
    console.log("like handler");
    const { data, status, statusText } = await axios.post(
      "/api/user/likes",
      {
        video,
      },
      {
        headers: { authorization: token },
      }
    );
    if (status === 201)
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
};

const dislikeVideoHandler = async (video, token, dataDispatch) => {
  try {
    const { data, status, statusText } = await axios.delete(
      `/api/user/likes/${video._id}`,
      {
        headers: { authorization: token },
      }
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
};

export { likeVideoHandler, dislikeVideoHandler };
