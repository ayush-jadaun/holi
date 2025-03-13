import React, { memo } from "react";
import { FiHeart, FiStar, FiZap, FiDroplet } from "react-icons/fi";

const ReactionIcon = memo(({ type }) => {
  const icons = {
    heart: <FiHeart className="text-red-500" />,
    star: <FiStar className="text-yellow-500" />,
    zap: <FiZap className="text-green-500" />,
    droplet: <FiDroplet className="text-blue-500" />,
  };

  return <span className="text-xs bg-white/20 p-1 rounded">{icons[type]}</span>;
});

export default ReactionIcon;
