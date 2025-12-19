import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PolicyButton = () => {
    const [showPolicies, setShowPolicies] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowPolicies(true)}
                className="fixed bottom-6 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
                title="View Policies"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-sm font-medium">
                    Policies
                </span>
            </button>

            {/* Policies Modal */}
            {showPolicies && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
                    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-xl p-6 max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setShowPolicies(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Legal & Policies</h3>
                        <div className="flex flex-col gap-3">
                            <Link to="/policy/contact-us" onClick={() => setShowPolicies(false)} className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-lg text-center transition-colors font-medium">Contact Us</Link>
                            <Link to="/policy/shipping-policy" onClick={() => setShowPolicies(false)} className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-lg text-center transition-colors font-medium">Delivery Policy</Link>
                            <Link to="/policy/terms-and-conditions" onClick={() => setShowPolicies(false)} className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-lg text-center transition-colors font-medium">Terms & Conditions</Link>
                            <Link to="/policy/cancellation-refund" onClick={() => setShowPolicies(false)} className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-lg text-center transition-colors font-medium">Cancellation & Refund</Link>
                            <Link to="/policy/privacy-policy" onClick={() => setShowPolicies(false)} className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-lg text-center transition-colors font-medium">Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PolicyButton;
