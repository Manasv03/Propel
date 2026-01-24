import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react';

const Hero = () => {
    return (
        <section className='relative min-h-screen flex items-center justify-center overflow-hidden pt-20'>
            {/* Background Effects */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] opacity-50 pointer-events-none' />
            <div className='absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] opacity-30 pointer-events-none' />

            <div className='max-w-7xl mx-auto px-6 relative z-10 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm'>
                        <span className='w-2 h-2 rounded-full bg-blue-500 animate-pulse' />
                        <span className='text-sm text-gray-300 font-medium'>Propel v1.0 is now live</span>
                    </div>

                    <h1 className='text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 text-white leading-tight'>
                        The native layer for <br />
                        <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-white'>
                            AI applications.
                        </span>
                    </h1>

                    <p className='text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed px-4'>
                        Infrastructure for the next generation of generative apps.
                        Simple APIs, instant inference, and scalable credit management.
                    </p>

                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                        <Link
                            to='/login'
                            className='group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2'
                        >
                            Get Started
                            <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                            <div className='absolute inset-0 rounded-xl ring-4 ring-white/20 group-hover:ring-white/40 transition-all' />
                        </Link>

                        <Link
                            to='/docs'
                            className='px-8 py-4 bg-white/5 text-white font-bold text-lg rounded-xl hover:bg-white/10 border border-white/10 transition-all backdrop-blur-sm'
                        >
                            View Documentation
                        </Link>
                    </div>
                </motion.div>

                {/* Floating Icons / Tech Stack aesthetic */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className='mt-20 flex justify-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500'
                >
                    <Zap className='w-8 h-8 text-yellow-400' />
                    <Shield className='w-8 h-8 text-green-400' />
                    <Cpu className='w-8 h-8 text-blue-400' />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
