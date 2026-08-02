import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Zap, RefreshCw, Check, Sparkles, Terminal, Image as ImageIcon, MessageSquare } from 'lucide-react';

const MODES = [
  { id: 'text', name: 'Text Mode', model: 'Gemini 2.5 Flash', cost: '1 Credit', accent: '#7C3AED' },
  { id: 'image', name: 'Image Mode', model: 'ImageKit AI Studio', cost: '2 Credits', accent: '#7C3AED' }
];

const PROMPTS = [
  {
    mode: 'text',
    query: "Explain how Propel handles multi-turn conversation context and credit deductions.",
    response: "Propel maintains conversation history in MongoDB while streaming responses from Google Gemini 2.5 Flash. Each text prompt consumes exactly 1 credit from your user balance."
  },
  {
    mode: 'image',
    query: "A futuristic AI infrastructure server in dark purple ambient light, high resolution",
    response: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  }
];

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeMode, setActiveMode] = useState(MODES[0]);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#0B0A12] text-[#F4F2F8] bg-noise flex flex-col items-center justify-between pb-16 overflow-hidden"
    >
      {/* Flat Blurred Circle Cursor Follow */}
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute w-[450px] h-[450px] rounded-full bg-[#7C3AED] opacity-[0.12] transition-transform duration-300 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            filter: 'blur(90px)'
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Centered Hero Container */}
      <div className="relative z-10 max-w-[1340px] w-full text-center flex flex-col items-center pt-8 sm:pt-12 px-4 sm:px-6 lg:px-8">

        {/* 1. Eyebrow Badge */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#151320] border border-white/10 mb-6 sm:mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" aria-hidden="true" />
          <span className="text-[12px] font-medium tracking-[0.12em] text-[#F4F2F8] uppercase">
            Propel AI · 30 free credits on signup
          </span>
        </motion.div>

        {/* 2. Headline */}
        <motion.h1
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-geist text-[40px] sm:text-[58px] lg:text-[72px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#F4F2F8] max-w-[1150px] mb-6"
        >
          Intelligent text & image AI.{' '}
          <span className="text-[#7C3AED] underline decoration-[#7C3AED] underline-offset-8 decoration-2">One seamless platform.</span>
        </motion.h1>

        {/* 3. Subheadline */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[17px] sm:text-[19px] text-[#9C97AE] leading-[1.6] max-w-[850px] mb-9 font-normal"
        >
          Generate <strong className="text-[#F4F2F8] font-medium">multi-turn text responses</strong> and <strong className="text-[#F4F2F8] font-medium">high-resolution AI artwork</strong> with <strong className="text-[#F4F2F8] font-medium">transparent credit pricing</strong> and <strong className="text-[#F4F2F8] font-medium">instant Razorpay top-ups</strong>.
        </motion.p>

        {/* 4. CTA Row */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10 sm:mb-12"
        >
          {/* Primary Button */}
          <a
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium text-[16px] transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0B0A12] cursor-pointer shadow-lg"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>

          {/* Secondary Button */}
          <a
            href="/docs"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl bg-transparent hover:bg-[#151320] text-[#F4F2F8] border border-white/15 font-medium text-[16px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#0B0A12] cursor-pointer"
          >
            Read User Guide
          </a>
        </motion.div>

        {/* 5. Stat Row */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[14px] sm:text-[16px] text-[#9C97AE] mb-4 sm:mb-5"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>30 Free Credits Included</span>
          </div>
          <span className="hidden sm:inline w-[1px] h-4 bg-white/10" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>Gemini 2.5 + ImageKit AI</span>
          </div>
          <span className="hidden sm:inline w-[1px] h-4 bg-white/10" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
            <span>Instant Razorpay Top-ups</span>
          </div>
        </motion.div>

        {/* 6. Platform Capabilities & Interactive Studio Anchor Card */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="w-full max-w-4xl mx-auto my-6 sm:my-8"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-[#151320] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#7C3AED] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-[#F4F2F8] font-geist">Interactive AI Studio Preview</h4>
                <p className="text-[12px] text-[#9C97AE]">Experience real-time Gemini 2.5 & ImageKit output below</p>
              </div>
            </div>

            <a
              href="#interactive-studio"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('interactive-studio')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B0A12] border border-white/10 text-[13px] font-medium text-[#7C3AED] hover:text-white hover:border-[#7C3AED]/40 transition-all cursor-pointer shrink-0"
            >
              <span>Test Studio Below</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-90" />
            </a>
          </div>
        </motion.div>

        {/* 7. Product Preview Card (Interactive Studio Section - Scroll Target) */}
        <div id="interactive-studio" className="w-full pt-12 sm:pt-16 lg:pt-20">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="w-full text-left bg-[#151320] border border-white/[0.08] rounded-[20px] p-4 sm:p-6 shadow-2xl overflow-hidden"
          >
            {/* Header Bar: Mode Tabs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 mr-3">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block" />
                </div>
                <span className="text-[12px] font-mono text-[#9C97AE] uppercase tracking-wider hidden sm:inline">
                  Interactive Studio
                </span>
              </div>

              {/* Mode Selector Pills */}
              <div className="flex flex-wrap items-center gap-1.5 bg-[#0B0A12] p-1 rounded-lg border border-white/[0.06]">
                {MODES.map((modeItem) => {
                  const isActive = activeMode.id === modeItem.id;
                  return (
                    <button
                      key={modeItem.id}
                      onClick={() => {
                        setActiveMode(modeItem);
                        const targetIdx = PROMPTS.findIndex(p => p.mode === modeItem.id);
                        if (targetIdx !== -1) setActivePromptIndex(targetIdx);
                      }}
                      className={`px-3.5 py-1.5 rounded-md text-[12px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${isActive
                        ? 'bg-[#7C3AED] text-white'
                        : 'text-[#9C97AE] hover:text-[#F4F2F8] hover:bg-white/[0.04]'
                        }`}
                    >
                      {modeItem.id === 'text' ? <MessageSquare className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                      {modeItem.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Mode Meta Bar */}
            <div className="flex items-center justify-between py-2.5 px-3 my-3 bg-[#0B0A12] rounded-md border border-white/[0.04] text-[12px] text-[#9C97AE]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <strong className="text-[#F4F2F8] font-normal">{activeMode.model}</strong>
                </span>
                <span>• Rate: <strong className="text-[#F4F2F8] font-normal">{activeMode.cost}</strong></span>
              </div>
              <button
                onClick={() => setActivePromptIndex((prev) => (prev + 1) % PROMPTS.length)}
                className="flex items-center gap-1 text-[#7C3AED] hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Toggle Demo Prompt</span>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 font-mono text-[13px] sm:text-[14px]">
              {/* User Message */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-xs font-sans text-[#F4F2F8]">
                  You
                </div>
                <div className="flex-1 bg-[#0B0A12] border border-white/[0.06] rounded-lg p-3 text-[#F4F2F8]">
                  {PROMPTS[activePromptIndex].query}
                </div>
              </div>

              {/* AI Response */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md bg-[#7C3AED] flex items-center justify-center text-xs font-sans text-white font-bold">
                  P
                </div>
                <div className="flex-1 bg-[#0B0A12] border border-white/[0.06] rounded-lg p-3 text-[#F4F2F8] overflow-hidden">
                  {PROMPTS[activePromptIndex].mode === 'image' ? (
                    <div className="space-y-2">
                      <p className="text-[12px] text-[#9C97AE]">✓ Image generated successfully (2 Credits)</p>
                      <img
                        src={PROMPTS[activePromptIndex].response}
                        alt="AI Generation Preview"
                        className="w-full max-h-[300px] object-cover rounded-md border border-white/10"
                      />
                    </div>
                  ) : (
                    <p className="leading-relaxed">{PROMPTS[activePromptIndex].response}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

    </div>
  );
};

export default Hero;
