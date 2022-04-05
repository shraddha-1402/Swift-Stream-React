import React, { useState } from "react";
import { useData } from "../context";
import { CategoryChip, VideoCard } from "../components/";
import { getCategoryFilteredVideos } from "../utils";

const VideoListingPage = () => {
  const {
    dataState: { videos },
  } = useData();
  const [filterCategory, setFilterCategory] = useState({ type: "All" });

  const filteredVideos = getCategoryFilteredVideos(filterCategory.type, videos);
  console.log(filteredVideos);

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
