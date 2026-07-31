import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Zap, ShieldCheck, Code2, Sparkles, Image as ImageIcon, MessageSquare, CreditCard, Users } from 'lucide-react';

const HIGHLIGHTS = [
  {
    quote: "30 Free Credits on sign-up to test text reasoning & image creation instantly.",
    author: "User Onboarding",
    role: "Core Feature",
    company: "Propel Platform"
  },
  {
    quote: "Google Gemini 2.5 Flash powers all multi-turn conversation memory with high reasoning accuracy.",
    author: "Text Engine",
    role: "Gemini 2.5 Flash",
    company: "1 Credit / Msg"
  },
  {
    quote: "Generate high-resolution AI artwork and publish directly to the public community showcase.",
    author: "Image Engine",
    role: "ImageKit Studio",
    company: "2 Credits / Gen"
  },
  {
    quote: "Encrypted Razorpay checkout integration for instant credit top-ups starting at ₹199.",
    author: "Payments",
    role: "Razorpay Gateway",
    company: "Basic, Pro & Premium"
  }
];

const FeatureGrid = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState('text');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08
      }
    }
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0A12] text-[#F4F2F8] max-w-[1340px] mx-auto">
      
      {/* Section Sub-heading (24px mid-size) */}
      <div className="text-center max-w-[640px] mx-auto mb-16">
        <h2 className="font-geist text-[24px] sm:text-[32px] font-semibold text-[#F4F2F8] tracking-tight mb-3">
          Built for text reasoning & visual creation
        </h2>
        <p className="text-[16px] text-[#9C97AE] leading-relaxed">
          Propel combines Google Gemini 2.5 Flash for text intelligence and ImageKit AI for high-resolution image generation.
        </p>
      </div>

      {/* Bento Grid Container: 4 columns desktop, collapsing to 1 column mobile */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16"
      >
        
        {/* Tile 1: Spans 2 cols, 2 rows (Desktop) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 lg:row-span-2 bg-[#151320] border border-white/[0.08] hover:border-white/[0.16] rounded-[16px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-[2px] group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2 text-[12px] uppercase font-mono tracking-widest text-[#7C3AED] bg-[#7C3AED]/10 px-2.5 py-1 rounded">
                <Sparkles className="w-3.5 h-3.5" /> Dual AI Engine
              </span>
              <span className="text-[12px] font-mono text-[#9C97AE]">Multi-Turn Memory</span>
            </div>

            <h3 className="font-geist text-[24px] font-medium text-[#F4F2F8] mb-3">
              Multi-Turn Text & Image Studio
            </h3>
            <p className="text-[16px] text-[#9C97AE] leading-relaxed mb-6 max-w-[500px]">
              Switch between conversation text chat powered by Google Gemini 2.5 Flash and text-to-image creation powered by ImageKit.
            </p>
          </div>

          {/* Interactive Feature Demo */}
          <div className="bg-[#0B0A12] border border-white/[0.06] rounded-xl p-4 sm:p-5 font-mono text-[12px]">
            <div className="text-[#9C97AE] pb-2 mb-4 border-b border-white/[0.04] flex items-center justify-between">
              <span>Active Workspace Controller</span>
              <span className="text-[#10B981] font-semibold">Live System</span>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                  activeTab === 'text'
                    ? 'bg-[#1E1730] border-[#7C3AED] text-[#F4F2F8]'
                    : 'bg-[#151320] border-white/[0.06] text-[#9C97AE]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[13px] text-[#F4F2F8] flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#7C3AED]" /> Text Mode
                  </span>
                  <span className="text-[11px] text-[#7C3AED]">1 Credit</span>
                </div>
                <div className="text-[11px] text-[#9C97AE]">Google Gemini 2.5 Flash</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('image')}
                className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                  activeTab === 'image'
                    ? 'bg-[#1E1730] border-[#7C3AED] text-[#F4F2F8]'
                    : 'bg-[#151320] border-white/[0.06] text-[#9C97AE]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[13px] text-[#F4F2F8] flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#7C3AED]" /> Image Mode
                  </span>
                  <span className="text-[11px] text-[#7C3AED]">2 Credits</span>
                </div>
                <div className="text-[11px] text-[#9C97AE]">ImageKit Generation</div>
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#9C97AE] pt-2 border-t border-white/[0.04]">
              <span>Selected Engine: <strong className="text-[#F4F2F8] font-normal">{activeTab === 'text' ? 'Gemini 2.5 Flash' : 'ImageKit Studio'}</strong></span>
              <span className="text-[#7C3AED]">Auto-Deduct Credits</span>
            </div>
          </div>
        </motion.div>

        {/* Tile 2 (1 Col) - Flat Dark Violet Background #1E1730 */}
        <motion.div 
          variants={itemVariants}
          className="bg-[#1E1730] border border-white/[0.08] hover:border-white/[0.16] rounded-[16px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-[2px]"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#7C3AED] text-white flex items-center justify-center mb-6">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <h3 className="font-geist text-[24px] font-medium text-[#F4F2F8] mb-3">
              Transparent Credit System
            </h3>
            <p className="text-[16px] text-[#9C97AE] leading-relaxed">
              Every new user receives 30 free credits on sign-up. Deducts 1 credit per text response and 2 credits per image prompt.
            </p>
          </div>
          <div className="pt-6 font-mono text-[12px] text-[#7C3AED]">
            30 Free Credits Granted
          </div>
        </motion.div>

        {/* Tile 3 (1 Col) - Flat Neutral #151320 */}
        <motion.div 
          variants={itemVariants}
          className="bg-[#151320] border border-white/[0.08] hover:border-white/[0.16] rounded-[16px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-[2px]"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-white/10 text-[#F4F2F8] flex items-center justify-center mb-6">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-geist text-[24px] font-medium text-[#F4F2F8] mb-3">
              Community Gallery
            </h3>
            <p className="text-[16px] text-[#9C97AE] leading-relaxed">
              Publish your generated AI artwork directly to the global community showcase for other users to explore.
            </p>
          </div>
          <div className="pt-6 font-mono text-[12px] text-[#10B981]">
            Global Artwork Showcase
          </div>
        </motion.div>

        {/* Tile 4 (1 Col) - Exclusive Amber Accent #F59E0B */}
        <motion.div 
          variants={itemVariants}
          className="bg-[#151320] border border-white/[0.08] hover:border-white/[0.16] rounded-[16px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-[2px]"
        >
          <div>
            {/* AMBER ACCENT BADGE & ICON (Exclusive location #2) */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-[12px] font-mono uppercase tracking-wider text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded">
                Razorpay
              </span>
            </div>

            <h3 className="font-geist text-[24px] font-medium text-[#F4F2F8] mb-3">
              Instant Credit Top-ups
            </h3>
            <p className="text-[16px] text-[#9C97AE] leading-relaxed">
              Purchase credit packs starting at ₹199 (Basic, Pro, Premium) with encrypted Razorpay payment verification.
            </p>
          </div>
          <div className="pt-6 font-mono text-[12px] text-[#F59E0B]">
            Plans: ₹199 / ₹499 / ₹999
          </div>
        </motion.div>

      </motion.div>

      {/* Bottom Row Marquee */}
      <div className="w-full pt-10 border-t border-white/[0.08] overflow-hidden">
        <div className="text-center mb-6">
          <span className="text-[12px] font-mono uppercase tracking-[0.12em] text-[#9C97AE]">
            Verified platform capabilities
          </span>
        </div>

        {/* Infinite Auto-scrolling Marquee with WCAG Pause-on-Hover / Focus */}
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee py-2 flex items-stretch gap-6">
            {[...HIGHLIGHTS, ...HIGHLIGHTS].map((t, idx) => (
              <div
                key={`${t.author}-${idx}`}
                tabIndex={0}
                className="w-[320px] sm:w-[380px] h-[165px] shrink-0 bg-[#151320] border border-white/[0.08] hover:border-white/[0.16] rounded-xl p-5 flex flex-col justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              >
                <p className="text-[14px] text-[#F4F2F8] leading-relaxed italic line-clamp-3">
                  "{t.quote}"
                </p>
                <div className="flex items-center justify-between text-[12px] pt-3 border-t border-white/[0.04]">
                  <div>
                    <strong className="text-[#F4F2F8] font-medium block">{t.author}</strong>
                    <span className="text-[#9C97AE]">{t.role}</span>
                  </div>
                  <span className="font-mono text-[#7C3AED] font-semibold">{t.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default FeatureGrid;
