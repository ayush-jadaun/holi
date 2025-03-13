import React, { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";

const VideoThumbnail = memo(({ item, index, openMedia, setRef }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay prevented:", error);
        });
      }
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <video
        ref={(el) => {
          videoRef.current = el;
          setRef(index, el);
        }}
        src={item.url}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
