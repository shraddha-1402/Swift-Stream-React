const categories = [
  "All",
  "Music Videos",
  "Lyric Videos",
  "Bloopers",
  "Live Performances",
];

const actionType = {
  DATA: {
    SET_VIDEOS: "SET_VIDEOS",
    RESET_DATA: "RESET_DATA",
    UPDATE_HISTORY: "UPDATE_HISTORY",
    UPDATE_LIKES: "UPDATE_LIKES",
    UPDATE_WATCH_LATER: "UPDATE_WATCH_LATER",
  },
  AUTH: {
    USER_LOGIN: "USER_LOGIN",
    USER_LOGOUT: "USER_LOGOUT",
  },
};

const routes = {
  VIDEO_LISTING_PAGE: "/videos",
  PROFILE_PAGE: "/profile-page",
  LOGIN_PAGE: "/login-page",
  SIGNUP_PAGE: "/signup-page",
  HISTORY_PAGE: "/history-page",
  LIKED_VIDEOS_PAGE: "/liked-videos/page",
  WATCHLATER_PAGE: "/watchlater-page",
};

const testCredentials = {
  email: "test@gmail.com",
  password: "test123",
};

export { categories, actionType, routes, testCredentials };
