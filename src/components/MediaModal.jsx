import React, { useEffect, useCallback, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalContent from "./ModalContent";
import { FiX, FiShare2, FiDownload, FiInfo } from "react-icons/fi";

const MediaModal = memo(
  ({
    item,
    index,
    onClose,
    videoRef,
    containerRef,
    isMuted,
    setIsMuted,
    isPlaying,
    setIsPlaying,
    isFullscreen,
    toggleFullscreen,
    showInfo,
    setShowInfo,
    reactions,
    shareMedia,
    downloadMedia,
  }) => {
    useEffect(() => {
      if (item.type === "video" && videoRef.current) {
        videoRef.current.load();
        videoRef.current.muted = isMuted;
        requestAnimationFrame(() => {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => setIsPlaying(true))
              .catch((err) => {
                console.log("Playback failed:", err);
                setIsPlaying(false);
              });
          }
        });
      }
      return () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      };
    }, [item, videoRef, isMuted, setIsPlaying]);

    const handleVideoPlay = useCallback(
      (e) => {
        e.stopPropagation();
        if (videoRef.current) {
          if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
          } else {
            videoRef.current
              .play()
              .then(() => setIsPlaying(true))
              .catch((e) => {
                console.log("Playback failed:", e);
                setIsPlaying(false);
              });
          }
        }
      },
      [isPlaying, videoRef, setIsPlaying]
    );

    const handleMuteToggle = useCallback(
      (e) => {
        e.stopPropagation();
        if (videoRef.current) {
          videoRef.current.muted = !isMuted;
          setIsMuted((prev) => !prev);
        }
      },
      [isMuted, videoRef, setIsMuted]
    );

    const reactionIcons = useMemo(
      () => ({
        heart: <span className="text-red-500">♥</span>,
        star: <span className="text-yellow-500">★</span>,
        zap: <span className="text-green-500">⚡</span>,
        droplet: <span className="text-blue-500">💧</span>,
      }),
      []
    );

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          ref={containerRef}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.5 }}
          className="relative max-w-5xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <ModalContent
            item={item}
            videoRef={videoRef}
            isPlaying={isPlaying}
            handleVideoPlay={handleVideoPlay}
            isMuted={isMuted}
            handleMuteToggle={handleMuteToggle}
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo(!showInfo);
              }}
            >
              <FiInfo size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
              onClick={(e) => {
                e.stopPropagation();
                downloadMedia(item, e);
              }}
            >
              <FiDownload size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
              onClick={(e) => {
                e.stopPropagation();
                shareMedia(item, e);
              }}
            >
              <FiShare2 size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <FiX size={24} />
            </motion.button>
          </div>
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 backdrop-blur-sm rounded-b-lg"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.caption}
                </h3>
                {item.date && (
                  <p className="text-white/80">Taken on: {item.date}</p>
                )}
                {item.location && (
                  <p className="text-white/80">Location: {item.location}</p>
                )}
                {item.description && (
                  <p className="text-white/80 mt-2">{item.description}</p>
                )}
                <div className="mt-3 flex gap-2">
                  {(reactions[index] || []).map((reaction, i) => (
                    <span
                      key={`${reaction}-${i}`}
                      className="text-xs bg-white/20 p-1 rounded"
                    >
                      {reactionIcons[reaction]}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  }
);

export default MediaModal;
