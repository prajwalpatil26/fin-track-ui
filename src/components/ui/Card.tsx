import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({ children, className, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1, ease: 'easeOut' }}
      className={clsx(
        "glass rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl dark:hover:shadow-indigo-500/10 hover:-translate-y-1 group",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
