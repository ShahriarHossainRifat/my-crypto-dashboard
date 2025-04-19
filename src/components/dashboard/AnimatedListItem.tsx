// src/components/dashboard/AnimatedListItem.tsx
"use client"; // Uses Framer Motion for client-side animation

import React from "react";
import { motion, Variants } from "framer-motion"; // Import motion and Variants type
import type { ChildrenProps } from "@/types";

interface AnimatedListItemProps extends ChildrenProps {
  index?: number; // Optional index for staggered animations
  customVariants?: Variants; // Allow passing custom animation variants
  className?: string; // Allow passing additional CSS classes
  // Accept any other props to pass down to the motion element (e.g., layout props)
  [key: string]: any;
}

// Default animation variants
const defaultListItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    // Accept custom index 'i'
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03, // Apply a small staggered delay based on index
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const AnimatedListItem: React.FC<AnimatedListItemProps> = ({
  children,
  index = 0, // Default index if not provided
  customVariants,
  className = "",
  ...rest // Pass rest props to motion component
}) => {
  const variants = customVariants || defaultListItemVariants;

  return (
    <motion.div // Or motion.tr if wrapping a table row directly sometimes needed
      variants={variants}
      initial="hidden"
      animate="visible"
      custom={index} // Pass index to the 'visible' variant
      className={className}
      {...rest} // Spread rest props
    >
      {children}
    </motion.div>
  );
};

export default AnimatedListItem;
