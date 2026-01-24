import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className='min-h-screen bg-[#050505] text-white selection:bg-purple-500/30'>
            <div className='fixed inset-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] opacity-20 pointer-events-none'></div>
            <Navbar />
            <Hero />
            <Features />
            <Footer />
        </div>
    );
};

export default Home;
