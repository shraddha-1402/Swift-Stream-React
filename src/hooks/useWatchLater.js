import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";
import { useAuth, useData } from "../context";
import { addToWatchlater, removeFromWatchlater } from "../utils/services";

const useWatchLater = (video) => {
  const [inWatchLater, setWatchLater] = useState(false);
  const {
    authState: { token },
  } = useAuth();
  const {
    dataState: { watchlater },
    dataDispatch,
  } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      if (watchlater.find((curr) => curr._id === video._id))
        setWatchLater(true);
      else setWatchLater(false);
    })();
  }, [video, watchlater]);

  const handleWatchLater = async () => {
    token
      ? inWatchLater
        ? removeFromWatchlater({ video, token, dataDispatch })
        : addToWatchlater({ video, token, dataDispatch })
      : navigate(routes.LOGIN_PAGE);
  };
  return { inWatchLater, handleWatchLater };
};

export { useWatchLater };
