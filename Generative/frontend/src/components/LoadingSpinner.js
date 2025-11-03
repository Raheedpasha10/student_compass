import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const spinnerSize = sizes[size];

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderTopColor: 'var(--color-accent)',
          borderRadius: '50%',
        }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-small text-text-tertiary font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
