import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import PropelLogo from '../components/PropelLogo';

const Loading = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAppContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUser();
      navigate('/');
    }, 8000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-[#F8F7FC] dark:bg-[#0B0A12] flex flex-col items-center justify-center h-screen w-screen text-[#0F0C1B] dark:text-[#F4F2F8] transition-colors gap-6 p-4">
      
      {/* Creative Popout Logo */}
      <PropelLogo size="lg" showBadge={true} className="animate-pulse" />

      {/* Modern Solid Stroke Violet Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-3 border-[#7C3AED]/20 border-t-[#7C3AED] animate-spin" />
      </div>

      {/* Muted Subtext */}
      <p className="text-[14px] font-mono text-[#645D75] dark:text-[#9C97AE] tracking-wide">
        Loading Propel AI...
      </p>

    </div>
  );
};

export default Loading;
