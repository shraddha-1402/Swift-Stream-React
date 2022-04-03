import axios from "axios";
import { actionType, routes } from "../../constants";

const loginHandler = async (credentials, authDispatch, navigate) => {
  try {
    const { data, status, statusText } = await axios.post("/api/auth/login", {
      ...credentials,
    });
    const userData = {
      userInfo: data.foundUser,
      token: data.encodedToken,
    };

    localStorage.setItem("data", JSON.stringify(userData));
    if (status === 200) {
      authDispatch({
        type: actionType.AUTH.USER_LOGIN,
        payload: userData,
      });
      navigate(routes.VIDEO_LISTING_PAGE);
    } else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

const signupHandler = async (credentials, authDispatch, navigate) => {
  try {
    const { data, status, statusText } = await axios.post("/api/auth/signup", {
      ...credentials,
    });
    const userData = {
      userInfo: data.createdUser,
      token: data.encodedToken,
    };

    localStorage.setItem("data", JSON.stringify(userData));
    if (status === 201) {
      authDispatch({
        type: actionType.AUTH.USER_LOGIN,
        payload: userData,
      });
      navigate(routes.VIDEO_LISTING_PAGE);
    } else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

export { loginHandler, signupHandler };