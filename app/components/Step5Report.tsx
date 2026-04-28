"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Dumbbell, Sparkles, Crown, Check } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useQuizStore } from "@/app/store/quiz-store";

function bmi(weightKg: number, heightCm: number): number {
  const h = heightCm / 100;
  return weightKg / (h * h);
}

function weightInKg(weight: number, unit: "metric" | "imperial"): number {
  return unit === "imperial" ? weight / 2.20462 : weight;
}

function heightInCm(height: number, unit: "metric" | "imperial"): number {
  return unit === "imperial" ? height * 2.54 : height;
}

const bmiLabel = (b: number): { label: string; color: string } => {
  if (b < 18.5) return { label: "Underweight", color: "#facc15" };
  if (b < 25) return { label: "Healthy", color: "#4ade80" };
  if (b < 30) return { label: "Overweight", color: "#fb923c" };
  return { label: "Obese", color: "#f87171" };
};

export default function Step5Report() {
  const { weight, height, targetWeight, unit, goal, reset } = useQuizStore();
  const [showPaywall, setShowPaywall] = useState(false);

  const kg = useMemo(() => weightInKg(weight ?? 70, unit ?? "metric"), [weight, unit]);
  const cm = useMemo(() => heightInCm(height ?? 170, unit ?? "metric"), [height, unit]);
  const tgt = useMemo(() => weightInKg(targetWeight ?? 65, unit ?? "metric"), [targetWeight, unit]);
  const b = useMemo(() => bmi(kg, cm), [kg, cm]);
  const { label: bmiCategory, color: bmiColor } = useMemo(() => bmiLabel(b), [b]);

  const goalIcon =
    goal === "lose_weight" ? Target : goal === "gain_muscle" ? Dumbbell : Sparkles;

  const diff = kg - tgt;
  const ratePerWeek = 0.6;
  const weeks = diff !== 0 ? Math.abs(diff) / ratePerWeek : 0;
  const days = Math.round(weeks * 7);
  const targetDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }, [days]);

  const chartData = useMemo(() => {
    const points: { week: string; weight: number }[] = [];
    const steps = 8;
    for (let i = 0; i <= steps; i++) {
      const value = kg - diff * (i / steps);
      points.push({
        week: i === 0 ? "Now" : i === steps ? "Target" : `W${i}`,
        weight: Math.round(value * 10) / 10,
      });
    }
    return points;
  }, [kg, diff]);

  const Icon = goalIcon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="flex flex-col gap-6"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/20"
        >
          <Icon className="h-9 w-9 text-violet-400" />
        </motion.div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Your plan is ready!</h1>
        <p className="mt-2 text-white/60">
          Here&apos;s what we&apos;ve calculated based on your data
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="Current BMI" value={b.toFixed(1)} />
        <div
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
          style={{ borderLeftColor: bmiColor, borderLeftWidth: 3 }}
        >
          <p className="text-xs uppercase tracking-wider text-white/40">Category</p>
          <p className="mt-1 text-lg font-bold text-white">{bmiCategory}</p>
        </div>
        <MetricCard label="Current Weight" value={`${weight} ${unit === "imperial" ? "lbs" : "kg"}`} />
        <MetricCard
          label="Goal Weight"
          value={`${targetWeight} ${unit === "imperial" ? "lbs" : "kg"}`}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 text-center"
      >
        <p className="text-sm text-white/50">Estimated Target Date</p>
        <p className="mt-1 text-2xl font-bold text-violet-300">{targetDate}</p>
        <p className="mt-1 text-sm text-white/40">
          ~{weeks.toFixed(1)} weeks at a healthy pace
        </p>
      </motion.div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
          Weight Forecast
        </p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={chartData} margin={{ top: 12, right: 8, left: 4, bottom: 4 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />
            <XAxis
              dataKey="week"
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={["dataMin - 1", "dataMax + 1"]}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#a78bfa", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowPaywall(true)}
        className="w-full rounded-2xl bg-violet-500 py-4 text-center text-lg font-semibold text-white transition-all hover:bg-violet-400"
      >
        Unlock Full Report
      </motion.button>

      <AnimatePresence>
        {showPaywall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
            onClick={() => setShowPaywall(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl bg-zinc-900 p-8 text-center shadow-2xl"
            >
              <Crown className="mx-auto h-12 w-12 text-violet-400" />
              <h2 className="mt-4 text-2xl font-bold text-white">Premium Plan</h2>
              <p className="mt-2 text-white/60">
                Get your full personalized meal & workout plan
              </p>

              <div className="mt-6 rounded-2xl bg-violet-500/10 p-5">
                <p className="text-sm text-white/50">
                  <span className="line-through">$29.99</span>{" "}
                  <span className="ml-1 rounded-full bg-violet-500/30 px-2 py-0.5 text-xs text-violet-300">
                    SAVE 50%
                  </span>
                </p>
                <p className="mt-1 text-4xl font-extrabold text-white">$14.99</p>
                <p className="text-sm text-white/40">one-time payment</p>
              </div>

              <ul className="mt-6 space-y-3 text-left text-sm text-white/60">
                {[
                  "Personalized meal plan",
                  "Custom workout routine",
                  "Progress tracking",
                  "24/7 coach support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>

              <button className="mt-8 w-full rounded-2xl bg-violet-500 py-4 text-lg font-semibold text-white transition-all hover:bg-violet-400">
                Get Started Now
              </button>

              <button
                onClick={() => {
                  setShowPaywall(false);
                  reset();
                }}
                className="mt-3 text-sm text-white/30 transition-colors hover:text-white/50"
              >
                No thanks, take me back
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-wider text-white/40">{label}</p>
      <p className="mt-1 text-lg font-bold text-white">{value}</p>
    </div>
  );
}
