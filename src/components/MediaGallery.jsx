import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiStar,
  FiZap,
  FiDroplet,
  FiX,
  FiShare2,
  FiMaximize2,
  FiMinimize2,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiDownload,
  FiInfo,
} from "react-icons/fi";
import confetti from "canvas-confetti";

const MediaGallery = ({ media = [] }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [likes, setLikes] = useState(() =>
    JSON.parse(localStorage.getItem("mediaLikes") || "{}")
  );
  const [reactions, setReactions] = useState(() =>
    JSON.parse(localStorage.getItem("mediaReactions") || "{}")
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("mediaLikes", JSON.stringify(likes));
    localStorage.setItem("mediaReactions", JSON.stringify(reactions));
  }, [likes, reactions]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
    };
  }, []);

  const confettiEffects = {
    heart: () => {
      const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["heart"],
        colors: ["#ff0000", "#ff69b4", "#ff1493"],
      };
      confetti({ ...defaults, particleCount: 50, scalar: 2 });
    },
    star: () => {
      confetti({
        particleCount: 25,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#FFA500", "#FFE4B5"],
      });
    },
    zap: () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00ff00", "#ff00ff", "#00ffff"],
      });
    },
    droplet: () => {
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      confetti({
        ...defaults,
        particleCount: 80,
        origin: { x: 0.3, y: 0.2 },
        colors: ["#00f", "#09f", "#0ff"],
      });
      confetti({
        ...defaults,
        particleCount: 80,
        origin: { x: 0.7, y: 0.2 },
        colors: ["#00f", "#09f", "#0ff"],
      });
    },
  };

  const handleReaction = (index, type) => {
    const effects = {
      heart: confettiEffects.heart,
      star: confettiEffects.star,
      zap: confettiEffects.zap,
      droplet: confettiEffects.droplet,
    };
    setReactions((prev) => ({
      ...prev,
      [index]: [...(prev[index] || []), type],
    }));
    effects[type]?.();
  };

  const handleLike = (index) => {
    setLikes((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
    confettiEffects.heart();
  };

  const shareMedia = async (mediaItem) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: mediaItem.caption,
          text: "Check out this amazing moment from E1 ECE Holi celebration!",
          url: mediaItem.url,
        });
      } else {
        navigator.clipboard.writeText(mediaItem.url);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const downloadMedia = (mediaItem) => {
    const link = document.createElement("a");
    link.href = mediaItem.url;
    link.download = `e1-ece-holi-${mediaItem.caption
      .replace(/\s+/g, "-")
      .toLowerCase()}.${mediaItem.type === "image" ? "jpg" : "mp4"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .catch((err) =>
          console.log(`Error attempting to enable fullscreen: ${err.message}`)
        );
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const MediaModal = ({ item, index, onClose }) => {
    useEffect(() => {
      if (item.type === "video" && videoRef.current) {
        videoRef.current.load();
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      }
      return () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      };
    }, [item]);

    const handleVideoPlay = (e) => {
      e.stopPropagation();
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current
            .play()
            .catch((e) => console.log("Playback failed:", e));
        }
        setIsPlaying(!isPlaying);
      }
    };

    const handleMuteToggle = (e) => {
      e.stopPropagation();
      if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

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
          {item.type === "image" ? (
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
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white"
                  onClick={() => shareMedia(item)}
                >
                  <FiShare2 size={24} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white"
                  onClick={() => downloadMedia(item)}
                >
                  <FiDownload size={24} />
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <video
                ref={videoRef}
                src={item.url}
                poster={item.thumbnail}
                className="w-full h-auto rounded-lg"
                playsInline
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
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                >
                  {isFullscreen ? (
                    <FiMinimize2 size={24} />
                  ) : (
                    <FiMaximize2 size={24} />
                  )}
                </motion.button>
              </div>
            </div>
          )}
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
                downloadMedia(item);
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
                shareMedia(item);
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
                  {(reactions[index] || []).map((reaction, i) => {
                    const icons = {
                      heart: <FiHeart key={i} className="text-red-500" />,
                      star: <FiStar key={i} className="text-yellow-500" />,
                      zap: <FiZap key={i} className="text-green-500" />,
                      droplet: <FiDroplet key={i} className="text-blue-500" />,
                    };
                    return (
                      <span
                        key={`${reaction}-${i}`}
                        className="text-xs bg-white/20 p-1 rounded"
                      >
                        {icons[reaction]}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-rose-900"
    >
      <motion.div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h1
          className="text-6xl font-bold text-white text-center mb-4"
          animate={{
            textShadow: [
              "0 0 7px #fff",
              "0 0 10px #fff",
              "0 0 21px #fff",
              "0 0 42px #bc13fe",
              "0 0 82px #bc13fe",
              "0 0 92px #bc13fe",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          E1 ECE Holi Memories
        </motion.h1>
        <motion.p
          className="text-white/90 text-center text-xl mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Relive the vibrant colors and joyful moments from our department's
          celebration
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {media.map((item, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-2xl group bg-black/20 shadow-xl"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-72 object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
                  onClick={() => setSelectedMedia({ item, index })}
                />
              ) : (
                <div
                  className="relative w-full h-72 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedMedia({ item, index })}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="p-4 bg-white/20 backdrop-blur-sm rounded-full"
                    >
                      <FiPlay size={32} className="text-white" />
                    </motion.div>
                  </div>
                </div>
              )}
              <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="text-white text-lg font-semibold mb-4"
                  >
                    {item.caption}
                  </motion.p>
                  <div className="flex gap-3 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(index);
                      }}
                    >
                      <FiHeart
                        size={24}
                        className={likes[index] ? "text-red-500" : ""}
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReaction(index, "star");
                      }}
                    >
                      <FiStar size={24} className="text-yellow-300" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReaction(index, "zap");
                      }}
                    >
                      <FiZap size={24} className="text-green-400" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReaction(index, "droplet");
                      }}
                    >
                      <FiDroplet size={24} className="text-blue-400" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {selectedMedia && (
            <MediaModal
              item={selectedMedia.item}
              index={selectedMedia.index}
              onClose={() => setSelectedMedia(null)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default MediaGallery;
