import React from 'react';

const ShippingPolicy = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-[#242124] to-[#000000] text-white p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">Shipping and Delivery Policy</h1>

                <div className="space-y-6 text-gray-300">
                    <p>
                        <strong>Nature of Service:</strong> PROPEL provides digital AI services and credits. As such, there is no physical shipping or delivery of goods involved.
                    </p>

                    <p>
                        <strong>Delivery Timeline:</strong>
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>Credits:</strong> Upon successful payment, credits are added to your user account instantly (typically within a few minutes).</li>
                        <li><strong>Services:</strong> Access to AI tools and features is available immediately after the purchase is confirmed.</li>
                    </ul>

                    <p>
                        <strong>Confirmation:</strong> You will receive a confirmation email and/or an in-app notification once your payment is processed and your credits/plan has been activated.
                    </p>

                    <p>
                        <strong>Delays:</strong> In rare cases of technical issues or payment gateway delays, credit reflection might take up to 24 hours. If you do not receive your credits within this period, please contact our support team.
                    </p>

                    <p>
                        For any issues regarding the delivery of your service capabilities, you may contact our helpdesk on +91 8979434299 or propel.genai@gmail.com.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
