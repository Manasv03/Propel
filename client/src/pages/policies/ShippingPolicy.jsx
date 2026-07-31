import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShippingPolicy = () => {
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
            Shipping and Delivery Policy
          </h1>

          <div className="space-y-6 text-[#645D75] dark:text-[#9C97AE] text-[14px] leading-relaxed">
            <p>
              <strong className="text-[#0F0C1B] dark:text-[#F4F2F8]">Nature of Service:</strong> PROPEL provides digital AI services and credits. As such, there is no physical shipping or delivery of goods involved.
            </p>

            <div className="space-y-2">
              <strong className="text-[#0F0C1B] dark:text-[#F4F2F8] block">Delivery Timeline:</strong>
              <ul className="list-disc pl-5 space-y-1.5 text-[#0F0C1B] dark:text-[#F4F2F8]">
                <li><strong>Credits:</strong> Upon successful payment, credits are added to your user account instantly (typically within a few minutes).</li>
                <li><strong>Services:</strong> Access to AI tools and features is available immediately after the purchase is confirmed.</li>
              </ul>
            </div>

            <p>
              <strong className="text-[#0F0C1B] dark:text-[#F4F2F8]">Confirmation:</strong> You will receive a confirmation email and/or an in-app notification once your payment is processed and your credits/plan has been activated.
            </p>

            <p>
              <strong className="text-[#0F0C1B] dark:text-[#F4F2F8]">Delays:</strong> In rare cases of technical issues or payment gateway delays, credit reflection might take up to 24 hours. If you do not receive your credits within this period, please contact our support team.
            </p>

            <div className="p-4 rounded-xl bg-[#F4F3F8] dark:bg-[#0B0A12] border border-[#E5E2EE] dark:border-white/[0.06] text-[#0F0C1B] dark:text-[#F4F2F8] mt-6">
              For any issues regarding the delivery of your service capabilities, you may contact our helpdesk on <strong>+91 8979434299</strong> or <strong>propel.genai@gmail.com</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
