"use client";

import { motion } from "framer-motion";
import { Mars, Venus, Check, ArrowRight } from "lucide-react";
import { useQuizStore, type Gender, type Goal } from "@/app/store/quiz-store";

const genderOptions: { value: Gender; label: string; icon: typeof Mars }[] = [
  { value: "male", label: "Male", icon: Mars },
  { value: "female", label: "Female", icon: Venus },
];

const goalOptions: { value: Goal; label: string; description: string }[] = [
  { value: "lose_weight", label: "Lose Weight", description: "Burn fat & get lean" },
  { value: "gain_muscle", label: "Build Muscle", description: "Get stronger & bigger" },
  { value: "tone", label: "Tone & Sculpt", description: "Define your physique" },
];

export default function Step1BasicInfo() {
  const { gender, goal, setGender, setGoal, nextStep } = useQuizStore();

  const canProceed = gender && goal;

  const handleContinue = () => {
    if (canProceed) nextStep();
  };

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
          Let&apos;s personalize your plan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-2 text-white/60"
        >
          Tell us about yourself so we can tailor your program
        </motion.p>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-white/40">I am</p>
          <div className="grid grid-cols-2 gap-3">
            {genderOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <motion.button
                  key={opt.value}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setGender(opt.value)}
                  className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-colors ${
                    gender === opt.value
                      ? "border-violet-500 bg-violet-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <Icon
                    className={`h-8 w-8 ${
                      gender === opt.value ? "text-violet-400" : "text-white/50"
                    }`}
                  />
                  <span
                    className={`text-sm font-semibold ${
                      gender === opt.value ? "text-violet-300" : "text-white/70"
                    }`}
                  >
                    {opt.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: gender ? 1 : 0, height: gender ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-white/40">
            My goal is to
          </p>
          <div className="flex flex-col gap-3">
            {goalOptions.map((opt) => (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.98 }}
                onClick={() => setGoal(opt.value)}
                className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${
                  goal === opt.value
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    goal === opt.value ? "border-violet-500 bg-violet-500" : "border-white/20"
                  }`}
                >
                  {goal === opt.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Check className="h-5 w-5 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-white">{opt.label}</p>
                  <p className="text-sm text-white/50">{opt.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: canProceed ? 1 : 0.4, y: canProceed ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        onClick={handleContinue}
        disabled={!canProceed}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-500 py-4 text-center text-lg font-semibold text-white transition-all hover:bg-violet-400 disabled:cursor-not-allowed disabled:bg-violet-500/40"
      >
        Continue
        <ArrowRight className="h-5 w-5" />
      </motion.button>
    </motion.div>
  );
}
