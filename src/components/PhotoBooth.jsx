import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCamera, FiDownload, FiShare2, FiHeart } from "react-icons/fi";

const PhotoBooth = () => {
  const [selectedFilter, setSelectedFilter] = useState("none");

  const filters = [
    { name: "Holi Splash", class: "saturate-200 brightness-110" },
    { name: "Festival Glow", class: "brightness-125 contrast-110" },
    { name: "ECE Special", class: "hue-rotate-180 saturate-150" },
    { name: "Color Pop", class: "contrast-125 saturate-150" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl font-bold text-center text-white mb-12"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          E1 ECE Photo Booth 📸
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <div
                className={`w-full h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center ${selectedFilter}`}
              >
                <FiCamera className="text-6xl text-white" />
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-pink-500 rounded-full text-white"
              >
                <FiCamera size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-purple-500 rounded-full text-white"
              >
                <FiDownload size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-blue-500 rounded-full text-white"
              >
                <FiShare2 size={24} />
              </motion.button>
            </div>
          </motion.div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">Holi Filters</h3>
            {filters.map((filter, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedFilter(filter.class)}
                className="w-full p-4 bg-white/10 backdrop-blur-lg rounded-xl text-white text-left"
                whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                {filter.name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoBooth;
