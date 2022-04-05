import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { dataReducer } from "../reducer";
import { actionType } from "../constants";

const DataContext = createContext();
const useData = () => useContext(DataContext);

const userData = JSON.parse(localStorage.getItem("data"));
const defaultDataState = {
  videos: [],
  history: userData ? userData.userInfo.history : [],
  watchlater: userData ? userData.userInfo.watchlater : [],
  likes: userData ? userData.userInfo.likes : [],
  playlists: userData ? userData.userInfo.playlists : [],
};

const DataProvider = ({ children }) => {
  const [dataState, dataDispatch] = useReducer(dataReducer, defaultDataState);
  useEffect(async () => {
    const res = await axios.get("/api/videos");
    if (res.status === 200)
      dataDispatch({
        type: actionType.DATA.SET_VIDEOS,
        payload: res.data.videos,
      });
  }, []);

  return (
    <DataContext.Provider value={{ dataState, dataDispatch }}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.any,
};

export { useData, DataProvider };
