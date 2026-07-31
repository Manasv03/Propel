import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#F8F7FC] dark:bg-[#0B0A12] text-[#0F0C1B] dark:text-[#F4F2F8] p-4 sm:p-8 lg:p-12 overflow-y-auto transition-colors">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[13px] text-[#645D75] dark:text-[#9C97AE] hover:text-[#0F0C1B] dark:hover:text-[#F4F2F8] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Content Card */}
        <div className="bg-white dark:bg-[#151320] border border-[#E5E2EE] dark:border-white/[0.08] p-6 sm:p-10 rounded-[20px] shadow-lg">
          <h1 className="font-geist text-[28px] sm:text-[36px] font-bold mb-4 text-[#0F0C1B] dark:text-[#F4F2F8] border-b border-[#E5E2EE] dark:border-white/[0.08] pb-4">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-[#645D75] dark:text-[#9C97AE] text-[14px] leading-relaxed">
            <p>
              This privacy policy sets out how PROPEL uses and protects any information that you give PROPEL when you use this website.
            </p>
            <p>
              PROPEL is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.
            </p>
            <p>
              PROPEL may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.
            </p>

            <h3 className="font-geist text-[18px] font-bold text-[#0F0C1B] dark:text-[#F4F2F8] mt-6">
              We may collect the following information:
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-[#0F0C1B] dark:text-[#F4F2F8]">
              <li>Name and account details</li>
              <li>Contact information including email address</li>
              <li>Usage data (e.g., AI generation history, credit consumption logs)</li>
              <li>Technical information (IP address, browser type) for security and analytics</li>
            </ul>

            <h3 className="font-geist text-[18px] font-bold text-[#0F0C1B] dark:text-[#F4F2F8] mt-6">
              What we do with the information we gather
            </h3>
            <p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#0F0C1B] dark:text-[#F4F2F8]">
              <li>Internal record keeping and account management.</li>
              <li>To process your transactions and manage your credit balance.</li>
              <li>We may use the information to improve our AI models and platform performance.</li>
              <li>We may periodically send promotional emails about new features, special offers, or other information which we think you may find interesting.</li>
            </ul>

            <h3 className="font-geist text-[18px] font-bold text-[#0F0C1B] dark:text-[#F4F2F8] mt-6">
              Security
            </h3>
            <p>
              We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
            </p>

            <h3 className="font-geist text-[18px] font-bold text-[#0F0C1B] dark:text-[#F4F2F8] mt-6">
              Cookies
            </h3>
            <p>
              A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual.
            </p>

            <h3 className="font-geist text-[18px] font-bold text-[#0F0C1B] dark:text-[#F4F2F8] mt-6">
              Controlling your personal information
            </h3>
            <p>
              You may choose to restrict the collection or use of your personal information in the following ways:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#0F0C1B] dark:text-[#F4F2F8]">
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
    </div>
  );
};

export default PrivacyPolicy;
