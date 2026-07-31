import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
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
            Cancellation and Refund Policy
          </h1>

          <div className="space-y-6 text-[#645D75] dark:text-[#9C97AE] text-[14px] leading-relaxed">
            <p>
              PROPEL strives to ensure a seamless experience for all our users. However, we understand that issues may arise. Our policy for cancellations and refunds is as follows:
            </p>

            <ul className="list-disc pl-5 space-y-3 text-[#0F0C1B] dark:text-[#F4F2F8]">
              <li><strong>Digital Services:</strong> As our primary offering is digital credits and AI processing services, we generally do not offer refunds once credits have been utilized or services have been consumed.</li>
              <li><strong>Cancellation:</strong> You may cancel your account or subscription at any time. However, cancellation does not automatically entitle you to a refund for previously purchased credits or subscription periods.</li>
              <li>
                <strong>Refund Eligibility:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-[#645D75] dark:text-[#9C97AE]">
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
    </div>
  );
};

export default RefundPolicy;
