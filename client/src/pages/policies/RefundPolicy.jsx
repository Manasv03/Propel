import React from 'react';

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-[#242124] to-[#000000] text-white p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">Cancellation and Refund Policy</h1>

                <div className="space-y-6 text-gray-300">
                    <p>
                        PROPEL strives to ensure a seamless experience for all our users. However, we understand that issues may arise. Our policy for cancellations and refunds is as follows:
                    </p>

                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Digital Services:</strong> As our primary offering is digital credits and AI processing services, we generally do not offer refunds once credits have been utilized or services have been consumed.</li>
                        <li><strong>Cancellation:</strong> You may cancel your account or subscription at any time. However, cancellation does not automatically entitle you to a refund for previously purchased credits or subscription periods.</li>
                        <li><strong>Refund Eligibility:</strong>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                                <li>Refund requests must be made within 5-7 days of the transaction date.</li>
                                <li>Refunds are only applicable if the purchased credits have <strong>not been used</strong>.</li>
                                <li>In cases of double deduction or failed transactions where money was deducted but credits were not assigned, a full refund will be processed automatically or upon request.</li>
                            </ul>
                        </li>
                        <li><strong>Processing Time:</strong> If a refund is approved by PROPEL, it will be processed within 5-7 business days and credited back to the original source of payment.</li>
                        <li><strong>Disputes:</strong> For any billing disputes or issues with the quality of AI generation, please contact our support team at propel.genai@gmail.com within 7 days of the incident.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;
