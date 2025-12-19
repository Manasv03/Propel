import React from 'react';

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-[#242124] to-[#000000] text-white p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">Contact Us</h1>

                <div className="space-y-4">
                    <p className="text-lg">
                        We'd love to hear from you! If you have any questions, feedback, or concerns, please don't hesitate to reach out.
                    </p>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
                        <div className="space-y-2 text-gray-300">
                            <p><strong>Merchant Legal entity name:</strong> PROPEL</p>
                            <p><strong>Registered Address:</strong> Gyali Seran, Champawat, Uttarakhand, 262523</p>
                            <p><strong>Operational Address:</strong> Gyali Seran, Champawat, Uttarakhand, 262523</p>
                            <p><strong>Telephone No:</strong> +91 8979434299</p>
                            <p><strong>E-Mail ID:</strong> propel.genai@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
