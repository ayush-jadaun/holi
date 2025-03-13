import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  FiMaximize2,
  FiMinimize2,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";

const ModalContent = memo(
  ({
    item,
    videoRef,
    isPlaying,
    handleVideoPlay,
    isMuted,
    handleMuteToggle,
    isFullscreen,
    toggleFullscreen,
  }) => {
    if (item.type === "image") {
      return (
        <div className="relative">
          <img
            src={item.url}
            alt={item.caption}
            className="w-full h-auto rounded-lg"
          />
          <div className="absolute bottom-4 left-4 flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <FiMinimize2 size={24} />
              ) : (
                <FiMaximize2 size={24} />
              )}
            </motion.button>
          </div>
        </div>
      );
    }
    return (
      <div className="relative group">
        <video
          ref={videoRef}
          src={item.url}
          poster={item.thumbnail}
          className="w-full h-auto rounded-lg"
          playsInline
          muted={isMuted}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="absolute bottom-4 left-4 right-4 flex justify-center items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white"
            onClick={handleVideoPlay}
          >
            {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white"
            onClick={handleMuteToggle}
          >
            {isMuted ? <FiVolumeX size={24} /> : <FiVolume2 size={24} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <FiMinimize2 size={24} />
            ) : (
              <FiMaximize2 size={24} />
            )}
          </motion.button>
        </div>
      </div>
    );
  }
);

export default ModalContent;
