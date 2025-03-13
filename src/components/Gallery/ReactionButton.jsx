import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";

const ReactionButton = memo(({ type, index, reactions, onClick, children }) => {
  const hasReacted = useMemo(
    () => (reactions[index] || []).includes(type),
    [reactions, index, type]
  );

  const style = useMemo(() => {
    const colors = {
      heart: hasReacted
        ? "bg-gradient-to-r from-red-500 to-pink-500"
        : "bg-white/10 hover:bg-white/20",
      star: hasReacted
        ? "bg-gradient-to-r from-yellow-400 to-amber-500"
        : "bg-white/10 hover:bg-white/20",
      zap: hasReacted
        ? "bg-gradient-to-r from-green-400 to-emerald-500"
        : "bg-white/10 hover:bg-white/20",
      droplet: hasReacted
        ? "bg-gradient-to-r from-blue-400 to-indigo-500"
        : "bg-white/10 hover:bg-white/20",
    };
    return colors[type];
  }, [type, hasReacted]);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`p-3 rounded-full text-white shadow-lg backdrop-blur-md ${style}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
});

export default ReactionButton;
