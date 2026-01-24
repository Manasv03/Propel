import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Rocket, Lock } from 'lucide-react';

const features = [
    {
        icon: <Brain className="w-8 h-8 text-purple-400" />,
        title: "Model Agnostic",
        description: "Switch between state-of-the-art models with a single line of config. No vendor lock-in."
    },
    {
        icon: <Rocket className="w-8 h-8 text-blue-400" />,
        title: "Instant Inference",
        description: "Optimized cold-starts and edge caching mean your users never wait for creativity."
    },
    {
        icon: <Lock className="w-8 h-8 text-green-400" />,
        title: "Production Ready",
        description: "Enterprise-grade encryption, detailed usage analytics, and automatic scaling."
    }
];

const Features = () => {
    return (
        <section className='py-20 relative'>
            <div className='max-w-7xl mx-auto px-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className='p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all hover:bg-white/10 group backdrop-blur-sm'
                        >
                            <div className='mb-6 p-4 rounded-full bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300'>
                                {feature.icon}
                            </div>
                            <h3 className='text-2xl font-bold text-white mb-4'>{feature.title}</h3>
                            <p className='text-gray-400 leading-relaxed'>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
