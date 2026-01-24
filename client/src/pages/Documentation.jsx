import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MessageSquare, Image as ImageIcon, Zap, Users } from 'lucide-react';

const DocSection = ({ title, icon, children }) => (
    <div className='mb-12'>
        <div className='flex items-center gap-3 mb-4'>
            <div className='p-2 rounded-lg bg-blue-500/10 text-blue-400'>
                {icon}
            </div>
            <h2 className='text-2xl font-bold text-white'>{title}</h2>
        </div>
        <div className='text-gray-400 space-y-4 leading-relaxed'>
            {children}
        </div>
    </div>
);

const Documentation = () => {
    return (
        <div className='min-h-screen bg-[#050505] text-white selection:bg-blue-500/30'>
            {/* Background noise */}
            <div className='fixed inset-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] opacity-20 pointer-events-none'></div>

            <Navbar />

            <main className='pt-32 pb-20 max-w-4xl mx-auto px-6 relative z-10'>
                <div className='mb-16 text-center'>
                    <h1 className='text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500'>User Guide</h1>
                    <p className='text-xl text-gray-400'>Master the art of generation with Propel.</p>
                </div>

                <DocSection title="Intelligent Chat" icon={<MessageSquare className="w-6 h-6" />}>
                    <p>
                        Propel's chat interface allows you to ask complex questions, debug code, or brainstorm ideas.
                        Our models are optimized for reasoning and context-maintainence.
                    </p>
                    <ul className='list-disc pl-5 space-y-2 mt-2'>
                        <li><strong>Context Window:</strong> The AI remembers previous turns in your conversation.</li>
                        <li><strong>Code Generation:</strong> Ask for code snippets in Python, JavaScript, and more.</li>
                    </ul>
                </DocSection>

                <DocSection title="Image Generation" icon={<ImageIcon className="w-6 h-6" />}>
                    <p>
                        Turn text into stunning visuals. Describe what you want to see, and Propel will generate it in high resolution.
                    </p>
                    <div className='bg-black/50 border border-white/10 rounded-xl p-4 mt-4'>
                        <p className='text-sm text-gray-500 mb-2'>Example Prompt:</p>
                        <p className='font-mono text-gray-300'>"A futuristic city with flying cars, neon lights, cyberpunk style, highly detailed, 4k"</p>
                    </div>
                    <p className='mt-4'>
                        <span className='text-purple-400 font-semibold'>Pro Tip:</span> Be specific about lighting, style, and mood for the best results.
                    </p>
                </DocSection>

                <DocSection title="Credits & Usage" icon={<Zap className="w-6 h-6" />}>
                    <p>
                        Every generation consumes credits. Text responses are efficient, while high-definition image generation requires more resources.
                    </p>
                    <p>
                        You can view your remaining balance and purchase more credits from the <strong>Credits</strong> page in your dashboard.
                    </p>
                </DocSection>

                <DocSection title="Community" icon={<Users className="w-6 h-6" />}>
                    <p>
                        Join our community to share your creations, view what others are building, and get inspiration for your next prompt.
                    </p>
                </DocSection>

            </main>

            <Footer />
        </div>
    );
};

export default Documentation;
