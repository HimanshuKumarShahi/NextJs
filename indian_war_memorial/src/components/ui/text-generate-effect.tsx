"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TextGenerateEffect({
  words,
  className,
  delay = 0,
}: {
  words: string;
  className?: string;
  delay?: number;
}) {
  const wordsArray = words.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: delay 
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
      },
    },
    hidden: {
      opacity: 0,
      y: 8,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn("inline-block", className)}
    >
      {wordsArray.map((word, idx) => (
        <motion.span
          variants={child}
          key={word + idx}
          className="inline-block mr-1.5"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
