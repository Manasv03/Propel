import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
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
            Terms and Conditions
          </h1>

          <div className="space-y-6 text-[#645D75] dark:text-[#9C97AE] text-[14px] leading-relaxed">
            <p>The Website Owner, including subsidiaries and affiliates (“Website” or “Website Owner” or “we” or “us” or “our”) provides the information contained on the website or any of the pages comprising the website (“website”) to visitors (“visitors”) (cumulatively referred to as “you” or “your” hereinafter) subject to the terms and conditions set out in these website terms and conditions, the privacy policy and any other relevant terms and conditions, policies and notices which may be applicable to a specific section or module of the website.</p>

            <p>Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern PROPEL's relationship with you in relation to this website.</p>

            <p>The term 'PROPEL' or 'us' or 'we' refers to the owner of the website whose registered/operational office is Gyali Seran, Champawat, Uttarakhand, 262523. The term 'you' refers to the user or viewer of our website.</p>

            <h3 className="font-geist text-[18px] font-bold text-[#0F0C1B] dark:text-[#F4F2F8] mt-6">
              The use of this website and our services is subject to the following terms of use:
            </h3>

            <ul className="list-disc pl-5 space-y-2.5 text-[#0F0C1B] dark:text-[#F4F2F8]">
              <li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li>
              <li><strong>AI Services:</strong> Our platform provides AI-generated content. We do not guarantee the accuracy, originality, or suitability of the generated content for any specific purpose. Users are responsible for verifying the output.</li>
              <li><strong>Credits:</strong> Credits purchased on PROPEL are for use within the platform only and are non-transferable.</li>
              <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose.</li>
              <li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</li>
              <li>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
              <li>Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</li>
              <li>From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</li>
              <li>You may not create a link to this website from another website or document without PROPEL’s prior written consent.</li>
              <li>Your use of this website and any dispute arising out of such use of the website is subject to the laws of India or other regulatory authority.</li>
            </ul>

            <div className="p-4 rounded-xl bg-[#F4F3F8] dark:bg-[#0B0A12] border border-[#E5E2EE] dark:border-white/[0.06] text-[#0F0C1B] dark:text-[#F4F2F8] mt-6">
              We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
