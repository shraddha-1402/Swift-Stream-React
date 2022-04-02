const getRandomVideos = (videos, n) => {
  return [...videos].sort(() => 0.5 - Math.random()).slice(0, n);
};

export { getRandomVideos };
