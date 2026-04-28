"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Sparkles, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { useQuizStore } from "@/app/store/quiz-store";
import Image from "next/image";
import runMan from "@/public/run-man.png";
import TextType from "@/components/TextType";
import LogoLoop from "@/components/LogoLoop";
import type { LogoItem } from "@/components/LogoLoop";

gsap.registerPlugin(ScrollTrigger);

const PLACEHOLDER_LOGOS: LogoItem[] = [
  {
    node: (
      <span className="font-bold tracking-tight text-white/25">
        FITNESS<span className="text-violet-400/40">PRO</span>
      </span>
    ),
  },
  {
    node: (
      <span className="font-bold tracking-tight text-white/25">
        BODY<span className="text-fuchsia-400/40">LAB</span>
      </span>
    ),
  },
  {
    node: (
      <span className="font-bold tracking-tight text-white/25">
        HEALTH<span className="text-rose-400/40">IQ</span>
      </span>
    ),
  },
  {
    node: (
      <span className="font-bold tracking-tight text-white/25">
        STRONG<span className="text-violet-400/40">LIFE</span>
      </span>
    ),
  },
  {
    node: (
      <span className="font-bold tracking-tight text-white/25">
        FIT<span className="text-fuchsia-400/40">HUB</span>
      </span>
    ),
  },
  {
    node: (
      <span className="font-bold tracking-tight text-white/25">
        VITAL<span className="text-rose-400/40">MAX</span>
      </span>
    ),
  },
  {
    node: (
      <span className="font-bold tracking-tight text-white/25">
        PEAK<span className="text-violet-400/40">FORM</span>
      </span>
    ),
  },
  {
    node: (
      <span className="font-bold tracking-tight text-white/25">
        MOTION<span className="text-fuchsia-400/40">LAB</span>
      </span>
    ),
  },
];

export default function WelcomePage() {
  const setHasStarted = useQuizStore((s) => s.setHasStarted);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-sub", { opacity: 0, filter: "blur(4px)" });
      gsap.set(".hero-logoloop", { opacity: 0, filter: "blur(4px)" });
      gsap.set(".card", { opacity: 0.15, filter: "blur(4px)", y: 30 });
      gsap.set(".cta-section", { opacity: 0.15, filter: "blur(3px)" });
      gsap.set(".cta-label", { opacity: 0, y: 12 });
      gsap.set(".cta-heading", { opacity: 0, y: 16 });
      gsap.set(".cta-sub", { opacity: 0, y: 12 });
      gsap.set(".cta-stats", { opacity: 0, y: 16 });
      gsap.set(".cta-btn", { opacity: 0, y: 16 });

      // Subtitle and logo loop fade in after text typing completes
      const heroReveal = gsap.timeline({ delay: 2.5, defaults: { ease: "power3.out" } });
      heroReveal
        .to(".hero-sub", { opacity: 1, filter: "blur(0px)", duration: 0.8 })
        .to(".hero-logoloop", { opacity: 1, filter: "blur(0px)", duration: 0.6 }, "-=0.4");

      gsap
        .timeline({
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 82%",
            end: "bottom 60%",
            scrub: 0.8,
          },
        })
        .to(".card", {
          opacity: 1,
          filter: "blur(0px)",
          x: 0,
          y: 0,
          stagger: { each: 0.15 },
          duration: 0.35,
          ease: "power2.out",
        });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            end: "top 30%",
            scrub: 0.6,
          },
        })
        .to(".cta-section", { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.1 })
        .to(".cta-label", { opacity: 1, y: 0, duration: 0.15 }, "-=0.05")
        .to(".cta-heading", { opacity: 1, y: 0, duration: 0.2 }, "-=0.1")
        .to(".cta-sub", { opacity: 1, y: 0, duration: 0.18 }, "-=0.1")
        .to(".cta-stats", { opacity: 1, y: 0, duration: 0.2 }, "-=0.1")
        .to(".cta-btn", { opacity: 1, y: 0, duration: 0.2 }, "-=0.1");

      gsap.to(".parallax-blob", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
        y: 60,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-zinc-950 text-white">
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-20 sm:px-12 lg:px-20"
      >
        <div className="parallax-blob absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

        {/* Left: Text */}
        <div className="relative z-10 flex w-full flex-col items-start gap-6 lg:w-1/2">
          <h1 className="max-w-xl text-left text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Transform Your Body
            <br />
            <TextType
              text={[
                "in 12 Weeks",
                "in 30 Days",
                "in 8 Weeks",
                "for Summer",
                "in 4 Weeks",
                "in 6 Weeks",
                "in 10 Weeks",
                "in 16 Weeks",
                "in 90 Days",
              ]}
              typingSpeed={65}
              deletingSpeed={35}
              initialDelay={800}
              pauseDuration={2500}
              loop={true}
              showCursor={true}
              cursorCharacter="_"
              cursorClassName="text-violet-400"
              textColors={[
                "#c4b5fd", // 浅紫 (12 Weeks)
                "#a78bfa", // 淡紫 (30 Days)
                "#8b5cf6", // 紫罗兰 (8 Weeks)
                "#7c3aed", // 紫色 (for Summer)
                "#6d28d9", // 深紫 (4 Weeks)
                "#4c1d95", // 暗紫 (6 Weeks)
                "#9333ea", // 亮紫 (10 Weeks)
                "#c026d3", // 紫红 (16 Weeks)
                "#d946ef", // 粉紫 (90 Days)
              ]}
            />
          </h1>

          <p className="hero-sub max-w-md text-left text-lg text-white/60">
            Take our 2-minute health assessment and get a personalized fitness & nutrition plan
            designed just for you.
          </p>

          <div className="hero-logoloop w-full max-w-xl overflow-hidden pt-6">
            <LogoLoop
              logos={PLACEHOLDER_LOGOS}
              speed={60}
              direction="left"
              logoHeight={18}
              gap={40}
              fadeOut={true}
              fadeOutColor="#09090b"
            />
          </div>
        </div>

        {/* Right: Run Man */}
        <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
          <Image src={runMan} alt="Run man" className="h-full w-full object-contain object-right" />
        </div>
      </section>

      <section className="px-6 pb-24">
        <div ref={cardsRef} className="mx-auto max-w-4xl">
          {/* Bento grid: row 1 — wide left + narrow right */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
            <div
              className="card sm:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-8"
              style={{ transform: "translateX(-40px)" }}
            >
              <span className="inline-block rounded-full bg-violet-500/15 px-3 py-0.5 text-xs font-medium text-violet-300">
                Quick & Smart
              </span>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15">
                  <Clock className="h-7 w-7 text-violet-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Done in 2 Minutes</h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-white/50">
                No lengthy forms or confusing questions. Our smart assessment adapts in real-time to
                your answers — asking only what matters so you reach your plan faster.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Gender", "Body Data", "Goals", "Frequency"].map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/40"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="card sm:col-span-2 rounded-3xl border border-violet-500/20 bg-violet-500/5 p-8"
              style={{ transform: "translateX(40px)" }}
            >
              <span className="inline-block rounded-full bg-violet-500/15 px-3 py-0.5 text-xs font-medium text-violet-300">
                Data-Driven
              </span>
              <TrendingUp className="mt-6 h-10 w-10 text-violet-400" />
              <h3 className="mt-4 text-xl font-bold leading-tight text-white">
                See Progress Before You Start
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                Projected weight timeline and estimated goal date — clear milestones before you
                commit.
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-violet-300">12</span>
                <span className="text-lg font-semibold text-violet-400/60">wks</span>
              </div>
            </div>
          </div>

          {/* Row 2 — narrow left + wide right */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-5">
            <div
              className="card sm:col-span-2 rounded-3xl border border-fuchsia-500/20 bg-fuchsia-500/5 p-8"
              style={{ transform: "translateX(-40px)" }}
            >
              <span className="inline-block rounded-full bg-fuchsia-500/15 px-3 py-0.5 text-xs font-medium text-fuchsia-300">
                Science-Backed
              </span>
              <p className="mt-6 text-5xl font-extrabold text-white">
                100<span className="text-fuchsia-400">%</span>
              </p>
              <p className="mt-1 text-sm font-medium text-fuchsia-300/80">Personalized to you</p>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                Every recommendation calculated from your body metrics, goal, and lifestyle. Not a
                template.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-fuchsia-500/10 px-4 py-3">
                <Sparkles className="h-5 w-5 text-fuchsia-400" />
                <span className="text-sm text-fuchsia-300/80">3,200+ data points analyzed</span>
              </div>
            </div>

            <div
              className="card sm:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-8"
              style={{ transform: "translateX(40px)" }}
            >
              <span className="inline-block rounded-full bg-violet-500/15 px-3 py-0.5 text-xs font-medium text-violet-300">
                Fully Personalized
              </span>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15">
                  <Target className="h-7 w-7 text-violet-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Your Plan, Not a Template</h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-white/50">
                Every recommendation is calculated from your body data, fitness goal, and activity
                level — a meal plan and workout routine built specifically for you.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Meal Plan", "Workout Routine", "Progress Tracking", "AI Coaching"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-white/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width CTA with background */}
      <section
        ref={ctaRef}
        className="cta-section relative overflow-hidden border-t border-white/5 pb-28 pt-24"
      >
        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-violet-600/8 blur-[100px]" />
          <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/8 blur-[120px]" />
          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <p className="cta-label text-sm font-medium uppercase tracking-[0.2em] text-violet-400/60">
            Your journey starts here
          </p>

          <h2 className="cta-heading mt-6 text-3xl font-extrabold text-white sm:text-5xl">
            Ready to{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              transform
            </span>{" "}
            your body?
          </h2>

          <p className="cta-sub mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/40">
            Join thousands who&apos;ve already reshaped their physique with our personalized,
            science-backed fitness plans.
          </p>

          {/* Mini stats row */}
          <div className="cta-stats mt-10 flex items-center justify-center gap-8 sm:gap-16">
            {[
              { value: "12K+", label: "Active Users" },
              { value: "92%", label: "Goal Achieved" },
              { value: "4.9", label: "Avg Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-white/30">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="cta-btn relative mx-auto mt-12 flex w-fit">
            <div className="absolute inset-0 scale-125 rounded-3xl bg-violet-500/20 blur-2xl" />
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setHasStarted(true)}
              className="relative flex items-center gap-3 rounded-2xl bg-violet-500 px-12 py-5 text-lg font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:bg-violet-400 hover:shadow-violet-400/30"
            >
              Begin Assessment
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>

          {/* <p className="mt-6 text-xs text-white/20">Free · Takes 2 minutes · No credit card required</p> */}
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-8 text-center text-xs text-white/20">
        &copy; {new Date().getFullYear()} Health Assessment. All rights reserved.
      </footer>
    </div>
  );
}
