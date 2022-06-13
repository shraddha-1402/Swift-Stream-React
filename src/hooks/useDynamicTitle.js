import { useLocation } from "react-router-dom";

const useDynamicTitle = () => {
  const { pathname } = useLocation();
  if (pathname !== "/")
    document.title = `SS | ${pathname
      .split("/")[1]
      .split("-")[0]
      .toUpperCase()}`;
  else document.title = "SS | HOME";
  return { pathname };
};

export { useDynamicTitle };
