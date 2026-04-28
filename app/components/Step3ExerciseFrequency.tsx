"use client";

import { motion } from "framer-motion";
import {
  Sofa,
  PersonStanding,
  Dumbbell,
  TrendingUp,
  Flame,
  Check,
  ChevronLeft,
} from "lucide-react";
import { useQuizStore } from "@/app/store/quiz-store";

const frequencyOptions = [
  { value: "sedentary", label: "Rarely", description: "Less than once a week", icon: Sofa },
  { value: "light", label: "1–2 times/week", description: "Light activity", icon: PersonStanding },
  { value: "moderate", label: "3–4 times/week", description: "Regular exercise", icon: Dumbbell },
  { value: "active", label: "5–6 times/week", description: "Very active", icon: TrendingUp },
  { value: "intense", label: "Daily +", description: "Highly active lifestyle", icon: Flame },
];

export default function Step3ExerciseFrequency() {
  const { exerciseFrequency, setExerciseFrequency, nextStep, prevStep } = useQuizStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="flex flex-col gap-8"
    >
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-2xl font-bold text-white sm:text-3xl"
        >
          How often do you exercise?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-2 text-white/60"
        >
          Be honest — we&apos;ll adjust your plan accordingly
        </motion.p>
      </div>

      <div className="flex flex-col gap-3">
        {frequencyOptions.map((opt, i) => {
          const Icon = opt.icon;
          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setExerciseFrequency(opt.value)}
              className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${
                exerciseFrequency === opt.value
                  ? "border-violet-500 bg-violet-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <Icon
                className={`h-6 w-6 ${
                  exerciseFrequency === opt.value ? "text-violet-400" : "text-white/50"
                }`}
              />
              <div className="flex-1">
                <p className="font-semibold text-white">{opt.label}</p>
                <p className="text-sm text-white/40">{opt.description}</p>
              </div>
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  exerciseFrequency === opt.value
                    ? "border-violet-500 bg-violet-500"
                    : "border-white/20"
                }`}
              >
                {exerciseFrequency === opt.value && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={prevStep}
          className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white/60 transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => exerciseFrequency && nextStep()}
          disabled={!exerciseFrequency}
          className={`flex-1 rounded-2xl py-4 text-center text-lg font-semibold transition-all ${
            exerciseFrequency
              ? "bg-violet-500 text-white hover:bg-violet-400"
              : "cursor-not-allowed bg-violet-500/40 text-white/50"
          }`}
        >
          Calculate My Plan
        </motion.button>
      </div>
    </motion.div>
  );
}
