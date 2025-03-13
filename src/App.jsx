import React from "react";
import MediaGallery from "./components/Gallery/MediaGallery";

const App = () => {
  const media = [
    {
      type: "image",
      url: "./src/assets/images/a1.jpg",
      caption: "PP",
    },
    {
      type: "video",
      url: "./src/assets/videos/v1.mp4",
      thumbnail: "./src/assets/thumbnails/t1.jpg",
      caption: "Dd",
    },
    {
      type: "image",
      url: "./src/assets/images/a2.jpg",
      caption: "Bhoot",
    },

  ];

  return <MediaGallery media={media} />;
};

export default App;
