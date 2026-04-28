"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useQuizStore } from "@/app/store/quiz-store";

const messages = [
  "Analyzing your body composition…",
  "Calculating your BMI…",
  "Estimating your metabolic rate…",
  "Building your personalized plan…",
  "Comparing with thousands of similar profiles…",
  "Optimizing your nutrition strategy…",
  "Finalizing your recommendations…",
];

const DURATION = 3500;
const INTERVAL = DURATION / messages.length;

export default function Step4Analysis() {
  const { nextStep } = useQuizStore();
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(p);
      setMsgIndex(Math.min(Math.floor(elapsed / INTERVAL), messages.length - 1));

      if (p < 100) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    const timer = setTimeout(() => nextStep(), DURATION + 400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [nextStep]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center gap-10 py-16 text-center"
    >
      <div className="relative">
        <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="4"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="h-7 w-7 text-violet-400" />
        </div>
      </div>

      <div className="h-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-white/60"
          >
            {messages[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-violet-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
