import React from 'react';
import Hero from '../components/Hero';
import FeatureGrid from '../components/FeatureGrid';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <main className="min-h-screen bg-[#0B0A12] text-[#F4F2F8] selection:bg-[#7C3AED] selection:text-white overflow-x-hidden relative">
      
      {/* 1. Full-Width Top Navbar (Outside and Above side-bordered container) */}
      <Navbar />

      {/* 2. Hero Section Container with Side Borders & Corner Accents */}
      <div className="max-w-[1340px] mx-auto border-x border-white/[0.08] relative">
        
        {/* Left Outer Side Status Dot & Label */}
        <div className="hidden xl:flex items-center gap-2 absolute top-32 -left-12 -rotate-90 origin-center pointer-events-none select-none">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          <span className="text-[11px] font-mono tracking-widest text-[#9C97AE]">PROPEL // V2.0</span>
        </div>

        {/* Right Outer Side Status Dot & Label */}
        <div className="hidden xl:flex items-center gap-2 absolute top-32 -right-12 rotate-90 origin-center pointer-events-none select-none">
          <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
          <span className="text-[11px] font-mono tracking-widest text-[#F4F2F8]">SYSTEM // ONLINE</span>
        </div>

        {/* Hero Top-Left Corner Reticle ┌ */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#7C3AED] z-20 pointer-events-none" />
        
        {/* Hero Top-Right Corner Reticle ┐ */}
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#7C3AED] z-20 pointer-events-none" />

        {/* Hero Bottom-Left Corner Reticle └ */}
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#7C3AED] z-20 pointer-events-none" />

        {/* Hero Bottom-Right Corner Reticle ┘ */}
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#7C3AED] z-20 pointer-events-none" />

        {/* Section 1: Hero */}
        <Hero />
      </div>

      {/* Section 2: Features Bento Grid with #features scroll anchor */}
      <div id="features">
        <FeatureGrid />
      </div>

    </main>
  );
};

export default Home;
