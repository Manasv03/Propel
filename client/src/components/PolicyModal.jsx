import React from 'react';
import { Link } from 'react-router-dom';

const PolicyModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-xl p-6 max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Legal & Policies</h3>
                <div className="flex flex-col gap-3">
                    <Link to="/policy/contact-us" onClick={onClose} className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-lg text-center transition-colors font-medium">Contact Us</Link>
                    <Link to="/policy/shipping-policy" onClick={onClose} className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-lg text-center transition-colors font-medium">Delivery Policy</Link>
                    <Link to="/policy/terms-and-conditions" onClick={onClose} className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-lg text-center transition-colors font-medium">Terms & Conditions</Link>
                    <Link to="/policy/cancellation-refund" onClick={onClose} className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-lg text-center transition-colors font-medium">Cancellation & Refund</Link>
                    <Link to="/policy/privacy-policy" onClick={onClose} className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-lg text-center transition-colors font-medium">Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
};

export default PolicyModal;
