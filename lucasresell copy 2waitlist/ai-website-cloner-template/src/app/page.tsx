import { GradientHeading } from "@/components/GradientHeading";
import { WaitlistForm } from "@/components/WaitlistForm";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WinsSection } from "@/components/WinsSection";
import { CtaButton } from "@/components/CtaButton";
import Grainient from "@/components/Grainient";
import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Header section */}
        <section className="pt-[68px] pb-6 px-4">
          <GradientHeading
            as="h1"
            className="max-w-[670px] text-[52.8px] leading-[58.08px] font-extrabold -tracking-[0.02em] bg-[linear-gradient(167deg,#fff_0%,#919191_100%)]"
          >
            The Inner Circle Is Currently Closed
          </GradientHeading>

          <p className="mx-auto mt-[25px] max-w-[510px] text-[20px] leading-[30px] text-[#d4d4d4]">
            We&apos;re not accepting new applications right now, but join the
            waitlist below to be first in line when spots open up.
          </p>
        </section>

        {/* Waitlist form section */}
        <section className="w-full">
          <div className="pt-0">
            <GradientHeading
              as="h1"
              className="text-[47.8px] leading-[52.58px] font-bold -tracking-[0.02em] bg-[linear-gradient(135deg,#fff_0%,#969696_100%)]"
            >
              Join the Waitlist
            </GradientHeading>
          </div>

          <WaitlistForm />
        </section>

        {/* Testimonials section */}
        <TestimonialsSection />

        {/* CTA */}
        <section className="py-8 px-4">
          <CtaButton>Get Started Now</CtaButton>
        </section>

        {/* Wins section */}
        <WinsSection />

        {/* CTA */}
        <section className="py-8 px-4">
          <CtaButton>Get Started Now</CtaButton>
        </section>

        {/* Footer */}
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
