import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-[#242124] to-[#000000] text-white p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">Privacy Policy</h1>

                <div className="space-y-6 text-gray-300 text-sm">
                    <p>
                        This privacy policy sets out how PROPEL uses and protects any information that you give PROPEL when you use this website.
                    </p>
                    <p>
                        PROPEL is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.
                    </p>
                    <p>
                        PROPEL may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.
                    </p>

                    <h3 className="text-lg font-semibold text-white mt-4">We may collect the following information:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Name and account details</li>
                        <li>Contact information including email address</li>
                        <li>Usage data (e.g., AI generation history, credit consumption logs)</li>
                        <li>Technical information (IP address, browser type) for security and analytics</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-white mt-4">What we do with the information we gather</h3>
                    <p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Internal record keeping and account management.</li>
                        <li>To process your transactions and manage your credit balance.</li>
                        <li>We may use the information to improve our AI models and platform performance.</li>
                        <li>We may periodically send promotional emails about new features, special offers, or other information which we think you may find interesting.</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-white mt-4">Security</h3>
                    <p>
                        We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
                    </p>

                    <h3 className="text-lg font-semibold text-white mt-4">Cookies</h3>
                    <p>
                        A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual.
                    </p>

                    <h3 className="text-lg font-semibold text-white mt-4">Controlling your personal information</h3>
                    <p>
                        You may choose to restrict the collection or use of your personal information in the following ways:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at propel.genai@gmail.com</li>
                    </ul>
                    <p className="mt-4">
                        We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so.
                    </p>
                    <p>
                        If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorrect.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
