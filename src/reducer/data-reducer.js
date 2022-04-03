import { actionType } from "../constants";

const dataReducer = (state, action) => {
  const {
    DATA: { SET_VIDEOS, RESET_DATA },
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

    default:
      return state;
  }
};

export { dataReducer };
