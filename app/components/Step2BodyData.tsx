"use client";

import { useState, useCallback } from "react";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizStore, type Unit } from "@/app/store/quiz-store";

export default function Step2BodyData() {
  const { unit, age, height, weight, targetWeight, setUnit, setAge, setHeight, setWeight, setTargetWeight, nextStep, prevStep } =
    useQuizStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const heightLabel = unit === "metric" ? "cm" : "in";
  const weightLabel = unit === "metric" ? "kg" : "lbs";

  const parseNum = useCallback((v: string): number | null => {
    const n = parseFloat(v);
    return isNaN(n) || n <= 0 ? null : n;
  }, []);

  const validate = (): boolean => {
    const e: Record<string, string> = {};

    if (!age || age < 13 || age > 120) e.age = "Enter a valid age (13–120)";
    if (!height || (unit === "metric" && (height < 100 || height > 250)))
      e.height = unit === "metric" ? "Enter valid height (100–250 cm)" : "Enter valid height (39–98 in)";
    if (!height || (unit === "imperial" && (height < 39 || height > 98)))
      e.height = unit === "imperial" ? "Enter valid height (39–98 in)" : e.height;
    if (!weight || (unit === "metric" && (weight < 30 || weight > 300)))
      e.weight = unit === "metric" ? "Enter valid weight (30–300 kg)" : "Enter valid weight (66–660 lbs)";
    if (!weight || (unit === "imperial" && (weight < 66 || weight > 660)))
      e.weight = unit === "imperial" ? "Enter valid weight (66–660 lbs)" : e.weight;
    if (!targetWeight || targetWeight <= 0) e.targetWeight = "Enter your goal weight";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (validate()) nextStep();
  };

  const toggleUnit = (u: Unit) => {
    if (u === unit) return;
    if (height) {
      setHeight(u === "imperial" ? Math.round(height / 2.54) : Math.round(height * 2.54));
    }
    if (weight) {
      setWeight(u === "imperial" ? Math.round(weight * 2.20462) : Math.round(weight / 2.20462));
    }
    if (targetWeight) {
      setTargetWeight(
        u === "imperial" ? Math.round(targetWeight * 2.20462) : Math.round(targetWeight / 2.20462)
      );
    }
    setUnit(u);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="flex flex-col gap-6"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Your body metrics</h1>
        <p className="mt-2 text-white/60">We use this to calculate your personalized plan</p>
      </div>

      <div className="flex justify-center">
        <div className="inline-flex rounded-2xl bg-white/5 p-1">
          {(["metric", "imperial"] as Unit[]).map((u) => (
            <button
              key={u}
              onClick={() => toggleUnit(u)}
              className={`relative rounded-xl px-6 py-2 text-sm font-medium transition-colors ${
                unit === u ? "text-white" : "text-white/40"
              }`}
            >
              {unit === u && (
                <motion.div
                  layoutId="unit-pill"
                  className="absolute inset-0 rounded-xl bg-violet-500"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{u === "metric" ? "Metric" : "Imperial"}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Age"
          value={age}
          onChange={(v) => setAge(parseNum(v) ?? 0)}
          placeholder="25"
          error={errors.age}
        />
        <Field
          label={`Height (${heightLabel})`}
          value={height}
          onChange={(v) => setHeight(parseNum(v) ?? 0)}
          placeholder={unit === "metric" ? "170" : "67"}
          error={errors.height}
        />
        <Field
          label={`Weight (${weightLabel})`}
          value={weight}
          onChange={(v) => setWeight(parseNum(v) ?? 0)}
          placeholder={unit === "metric" ? "70" : "154"}
          error={errors.weight}
        />
        <Field
          label={`Target (${weightLabel})`}
          value={targetWeight}
          onChange={(v) => setTargetWeight(parseNum(v) ?? 0)}
          placeholder={unit === "metric" ? "65" : "143"}
          error={errors.targetWeight}
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={prevStep}
          className="inline-flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white/60 transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="flex-1 rounded-2xl bg-violet-500 py-4 text-center text-lg font-semibold text-white transition-all hover:bg-violet-400"
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: number | null;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
        {label}
      </label>
      <input
        type="number"
        inputMode="decimal"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border-2 bg-white/5 px-4 py-3 text-lg font-semibold text-white outline-none transition-colors placeholder:text-white/15 focus:border-violet-500 ${
          error ? "border-red-500/50" : "border-white/10"
        }`}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1 text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
