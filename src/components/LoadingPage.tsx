import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/d523c28324cd629ececcf264dd1b037642c2bd36.png';

interface LoadingPageProps {
  onComplete?: () => void;
  loadingText?: string;
  duration?: number;
}

export function LoadingPage({ 
  onComplete, 
  loadingText = "Loading...", 
  duration = 2500 
}: LoadingPageProps) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Logo and Brand */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center w-16 h-16">
            <img 
              src={logoImage} 
              alt="Dhruvian Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Dhruvian</h1>
            <p className="text-sm text-gray-300">Smart Tourist Safety</p>
          </div>
        </motion.div>

        {/* Three-dot loading animation inspired by WhatsApp */}
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Loading text */}
        {loadingText && (
          <motion.p
            className="text-white/70 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            {loadingText}
          </motion.p>
        )}
      </div>
    </div>
  );
}