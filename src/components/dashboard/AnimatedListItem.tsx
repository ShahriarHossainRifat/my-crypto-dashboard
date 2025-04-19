// src/components/dashboard/AnimatedListItem.tsx (Use Framer Motion Props)
// --- Start of File ---
"use client";

import React from "react";
// Import motion types
import { motion, Variants, HTMLMotionProps } from "framer-motion";
// We might not need ChildrenProps from types anymore if ReactNode is handled

// Define props based on Framer Motion's props for a 'div', plus our custom ones
// We omit 'ref' as forwardRef handles it, and add our specific props.
interface AnimatedListItemProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  index?: number;
  customVariants?: Variants;
  children: React.ReactNode; // Explicitly include children if not directly in HTMLMotionProps or needed separately
  // className is already part of HTMLMotionProps
}

const defaultListItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

// Note: No need for React.FC wrapper when defining props this way usually
const AnimatedListItem = React.forwardRef<
  HTMLDivElement,
  AnimatedListItemProps
>((props, ref) => {
  // Destructure our custom props and the standard motion props separately
  const {
    children,
    index = 0,
    customVariants,
    className, // Destructure className explicitly if needed for defaults/merging
    ...motionProps // Gather remaining valid motion props
  } = props;

  const variants = customVariants || defaultListItemVariants;

  return (
    <motion.div
      ref={ref} // Forward the ref
      variants={variants}
      initial="hidden"
      animate="visible"
      custom={index}
      className={className ?? ""} // Handle className, provide default if needed
      {...motionProps} // Spread the rest of the valid HTMLMotionProps
    >
      {children}
    </motion.div>
  );
});

AnimatedListItem.displayName = "AnimatedListItem"; // Set display name for DevTools

export default AnimatedListItem;
// --- End of File ---
