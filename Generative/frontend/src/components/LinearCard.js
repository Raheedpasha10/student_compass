import React from 'react';
import { motion } from 'framer-motion';

const LinearCard = ({ 
  children, 
  className = '',
  hover = true,
  onClick,
  style = {},
  ...props 
}) => {
  return (
    <motion.div
      className={`
        bg-bg-secondary border border-border-primary rounded-12
        transition-regular ease-out-quad
        ${className}
      `}
      style={{
        transitionProperty: 'background-color, border-color',
        transitionDuration: '.16s',
        transitionTimingFunction: 'cubic-bezier(.25, .46, .45, .94)',
        ...style
      }}
      whileHover={hover ? {
        backgroundColor: 'rgba(35, 35, 38, 1)', // bg-tertiary
        scale: 1.01,
      } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default LinearCard;

