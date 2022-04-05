import { actionType } from "../constants";

const dataReducer = (state, action) => {
  const {
    DATA: {
      SET_VIDEOS,
      RESET_DATA,
      UPDATE_HISTORY,
      UPDATE_LIKES,
      UPDATE_PLAYLISTS,
      UPDATE_PLAYLIST_VIDEOS,
      UPDATE_WATCH_LATER,
    },
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

    case UPDATE_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        likes: action.payload.likes,
      };
    case UPDATE_PLAYLISTS: {
      return {
        ...state,
        playlists: action.payload,
      };
    }
    case UPDATE_PLAYLIST_VIDEOS:
      return {
        ...state,
        playlists: state.playlists.map((playlist) =>
          playlist._id === action.payload._id ? action.payload : playlist
        ),
      };
    case UPDATE_WATCH_LATER:
      return {
        ...state,
        watchlater: action.payload.watchlater,
      };

    default:
      return state;
  }
};

export { dataReducer };
