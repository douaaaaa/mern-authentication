import React from "react";
import { motion } from "framer-motion";

function FloatingShapes({ color, size, top, left, delay }) {
  return (
    <motion.div
      className={` absolute  ${size} ${color} opacity-20 blur-xl`}
      style={{ top, left }}
      animate={{
        x: ["0%", "100%", "0%"],
        y: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        delay,
        transition: "linear",
        duration: 20,
        repeat: Infinity,
      }}
      aria-hidden="true"
    />
  );
}

export default FloatingShapes;
