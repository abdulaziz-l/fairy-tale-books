import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <div className="w-12 h-12 border-4 border-lavender/30 rounded-full"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-story-purple border-t-transparent rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Sparkles className="h-6 w-6 text-story-purple" />
        </div>
      </motion.div>
      <p className="story-text text-warm-brown mt-4">{message}</p>
    </div>
  );
};

export default LoadingSpinner;