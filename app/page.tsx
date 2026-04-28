"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useQuizStore } from "@/app/store/quiz-store";
import WelcomePage from "@/app/components/WelcomePage";
import Step1BasicInfo from "@/app/components/Step1BasicInfo";
import Step2BodyData from "@/app/components/Step2BodyData";
import Step3ExerciseFrequency from "@/app/components/Step3ExerciseFrequency";
import Step4Analysis from "@/app/components/Step4Analysis";
import Step5Report from "@/app/components/Step5Report";

const TOTAL_STEPS = 5;

const steps = [
  Step1BasicInfo,
  Step2BodyData,
  Step3ExerciseFrequency,
  Step4Analysis,
  Step5Report,
];

export default function Home() {
  const hasStarted = useQuizStore((s) => s.hasStarted);
  const currentStep = useQuizStore((s) => s.currentStep);

  if (!hasStarted) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <WelcomePage />
        </motion.div>
      </AnimatePresence>
    );
  }

  const StepComponent = steps[currentStep];

  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-950">
      {currentStep < TOTAL_STEPS - 1 && (
        <div className="px-6 pt-6">
          <div className="mx-auto flex max-w-md items-center gap-2">
            {steps.slice(0, TOTAL_STEPS - 1).map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden"
              >
                <motion.div
                  className="h-full rounded-full bg-violet-500"
                  initial={{ width: "0%" }}
                  animate={{
                    width:
                      i < currentStep
                        ? "100%"
                        : i === currentStep
                        ? "40%"
                        : "0%",
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                    delay: i < currentStep ? 0 : 0.4,
                  }}
                />
              </div>
            ))}
            <span className="ml-2 text-xs font-medium text-white/30">
              {currentStep + 1}/{TOTAL_STEPS - 1}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-1 items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <StepComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
