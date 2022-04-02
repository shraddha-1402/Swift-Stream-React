import { actionType } from "../constants";

const dataReducer = (state, action) => {
  const {
    DATA: { SET_VIDEOS },
  } = actionType;
  switch (action.type) {
    case SET_VIDEOS: {
      return {
        ...state,
        videos: action.payload,
      };
    }
    default:
      return state;
  }
};

export { dataReducer };
