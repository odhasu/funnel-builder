"use client";

import { useEffect, useState } from "react";
import { GradientHeading } from "@/components/GradientHeading";
import { TestimonialCard } from "@/components/TestimonialCard";
import Grainient from "@/components/Grainient";
import {
  Phone,
  MessageCircle,
  Play,
  ExternalLink,
} from "lucide-react";

// -------------------------------------------------------
// Data
// -------------------------------------------------------

const testimonials = [
  {
    title: "He makes $25,000/m selling unbranded glasses",
    thumbnailUrl: "https://i.ytimg.com/vi/IE0_sR4QfRg/hqdefault.jpg",
  },
  {
    title: "He's Doing $20,000/Month With High Ticket Reselling",
    thumbnailUrl: "https://i.ytimg.com/vi/-yUZ4U91dVQ/hqdefault.jpg",
  },
  {
    title: "$0 to $30,000/Month in 6 Months",
    thumbnailUrl: "https://i.ytimg.com/vi/7xr2eSPviGM/hqdefault.jpg",
  },
  {
    title: "16 Year Old: $0 → $27K/Month",
    thumbnailUrl: "https://i.ytimg.com/vi/K4zdxmcqkcQ/hqdefault.jpg",
  },
  {
    title: "15 Year Old Hitting $22K/Month",
    thumbnailUrl: "https://i.ytimg.com/vi/evjICkbXsig/hqdefault.jpg",
  },
  {
    title: "From Trampoline Park to $21K/Month",
    thumbnailUrl: "https://i.ytimg.com/vi/uP7VTQFMmFY/hqdefault.jpg",
  },
  {
    title: "He Bought a C8 Corvette From Reselling",
    thumbnailUrl: "https://i.ytimg.com/vi/fX0Jrb7-bkI/hqdefault.jpg",
  },
  {
    title: "16 Year Old: $0 → $8K/Month",
    thumbnailUrl: "https://i.ytimg.com/vi/A8NgC6evgpA/hqdefault.jpg",
  },
  {
    title: "16 Year Old Made $70,000 With High Ticket Reselling",
    thumbnailUrl: "https://i.ytimg.com/vi/I80B0-LlEUk/hqdefault.jpg",
  },
  {
    title: "He's 15 and Makes $10,000/Month",
    thumbnailUrl: "https://i.ytimg.com/vi/JsOt0YROtMk/hqdefault.jpg",
  },
];

const wins = [
  {
    src: "https://cdn.clyro.io/images/variants/img_QRRPzkCGFMuT9xArHuNWR/1920.jpeg",
    alt: "Testimonial image 1",
  },
  {
    src: "https://cdn.clyro.io/images/variants/img_X-biZtVijL98kAR1jwMKy/1920.jpeg",
    alt: "Testimonial image 2",
  },
  {
    src: "https://cdn.clyro.io/images/variants/img_yuCHlV6azfzk7a5jI1nIN/1920.jpeg",
    alt: "Testimonial image 3",
  },
  {
    src: "https://cdn.clyro.io/images/variants/img_OaIs3mxhFiRjjSUmK-9qk/1920.jpeg",
    alt: "Testimonial image 4",
  },
  {
    src: "https://cdn.clyro.io/images/variants/img_5enDm-0QLyhy8nEdfE3f4/1920.jpeg",
    alt: "Testimonial image 5",
  },
  {
    src: "https://cdn.clyro.io/images/variants/img_C3GXvDC7rELhMzxetJ-qP/1920.jpeg",
    alt: "Testimonial image 6",
  },
  {
    src: "https://cdn.clyro.io/images/variants/img_Id5zYTtOzzULo8KWdh7Ac/1920.jpeg",
    alt: "Testimonial image 7",
  },
  {
    src: "https://cdn.clyro.io/images/variants/img_c8UoUK-ppzWBG01LCZUaZ/1920.jpeg",
    alt: "Testimonial image 8",
  },
];

const steps = [
  {
    num: 1,
    title: "Watch for a Call or Text",
    desc: "We may reach out by phone or text within the next couple of hours. Save our number and make sure your notifications are on so you don't miss the call.",
    icon: Phone,
  },
  {
    num: 2,
    title: "Respond Right Away",
    desc: "If you've been selected, respond as soon as you hear from us. Spots are limited and they'll go to the next applicant if we can't get a hold of you.",
    icon: MessageCircle,
  },
  {
    num: 3,
    title: "Watch This While You Wait",
    desc: "While you wait, watch this overview so you're ready to move fast if you get the call.",
    icon: Play,
  },
];

// -------------------------------------------------------
// Page
// -------------------------------------------------------

export default function WaitlistThankYou() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Background */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <Grainient
          color1="#040404"
          color2="#6e6e6e"
          color3="#171717"
          timeSpeed={0.7}
          colorBalance={-0.01}
          warpStrength={4}
          warpFrequency={5.6}
          warpSpeed={1.5}
          warpAmplitude={55}
          blendAngle={156}
          blendSoftness={0.34}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* ── Redirect banner ── */}
        {countdown > 0 && (
          <div className="w-full bg-[#39ff14] text-black text-center py-3 font-heading font-semibold text-sm">
            Your spot has been secured! Redirecting in {countdown}…
          </div>
        )}

        {/* ── Hero ── */}
        <section className="pt-[68px] pb-8 px-4">
          <GradientHeading
            as="h1"
            className="max-w-[670px] text-[52.8px] leading-[58.08px] font-extrabold -tracking-[0.02em] bg-[linear-gradient(167deg,#fff_0%,#919191_100%)]"
          >
            You&apos;re on the Waitlist!
          </GradientHeading>

          <p className="mx-auto mt-4 max-w-[510px] text-[20px] leading-[30px] text-[#d4d4d4] font-heading">
            You Just Applied to the Waitlist
          </p>

          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-[26px] text-[rgb(180,180,180)] font-heading">
            Lucas is only letting a select few applicants join the program
            early. Be on the lookout for a phone call or text within the next
            couple of hours — if you don&apos;t respond, you&apos;ll miss your
            opportunity.
          </p>
        </section>

        {/* ── Important notice ── */}
        <section className="w-full max-w-[620px] mx-4 px-6 py-5 rounded-xl border border-[rgba(255,200,50,0.25)] bg-[rgba(255,200,50,0.05)] text-left mb-14">
          <h3 className="font-heading text-[18px] font-bold text-[#ffc832] mb-2">
            Important!
          </h3>
          <p className="font-heading text-[15px] leading-[22px] text-[rgb(200,200,200)] m-0">
            Keep your phone close and your notifications on. If we reach out
            and you don&apos;t respond, your spot will be given to someone
            else.
          </p>
        </section>

        {/* ── 3 Steps ── */}
        <section className="w-full max-w-[820px] mx-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="flex flex-col items-center text-center p-6 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(57,255,20,0.1)] text-[#39ff14] font-heading font-bold text-sm mb-4">
                    {s.num}
                  </span>
                  <h4 className="font-heading text-[17px] font-semibold text-white mb-2 leading-[24px]">
                    {s.title}
                  </h4>
                  <p className="font-heading text-[14px] leading-[21px] text-[rgb(160,160,160)] m-0">
                    {s.desc}
                  </p>
                  <Icon className="h-5 w-5 text-[rgb(120,120,120)] mt-4" />
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Video embed placeholder ── */}
        <section className="w-full max-w-[700px] mx-4 mb-16">
          <div className="aspect-video rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] flex items-center justify-center">
            <Play className="h-12 w-12 text-[#39ff14] opacity-60" />
          </div>
        </section>

        {/* ── Case Studies ── */}
        <section className="px-4 py-[38px] w-full">
          <h2 className="font-heading text-[47.8px] leading-[52.58px] font-bold text-white mb-12">
            See Case Studies from Top Resellers
          </h2>

          <div className="mx-auto max-w-[75%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {testimonials.map((t) => (
                <TestimonialCard
                  key={t.thumbnailUrl}
                  title={t.title}
                  thumbnailUrl={t.thumbnailUrl}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Wins Grid ── */}
        <section className="px-4 py-[38px] w-full">
          <h2 className="font-heading text-[45.8px] leading-[50.38px] font-bold -tracking-[0.025em] text-white mb-10">
            More Inner Circle Wins:
          </h2>

          <div className="mx-auto max-w-[75%]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {wins.map((win) => (
                <div
                  key={win.src}
                  className="aspect-square overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.15)] transition-colors"
                >
                  <img
                    src={win.src}
                    alt={win.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="w-full flex justify-center px-4 py-9">
          <a
            href="https://clyro.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[6px] px-[10.8px] text-sm text-[#919191] hover:text-white transition-colors"
          >
            Built using clyro
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </footer>
      </div>
    </main>
  );
}
