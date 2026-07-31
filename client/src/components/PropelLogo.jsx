import React from 'react';

const PropelLogo = ({ size = 'md', showBadge = false, className = '' }) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7 text-sm', text: 'text-[18px]', badge: 'text-[10px] px-1.5 py-0.5' },
    md: { icon: 'w-9 h-9 text-base', text: 'text-[22px]', badge: 'text-[11px] px-2 py-0.5' },
    lg: { icon: 'w-12 h-12 text-xl', text: 'text-[28px]', badge: 'text-[12px] px-2.5 py-1' }
  };

  const { icon, text, badge } = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Creative Popout Logo Badge Container */}
      <div className={`relative ${icon} rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold font-geist flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 group cursor-pointer`}>
        {/* Dynamic Inner Geometry Emblem */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-3/5 h-3/5 text-white transform group-hover:rotate-12 transition-transform duration-300"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" className="opacity-90" />
        </svg>

        {/* Small Solid Amber Status Dot on Logo Tile */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#F59E0B] border-2 border-white dark:border-[#151320]" />
      </div>

      {/* Brand Name Typography */}
      <div className="flex items-center gap-2">
        <span className={`font-geist ${text} font-bold tracking-tight text-[#0F0C1B] dark:text-[#F4F2F8]`}>
          Propel
        </span>
        {showBadge && (
          <span className={`font-mono uppercase font-semibold ${badge} rounded-md bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20`}>
            AI v2
          </span>
        )}
      </div>
    </div>
  );
};

export default PropelLogo;
