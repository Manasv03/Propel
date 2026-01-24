import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
            }`}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 md:w-10 md:h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center'>
                        <Sparkles className='text-white w-5 h-5 md:w-6 md:h-6' />
                    </div>
                    <span className='text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70'>
                        Propel
                    </span>
                </div>

                <Link
                    to='/login'
                    className='px-4 py-2 md:px-6 md:py-2.5 text-sm md:text-base bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                >
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
