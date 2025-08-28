"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const pageVariants = {
  initial: { y: "8%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "-8%", opacity: 0 },
};
const EASE_BEZIER = [0.22, 1, 0.36, 1] as const; // <- typed 4-tuple
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_BEZIER },
  },
};

const floatVariants: Variants = {
  float: {
    y: [0, -6, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut", // or use a cubic-bezier: ease: [0.42, 0, 0.58, 1]
    },
  },
};

export default function UnderDevelopment() {
  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      variants={pageVariants}
      className="relative min-h-dvh overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.22),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.22),transparent_45%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.18),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.18),transparent_45%)]" />
      <motion.div
        className="absolute inset-0 -z-10"
        variants={floatVariants}
        animate="animate"
      >
        <div className="h-full w-full bg-gradient-to-br from-white/30 via-transparent to-white/30 dark:from-white/5 dark:via-transparent dark:to-white/5" />
      </motion.div>

      {/* Content */}
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-8 px-6 py-28 text-center sm:py-36">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-white/50 p-8 backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.15)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
        >
          {/* Soft light accents */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-52 w-52 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-400/15" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-400/30 blur-3xl dark:bg-indigo-500/15" />

          <motion.h1
            className="bg-gradient-to-b from-neutral-900 to-neutral-600 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl dark:from-white dark:to-white/60"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            This page is <span className="font-bold">under development</span> ✨
          </motion.h1>

          <motion.p
            className="mx-auto mt-3 max-w-prose text-base text-neutral-700 sm:text-lg dark:text-neutral-300"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Crafting something modern, fast, and delightful. It will be{" "}
            <span className="font-semibold">available soon</span>. Thanks for
            the patience!
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-900/10 bg-white/60 px-4 py-2 text-sm font-medium text-neutral-900 backdrop-blur hover:bg-white/80 transition-colors dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
            >
              Go back
            </Link>
            {/* <Link
              href={{ pathname: "/subscribe", query: { from: "under-dev" } }}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-indigo-400 hover:to-emerald-400 transition-colors"
            >
              Notify me
            </Link> */}
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}
