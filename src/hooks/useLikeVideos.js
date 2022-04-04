import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";
import { useAuth, useData } from "../context";
import { dislikeVideoHandler, likeVideoHandler } from "../utils/services";

const useLikeVideos = (video) => {
  const [isLiked, setLiked] = useState(false);
  const {
    authState: { token },
  } = useAuth();
  const {
    dataState: { likes },
    dataDispatch,
  } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      if (likes.find((curr) => curr._id === video._id)) setLiked(true);
      else setLiked(false);
    })();
  }, [video, likes]);

  const handlelikes = () => {
    token
      ? isLiked
        ? dislikeVideoHandler(video, token, dataDispatch)
        : likeVideoHandler(video, token, dataDispatch)
      : navigate(routes.LOGIN_PAGE);
  };
  return { isLiked, handlelikes };
};

export { useLikeVideos };
