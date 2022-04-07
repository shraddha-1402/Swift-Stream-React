const getSearchFilteredVideos = ({ searchText, videos }) => {
  if (searchText === "") return videos;
  return videos.filter(({ title }) =>
    title.toUpperCase().includes(searchText.toUpperCase())
  );
};

export { getSearchFilteredVideos };
