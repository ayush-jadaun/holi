import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiImage, FiHeart, FiStar, FiZap, FiDroplet } from "react-icons/fi";
import confetti from "canvas-confetti";

const ColorfulGallery = ({ images = [] }) => {
  const colors = [
    "#FF0099",
    "#FF4F00",
    "#00FF47",
    "#00E0FF",
    "#FF00E4",
    "#FFD600",
    "#FF006E",
    "#4400FF",
  ];

  const launchConfetti = () => {
    const end = Date.now() + 1000;
    const colors = ["#ff0000", "#00ff00", "#0000ff"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-rose-900"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 py-16"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.h1
          className="text-6xl font-bold text-white text-center mb-12"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Festive Gallery
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layoutId={`image-${index}`}
              onClick={launchConfetti}
            >
              <motion.img
                src={image}
                alt={`Gallery item ${index + 1}`}
                className="w-full h-72 object-cover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.div
                    className="flex gap-4 justify-center"
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                  >
                    {[FiHeart, FiStar, FiZap, FiDroplet].map((Icon, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.8 }}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
                      >
                        <Icon size={24} />
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div className="fixed inset-0 pointer-events-none">
          {colors.map((color, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full"
              animate={{
                x: [0, Math.random() * window.innerWidth],
                y: [0, Math.random() * window.innerHeight],
                scale: [1, 2, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                width: Math.random() * 30 + 10,
                height: Math.random() * 30 + 10,
                backgroundColor: color,
                opacity: 0.3,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ColorfulGallery;
