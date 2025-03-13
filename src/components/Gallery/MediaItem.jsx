import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import VideoThumbnail from "./VideoThumbnail";
import LikeButton from "./LikeButton";
import ReactionButton from "./ReactionButton";

const MediaItem = memo(
  ({
    item,
    index,
    openMedia,
    likes,
    reactions,
    handleLike,
    handleReaction,
    thumbnailVideoRefs,
  }) => {
    const setVideoRef = useCallback(
      (idx, el) => {
        thumbnailVideoRefs.current[idx] = el;
      },
      [thumbnailVideoRefs]
    );

    return (
      <motion.div
        className="relative overflow-hidden rounded-2xl group bg-black/20 shadow-xl flex flex-col"
        whileHover={{ y: -5, scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div
          className="w-full h-72 cursor-pointer overflow-hidden"
          onClick={() => openMedia(item, index)}
        >
          {item.type === "image" ? (
            <img
              src={item.url}
              alt={item.caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <VideoThumbnail
              item={item}
              index={index}
              openMedia={openMedia}
              setRef={setVideoRef}
            />
          )}
        </div>
        <motion.div className="p-4 bg-black/50 backdrop-blur-sm">
          <motion.p className="text-white text-lg font-semibold mb-3 truncate">
            {item.caption}
          </motion.p>
          <div className="flex gap-2 justify-center">
            <LikeButton
              index={index}
              likes={likes}
              onClick={(e) => handleLike(index, e)}
            />
            <ReactionButton
              type="star"
              index={index}
              reactions={reactions}
              onClick={(e) => handleReaction(index, "star", e)}
            >
              <span>★</span>
            </ReactionButton>
            <ReactionButton
              type="zap"
              index={index}
              reactions={reactions}
              onClick={(e) => handleReaction(index, "zap", e)}
            >
              <span>⚡</span>
            </ReactionButton>
            <ReactionButton
              type="droplet"
              index={index}
              reactions={reactions}
              onClick={(e) => handleReaction(index, "droplet", e)}
            >
              <span>💧</span>
            </ReactionButton>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

export default MediaItem;
