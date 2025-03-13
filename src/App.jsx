import React from "react";
import MediaGallery from "./components/MediaGallery";

const App = () => {
  const media = [
    {
      type: "image",
      url: "./src/assets/images/a1.jpg",
      caption: "E1 ECE Main Event",
    },
    {
      type: "video",
      url: "./src/assets/videos/v1.mp4",
      thumbnail: "./src/assets/thumbnails/t1.jpg",
      caption: "Dance Performance",
    },
    {
      type: "image",
      url: "./src/assets/images/a2.jpg",
      caption: "Color Fight",
    },
    {
      type: "video",
      url: "./src/assets/videos/v2.mp4",
      thumbnail: "./src/assets/thumbnails/t2.jpg",
      caption: "DJ Night",
    },
  ];

  return <MediaGallery media={media} />;
};

export default App;
