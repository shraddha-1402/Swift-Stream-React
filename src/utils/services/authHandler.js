import axios from "axios";
import { actionType } from "../../constants";

const authHandler = async (credentials, authAction, authDispatch) => {
  try {
    const response = await axios.post(`/api/auth/${authAction.toLowerCase()}`, {
      ...credentials,
    });
    const data = {
      userInfo:
        authAction === "LOGIN"
          ? { ...response.data.foundUser }
          : { ...response.data.createdUser },
      token: response.data.encodedToken,
    };

    localStorage.setItem("data", JSON.stringify(data));
    if (response.status === 201 || response.status === 200)
      authDispatch({
        type: actionType.AUTH.USER_LOGIN,
        payload: data,
      });
    return {
      status: response.status,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export { authHandler };
