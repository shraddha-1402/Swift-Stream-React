import { actionType } from "../constants";

const authReducer = (state, action) => {
  switch (action.type) {
    case actionType.AUTH.USER_LOGIN:
      return {
        token: action.payload.token,
        userInfo: action.payload.userInfo,
      };
    case actionType.AUTH.USER_LOGOUT:
      localStorage.clear();
      return {
        token: null,
        userInfo: {},
      };
    default:
      break;
  }
};

export { authReducer };
