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
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [copied, setCopied] = useState(false);

  // Mouse cursor tracking for flat blurred circle (no radial gradient)
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

  // Typing animation effect for chat preview
  useEffect(() => {
    const currentPrompt = PROMPTS[activePromptIndex];
    if (currentPrompt.mode === 'text') {
      const fullText = currentPrompt.response;
      setTypedText('');
      setIsTyping(true);
      let index = 0;

      const timer = setInterval(() => {
        if (index < fullText.length) {
          setTypedText((prev) => prev + fullText.charAt(index));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 14);

      return () => clearInterval(timer);
    } else {
      setIsTyping(false);
    }
  }, [activePromptIndex, activeMode]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PROMPTS[activePromptIndex].response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden bg-[#0B0A12] text-[#F4F2F8] bg-noise"
    >
      {/* Flat Blurred Circle Cursor Follow (Disabled if prefers-reduced-motion) */}
      {!prefersReducedMotion && (
        <div 
          className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-[#7C3AED] opacity-[0.12] transition-transform duration-300 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            filter: 'blur(90px)'
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Centered Hero Container (max-w 1340px for wide desktop layout) */}
      <div className="relative z-10 max-w-[1340px] w-full text-center flex flex-col items-center">
        
        {/* 1. Eyebrow Badge */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#151320] border border-white/10 mb-8"
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
          className="font-geist text-[40px] sm:text-[58px] lg:text-[72px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#F4F2F8] max-w-[1150px] mb-6"
        >
          Intelligent text & image AI.{' '}
          <span className="text-[#7C3AED] underline decoration-[#7C3AED] underline-offset-8 decoration-2">One seamless platform.</span>
        </motion.h1>

        {/* 3. Subheadline */}
        <motion.p 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[17px] sm:text-[19px] text-[#9C97AE] leading-[1.6] max-w-[850px] mb-8 font-normal"
        >
          Generate <strong className="text-[#F4F2F8] font-medium">multi-turn text responses</strong> and <strong className="text-[#F4F2F8] font-medium">high-resolution AI artwork</strong> with <strong className="text-[#F4F2F8] font-medium">transparent credit pricing</strong> and <strong className="text-[#F4F2F8] font-medium">instant Razorpay top-ups</strong>.
        </motion.p>

        {/* 4. CTA Row */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12"
        >
          {/* Primary Button */}
          <a 
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium text-[16px] transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0B0A12] cursor-pointer"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>

          {/* Secondary Button */}
          <a 
            href="/docs"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-transparent hover:bg-[#151320] text-[#F4F2F8] border border-white/15 font-medium text-[16px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#0B0A12] cursor-pointer"
          >
            Read User Guide
          </a>
        </motion.div>

        {/* 5. Stat Row */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[14px] sm:text-[16px] text-[#9C97AE] mb-14"
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

        {/* 6. Product Preview Card */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full text-left bg-[#151320] border border-white/[0.08] rounded-[16px] p-4 sm:p-6 shadow-2xl overflow-hidden"
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
                    className={`px-3.5 py-1.5 rounded-md text-[12px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isActive
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

            {/* Assistant Response */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-[#7C3AED] flex items-center justify-center text-xs font-sans text-white font-bold">
                P
              </div>
              <div className="flex-1 bg-[#0B0A12] border border-white/[0.08] rounded-lg p-3 text-[#F4F2F8] relative">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.04] text-[11px] text-[#9C97AE]">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>Response via {activeMode.model}</span>
                  </span>
                  {activeMode.id === 'text' && (
                    <button 
                      onClick={handleCopyCode}
                      className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Terminal className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>

                {activeMode.id === 'text' ? (
                  <pre className="whitespace-pre-wrap font-mono text-[#9C97AE] leading-relaxed">
                    {typedText}
                    {isTyping && <span className="inline-block w-2 h-4 bg-[#7C3AED] ml-0.5 animate-pulse" />}
                  </pre>
                ) : (
                  <div className="space-y-2">
                    <img 
                      src={PROMPTS[activePromptIndex].response} 
                      alt="AI Generated Artwork" 
                      className="w-full h-48 sm:h-60 object-cover rounded-lg border border-white/10"
                    />
                    <div className="flex items-center justify-between text-[11px] text-[#9C97AE]">
                      <span>Image generated & stored via ImageKit</span>
                      <span className="text-[#10B981]">Community Publish Supported</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
