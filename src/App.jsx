import React from "react";
import MediaGallery from "./components/MediaGallery";

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
    {
      type: "image",
      url: "./src/assets/images/a3.jpg",
      caption: "ECED 1ST Draft",
    },
    {
      type: "image",
      url: "./src/assets/images/a4.jpg",
      caption: "ECED 1ST DRAFT",
    },
    {
      type: "image",
      url: "./src/assets/images/a5.jpg",
      caption: "Random Colourful People",
    },
  ];

  return <MediaGallery media={media} />;
};

export default App;
