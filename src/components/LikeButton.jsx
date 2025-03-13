import React, { memo } from "react";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";

const LikeButton = memo(({ index, likes, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative p-3 rounded-full text-white shadow-lg backdrop-blur-md"
      style={{
        background: likes[index]
          ? "linear-gradient(to right, #ff0844, #ff5e62)"
          : "rgba(255, 255, 255, 0.1)",
      }}
      onClick={onClick}
    >
      <FiHeart size={24} className="text-white" />
      {likes[index] && (
        <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {likes[index]}
        </span>
      )}
    </motion.button>
  );
});

export default LikeButton;
