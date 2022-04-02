const getCategoryFilteredVideos = (category, videos) => {
  if (category === "All") return [...videos];
  return videos.reduce((acc, curr) => {
    if (curr.category === category) return [...acc, curr];
    return [...acc];
  }, []);
};

export { getCategoryFilteredVideos };
