import React, { memo } from "react";
import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";

const VideoThumbnail = memo(({ item, index, openMedia, setRef }) => {
  return (
    <div className="relative w-full h-full">
      <video
        ref={(el) => setRef(index, el)}
        src={item.url}
        poster={item.thumbnail}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        playsInline
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
