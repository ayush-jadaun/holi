import React, { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";

const VideoThumbnail = memo(({ item, index, openMedia, setRef }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        if (video.paused) {
          await video.play();
        }
      } catch (error) {
        console.warn("Autoplay prevented:", error);
      }
    };

    video.addEventListener("loadedmetadata", playVideo);
    return () => video.removeEventListener("loadedmetadata", playVideo);
  }, []);

  return (
    <div className="relative w-full h-full">
      <video
        ref={(el) => {
          videoRef.current = el;
          setRef(index, el);
          if (el) el.load(); // ✅ Force reload
        }}
        src={item.url}
        className="w-full h-full object-cover"
        playsInline
        autoPlay
        muted
        loop
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="p-4 bg-white/20 backdrop-blur-sm rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            openMedia(item, index);
          }}
        >
          <FiPlay size={32} className="text-white" />
        </motion.div>
      </div>
    </div>
  );
});

export default VideoThumbnail;
