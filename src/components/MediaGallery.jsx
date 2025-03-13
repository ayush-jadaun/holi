import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import MediaItem from "./MediaItem";
import MediaModal from "./MediaModal";
import { createConfettiEffects } from "../utils/confettiEffects";

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
  const thumbnailVideoRefs = useRef({});

  const confettiEffects = useMemo(() => createConfettiEffects(), []);

  const handleReaction = useCallback(
    (index, type, e) => {
      if (e) e.stopPropagation();
      setReactions((prev) => ({
        ...prev,
        [index]: [...(prev[index] || []), type],
      }));
      confettiEffects[type]?.();
    },
    [confettiEffects]
  );

  const handleLike = useCallback(
    (index, e) => {
      if (e) e.stopPropagation();
      setLikes((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
      confettiEffects.heart();
    },
    [confettiEffects]
  );

  const shareMedia = useCallback(async (mediaItem, e) => {
    if (e) e.stopPropagation();
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
  }, []);

  const downloadMedia = useCallback((mediaItem, e) => {
    if (e) e.stopPropagation();
    const link = document.createElement("a");
    link.href = mediaItem.url;
    link.download = `e1-ece-holi-${mediaItem.caption
      .replace(/\s+/g, "-")
      .toLowerCase()}.${mediaItem.type === "image" ? "jpg" : "mp4"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const toggleFullscreen = useCallback((e) => {
    if (e) e.stopPropagation();
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
  }, []);

  const openMedia = useCallback((item, index) => {
    requestAnimationFrame(() => {
      Object.values(thumbnailVideoRefs.current).forEach((videoElement) => {
        if (videoElement) videoElement.pause();
      });
    });
    setSelectedMedia({ item, index });
  }, []);

  useEffect(() => {
    const saveToStorage = () => {
      localStorage.setItem("mediaLikes", JSON.stringify(likes));
      localStorage.setItem("mediaReactions", JSON.stringify(reactions));
    };
    if (window.requestIdleCallback) {
      window.requestIdleCallback(saveToStorage);
    } else {
      setTimeout(saveToStorage, 0);
    }
  }, [likes, reactions]);

  useEffect(() => {
    const initThumbnails = () => {
      media.forEach((item, index) => {
        if (item.type === "video" && thumbnailVideoRefs.current[index]) {
          const videoElement = thumbnailVideoRefs.current[index];
          videoElement.muted = true;
          videoElement.loop = true;
          const attemptPlay = () => {
            videoElement.play().catch((err) => {
              if (err.name === "NotAllowedError") {
                console.log("Preview autoplay blocked by browser policy");
              } else {
                console.log("Preview playback prevented:", err);
                setTimeout(attemptPlay, 1000);
              }
            });
          };
          attemptPlay();
        }
      });
    };
    if (window.requestIdleCallback) {
      window.requestIdleCallback(initThumbnails);
    } else {
      setTimeout(initThumbnails, 0);
    }
    return () => {
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.src = "";
          videoRef.current.load();
        }
        Object.values(thumbnailVideoRefs.current).forEach((videoElement) => {
          if (videoElement) {
            videoElement.pause();
            videoElement.src = "";
            videoElement.load();
          }
        });
      });
    };
  }, [media]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedMedia(null);
    setTimeout(() => {
      requestAnimationFrame(() => {
        Object.values(thumbnailVideoRefs.current).forEach((videoElement) => {
          if (videoElement) {
            videoElement
              .play()
              .catch((err) => console.log("Preview resume prevented:", err));
          }
        });
      });
    }, 300);
  }, []);

  const mediaGrid = useMemo(
    () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {media.map((item, index) => (
          <MediaItem
            key={index}
            item={item}
            index={index}
            openMedia={openMedia}
            likes={likes}
            reactions={reactions}
            handleLike={handleLike}
            handleReaction={handleReaction}
            thumbnailVideoRefs={thumbnailVideoRefs}
          />
        ))}
      </div>
    ),
    [media, likes, reactions, openMedia, handleLike, handleReaction]
  );

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
        {mediaGrid}
        <AnimatePresence>
          {selectedMedia && (
            <MediaModal
              item={selectedMedia.item}
              index={selectedMedia.index}
              onClose={handleModalClose}
              videoRef={videoRef}
              containerRef={containerRef}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              isFullscreen={isFullscreen}
              toggleFullscreen={toggleFullscreen}
              showInfo={showInfo}
              setShowInfo={setShowInfo}
              reactions={reactions}
              shareMedia={shareMedia}
              downloadMedia={downloadMedia}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default memo(MediaGallery);
