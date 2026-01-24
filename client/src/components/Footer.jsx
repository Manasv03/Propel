import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='py-12 border-t border-white/10 bg-black/40 backdrop-blur-sm'>
            <div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6'>
                <div className='text-gray-400'>
                    © {new Date().getFullYear()} Propel. All rights reserved.
                </div>
                <div className='flex gap-8 text-gray-400'>
                    <Link to="/policy/privacy-policy" className='hover:text-white transition-colors'>Privacy</Link>
                    <Link to="/policy/terms-and-conditions" className='hover:text-white transition-colors'>Terms</Link>
                    <Link to="/policy/contact-us" className='hover:text-white transition-colors'>Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
