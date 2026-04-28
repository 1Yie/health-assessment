import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Unit = "metric" | "imperial";
export type Gender = "male" | "female";
export type Goal = "lose_weight" | "gain_muscle" | "tone";

interface QuizState {
  hasStarted: boolean;
  currentStep: number;
  gender: Gender | null;
  goal: Goal | null;
  unit: Unit;
  age: number | null;
  height: number | null;
  weight: number | null;
  targetWeight: number | null;
  exerciseFrequency: string | null;

  setHasStarted: (v: boolean) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setGender: (gender: Gender) => void;
  setGoal: (goal: Goal) => void;
  setUnit: (unit: Unit) => void;
  setAge: (age: number) => void;
  setHeight: (height: number) => void;
  setWeight: (weight: number) => void;
  setTargetWeight: (weight: number) => void;
  setExerciseFrequency: (freq: string) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      hasStarted: false,
      currentStep: 0,
      gender: null,
      goal: null,
      unit: "metric",
      age: null,
      height: null,
      weight: null,
      targetWeight: null,
      exerciseFrequency: null,

      setHasStarted: (hasStarted) => set({ hasStarted }),
      setStep: (step) => set({ currentStep: step }),
      nextStep: () =>
        set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(0, state.currentStep - 1),
        })),
      setGender: (gender) => set({ gender }),
      setGoal: (goal) => set({ goal }),
      setUnit: (unit) => set({ unit }),
      setAge: (age) => set({ age }),
      setHeight: (height) => set({ height }),
      setWeight: (weight) => set({ weight }),
      setTargetWeight: (targetWeight) => set({ targetWeight }),
      setExerciseFrequency: (exerciseFrequency) => set({ exerciseFrequency }),
      reset: () =>
        set({
          hasStarted: false,
          currentStep: 0,
          gender: null,
          goal: null,
          unit: "metric",
          age: null,
          height: null,
          weight: null,
          targetWeight: null,
          exerciseFrequency: null,
        }),
    }),
    {
      name: "quiz-funnel-storage",
    }
  )
);
