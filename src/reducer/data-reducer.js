import { actionType } from "../constants";

const dataReducer = (state, action) => {
  const {
    DATA: { SET_VIDEOS, RESET_DATA, UPDATE_HISTORY, UPDATE_LIKES },
  } = actionType;
  switch (action.type) {
    case SET_VIDEOS:
      return {
        ...state,
        videos: action.payload,
      };
    case RESET_DATA:
      return {
        ...state,
        history: [],
        watchlater: [],
        likes: [],
      };

    case UPDATE_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        likes: action.payload.likes,
      };

    default:
      return state;
  }
};

export { dataReducer };
