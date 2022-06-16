import axios from "axios";
import { toast } from "react-toastify";
import { actionType } from "../../constants";

const loginHandler = async (credentials, authDispatch) => {
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
      toast.success("Successfully logged in");
    } else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

const signupHandler = async (credentials, authDispatch) => {
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
      toast.success("Successfully signed up");
    } else throw new Error(statusText);
  } catch (error) {
    console.log(error);
  }
};

export { loginHandler, signupHandler };
