import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropelLogo from './PropelLogo';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { user } = useAppContext();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleSmoothScroll = (e, targetId) => {
    setMobileMenuOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`w-full z-50 sticky top-0 transition-all duration-300 border-b border-white/[0.08] ${
      scrolled
        ? 'bg-[#0B0A12]/95 backdrop-blur-md py-3 shadow-xl'
        : 'bg-[#0B0A12] py-3.5 sm:py-5'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between">

        {/* Brand Logo - Responsive Sizing */}
        <Link to="/" className="focus:outline-none rounded-lg focus:ring-2 focus:ring-[#7C3AED] shrink-0">
          <div className="hidden sm:block">
            <PropelLogo size="md" showBadge={true} />
          </div>
          <div className="sm:hidden">
            <PropelLogo size="sm" showBadge={true} />
          </div>
        </Link>

        {/* Desktop Center Nav Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-[15px] font-medium text-[#9C97AE]">
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

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <Link
            to={user ? '/' : '/login'}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium text-[13px] sm:text-[15px] transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] shadow-md cursor-pointer"
          >
            <span>{user ? 'Go to App' : 'Get Started'}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 rounded-xl bg-[#151320] border border-white/10 text-[#F4F2F8] hover:bg-[#1E1730] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED] cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#151320] border-t border-b border-white/[0.08] px-6 py-5 flex flex-col gap-4 text-[15px] font-medium text-[#9C97AE] animate-in slide-in-from-top duration-200">
          <a
            href="#features"
            onClick={(e) => handleSmoothScroll(e, 'features')}
            className="hover:text-[#F4F2F8] py-1 transition-colors cursor-pointer"
          >
            Features
          </a>
          <Link 
            to="/credits" 
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#F4F2F8] py-1 transition-colors"
          >
            Credits & Pricing
          </Link>
          <Link 
            to="/community" 
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#F4F2F8] py-1 transition-colors"
          >
            Community
          </Link>
          <Link 
            to="/docs" 
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#F4F2F8] py-1 transition-colors"
          >
            Docs
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
