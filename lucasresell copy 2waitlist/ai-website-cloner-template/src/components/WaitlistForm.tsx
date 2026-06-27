"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

// ============================================================
// Questions
// ============================================================

type Question =
  | { type: "choice"; heading: string; description?: string; options: { value: string; label: string }[] }
  | { type: "text"; heading: string; fields: { key: string; placeholder: string; prefix?: string }[] };

const questions: Question[] = [
  {
    type: "choice",
    heading: "How long have you been reselling?",
    options: [
      { value: "just-starting", label: "I'm just starting" },
      { value: "less-than-6m", label: "Less than 6 months" },
      { value: "6m-1y", label: "6 months - 1 year" },
      { value: "1y-2y", label: "1 - 2 years" },
      { value: "2y-plus", label: "2+ years" },
    ],
  },
  {
    type: "choice",
    heading: "What's your long term goal with reselling?",
    options: [
      { value: "full-time-income", label: "Full time income" },
      { value: "side-hustle", label: "Side hustle / extra income" },
      { value: "brand-social", label: "Build a brand on social media" },
      { value: "bulk-supply", label: "Bulk supplying to stores" },
    ],
  },
  {
    type: "choice",
    heading: "How old are you?",
    options: [
      { value: "13-17", label: "13 - 17" },
      { value: "18-23", label: "18 - 23" },
      { value: "24-35", label: "24 - 35" },
      { value: "35-plus", label: "35+" },
    ],
  },
  {
    type: "text",
    heading: "What's your Instagram @?",
    fields: [{ key: "instagram", placeholder: "@yourusername" }],
  },
  {
    type: "text",
    heading: "Got it, and what's the best email to reach you at?",
    fields: [{ key: "email", placeholder: "your@email.com" }],
  },
  {
    type: "text",
    heading: "And your name and phone number?",
    fields: [
      { key: "name", placeholder: "Full Name" },
      { key: "phone", placeholder: "+1 ", prefix: "+1 " },
    ],
  },
  {
    type: "choice",
    heading: "What budget range do you have for this?",
    description:
      "My program involves an upfront investment to help you scale to $5K–$30K+ per month.",
    options: [
      { value: "under-200", label: "Under $200 USD" },
      { value: "200-500", label: "$200 - $500 USD" },
      { value: "500-1k", label: "$500 - $1K USD" },
      { value: "1k-3k", label: "$1K - $3K USD" },
      { value: "3k-plus", label: "$3K+ USD" },
    ],
  },
];

const totalSteps = questions.length;

// ============================================================
// Component
// ============================================================

export function WaitlistForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = questions[step];
  if (!question) return null;

  const currentAnswer =
    question.type === "choice"
      ? answers[`q${step}`] ?? null
      : undefined;

  const textValues =
    question.type === "text"
      ? Object.fromEntries(question.fields.map((f) => [f.key, answers[f.key] ?? ""]))
      : {};

  const canAdvance =
    question.type === "choice"
      ? currentAnswer !== null
      : question.fields.every((f) => (answers[f.key] ?? "").trim().length > 0);

  const handleChoice = (value: string) => {
    setAnswers((prev) => ({ ...prev, [`q${step}`]: value }));
  };

  const handleTextChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const advance = () => {
    if (!canAdvance) return;
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      window.location.href = "/lucas-resell/waitlist-thank-you";
    }
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const isLastStep = step === totalSteps - 1;
  const buttonLabel = isLastStep ? "Submit" : "OK";

  // ==========================================================
  // Render
  // ==========================================================
  return (
    <section
      id="application-form"
      className="relative w-full bg-transparent z-[2000000]"
      style={{
        paddingTop: "clamp(30px, 16px + 2.2vw, 46px)",
        paddingBottom: "clamp(30px, 16px + 2.2vw, 46px)",
        paddingLeft: "clamp(0.85rem, 4vw, 1.5rem)",
        paddingRight: "clamp(0.85rem, 4vw, 1.5rem)",
      }}
    >
      {/* ── Card ── */}
      <div
        className="mx-auto flex flex-col bg-black rounded-2xl overflow-hidden"
        style={{
          maxWidth: "700px",
          padding:
            "clamp(0.625rem, 2vw, 1.25rem) clamp(0.875rem, 3vw, 1.75rem)",
          minHeight: "clamp(360px, 52vh, 560px)",
          border: "2px solid rgba(57, 255, 20, 0.3)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* ── Body ── */}
        <div className="flex flex-col flex-1 justify-center">
          {/* Step badge */}
          <span
            className="inline-flex items-center justify-center font-heading font-bold text-(--brand-green) rounded-xl mb-3 self-start"
            style={{
              width: "clamp(2.5rem, 10vw, 3rem)",
              height: "clamp(2.5rem, 10vw, 3rem)",
              background: "rgba(57, 255, 20, 0.1)",
              fontSize: "clamp(1rem, 4vw, 1.25rem)",
              animation:
                "clyro-step-up 500ms cubic-bezier(0.22, 1, 0.36, 1) 60ms forwards",
            }}
          >
            {step + 1}
          </span>

          {/* Heading */}
          <div
            className="text-left"
            style={{
              marginBottom: "clamp(1rem, 3.5vw, 1.75rem)",
              animation:
                "clyro-step-up 500ms cubic-bezier(0.22, 1, 0.36, 1) 110ms forwards",
            }}
          >
            <h3 className="font-heading text-[32px] leading-[44.8px] font-medium text-[rgb(200,200,200)] m-0">
              {question.heading}
            </h3>
            {"description" in question && question.description && (
              <p className="font-heading text-[15px] leading-[22px] text-[rgb(150,150,150)] mt-3 m-0">
                {question.description}
              </p>
            )}
          </div>

          {/* ── Choice options ── */}
          {question.type === "choice" && (
            <div className="flex flex-col gap-2">
              {question.options.map((opt) => {
                const active = currentAnswer === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleChoice(opt.value)}
                    className={`
                      flex items-center text-left cursor-pointer w-full font-heading
                      gap-3 rounded-[0.625rem] border transition-all duration-200
                      py-[clamp(0.4rem,1.6vw,0.5rem)] px-[clamp(0.75rem,2.5vw,0.875rem)]
                      ${
                        active
                          ? "border-[#39ff14] bg-[rgba(57,255,20,0.08)] text-white"
                          : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-[rgb(200,200,200)]"
                      }
                    `}
                    style={{ fontSize: "16px", fontWeight: 400, lineHeight: "normal" }}
                  >
                    <span
                      className={`font-semibold transition-colors duration-200 ${
                        active ? "text-white" : "text-[rgba(255,255,255,0.7)]"
                      }`}
                    >
                      {opt.value}
                    </span>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Text inputs ── */}
          {question.type === "text" && (
            <div className="flex flex-col gap-3">
              {question.fields.map((field) => (
                <input
                  key={field.key}
                  type={field.key === "email" ? "email" : "text"}
                  placeholder={field.placeholder}
                  value={textValues[field.key]}
                  onChange={(e) => handleTextChange(field.key, e.target.value)}
                  className="
                    w-full font-heading text-base text-white
                    bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)]
                    rounded-[0.625rem] px-4 py-[clamp(0.65rem,2vw,0.85rem)]
                    placeholder:text-[rgb(120,120,120)]
                    focus:outline-none focus:border-[#39ff14] focus:bg-[rgba(57,255,20,0.04)]
                    transition-all duration-200
                  "
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between flex-shrink-0 mt-4">
          {/* Back */}
          <button
            type="button"
            disabled={step === 0}
            onClick={goBack}
            className={`
              flex items-center gap-2 font-heading text-base
              py-3 px-4 rounded-lg bg-transparent border-none
              transition-colors duration-200
              ${
                step === 0
                  ? "text-transparent pointer-events-none"
                  : "text-[rgb(200,200,200)] hover:text-white cursor-pointer"
              }
            `}
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>

          {/* OK / Submit */}
          <button
            type="button"
            disabled={!canAdvance}
            onClick={advance}
            className={`
              inline-flex items-center gap-3 font-heading font-semibold cursor-pointer
              py-[0.875rem] px-[1.75rem] rounded-[0.75rem] border-none
              transition-all duration-200
              ${
                !canAdvance
                  ? "bg-[rgba(255,255,255,0.03)] text-[rgb(120,120,120)] opacity-60"
                  : "bg-[#39ff14] text-black hover:bg-[#2ecc10] active:scale-[0.98]"
              }
            `}
            style={{ fontSize: "clamp(1rem, 3.2vw, 1.125rem)" }}
          >
            {buttonLabel}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* ── Progress dots ── */}
        <div className="flex justify-center gap-2 flex-shrink-0 mt-4">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                height: "0.5rem",
                width: i === step ? "1.5rem" : "0.5rem",
                background:
                  i === step ? "#39FF14" : "rgba(255, 255, 255, 0.12)",
              }}
            />
          ))}
        </div>

        {/* ── Clyro attribution ── */}
        <a
          href="https://clyro.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center font-heading no-underline gap-[0.375rem] mt-4 text-sm text-[rgb(120,120,120)] hover:text-[rgb(180,180,180)] transition-colors"
        >
          Form built with Clyro
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* ── Animations ── */}
      <style>{`
        @keyframes clyro-step-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
