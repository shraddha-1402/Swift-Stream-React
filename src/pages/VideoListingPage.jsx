import React, { useState } from "react";
import { useData } from "../context";
import { CategoryChip, VideoCard } from "../components/";
import { getCategoryFilteredVideos, getSearchFilteredVideos } from "../utils";

const VideoListingPage = () => {
  const {
    dataState: { videos, searchText },
  } = useData();
  const [filterCategory, setFilterCategory] = useState({ type: "All" });
  const searchedVideos = getSearchFilteredVideos({ searchText, videos });
  const filteredVideos = getCategoryFilteredVideos({
    category: filterCategory.type,
    videos: searchedVideos,
  });

  return (
    <div>
      <CategoryChip
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
      <h3 className="mb-1">Most Viewed Videos</h3>
      <div className="grid-layout">
        {filteredVideos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export { VideoListingPage };
