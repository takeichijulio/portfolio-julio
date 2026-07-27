"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Headline com stagger palavra a palavra; estático em reduced-motion. */
export function HeroHeadline({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return (
      <h1
        data-reveal
        className="kinetic max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-chalk sm:text-6xl"
      >
        {text}
      </h1>
    );
  }

  return (
    <h1
      data-reveal
      className="kinetic max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-chalk sm:text-6xl"
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 * i, ease: "easeOut" }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </h1>
  );
}
