import React from 'react';

const Footer = () => {
    return (
        <footer className='py-12 border-t border-white/10 bg-black/40 backdrop-blur-sm'>
            <div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6'>
                <div className='text-gray-400'>
                    © {new Date().getFullYear()} Propel. All rights reserved.
                </div>
                <div className='flex gap-8 text-gray-400'>
                    <a href="#" className='hover:text-white transition-colors'>Privacy</a>
                    <a href="#" className='hover:text-white transition-colors'>Terms</a>
                    <a href="#" className='hover:text-white transition-colors'>Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
