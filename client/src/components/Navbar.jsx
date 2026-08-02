import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropelLogo from './PropelLogo';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { user } = useAppContext();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`w-full z-50 sticky top-0 transition-all duration-300 border-b border-white/[0.08] ${scrolled
      ? 'bg-[#0B0A12]/95 backdrop-blur-md py-4 shadow-xl'
      : 'bg-[#0B0A12] py-5 sm:py-6'
      }`}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex items-center justify-between">

        {/* Brand Logo */}
        <Link to="/" className="focus:outline-none rounded-lg focus:ring-2 focus:ring-[#7C3AED] shrink-0">
          <PropelLogo size="lg" showBadge={true} />
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-9 text-[15px] font-medium text-[#9C97AE]">
          <a
            href="#features"
            onClick={(e) => handleSmoothScroll(e, 'features')}
            className="hover:text-[#F4F2F8] transition-colors cursor-pointer"
          >
            Features
          </a>
          <Link to="/credits" className="hover:text-[#F4F2F8] transition-colors">
            Credits & Pricing
          </Link>
          <Link to="/community" className="hover:text-[#F4F2F8] transition-colors">
            Community
          </Link>
          <Link to="/docs" className="hover:text-[#F4F2F8] transition-colors">
            Docs
          </Link>
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to={user ? '/' : '/login'}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium text-[14px] sm:text-[15px] transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] shadow-md cursor-pointer"
          >
            <span>{user ? 'Go to App' : 'Get Started'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
