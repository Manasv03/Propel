import React from 'react';
import { ArrowLeft, Building2, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
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
            Contact Us
          </h1>

          <div className="space-y-6 text-[#0F0C1B] dark:text-[#F4F2F8]">
            <p className="text-[15px] leading-relaxed text-[#645D75] dark:text-[#9C97AE]">
              We'd love to hear from you! If you have any questions, feedback, or concerns, please don't hesitate to reach out.
            </p>

            <div className="mt-8 pt-4 border-t border-[#E5E2EE] dark:border-white/[0.08]">
              <h2 className="font-geist text-[20px] font-bold mb-4 text-[#0F0C1B] dark:text-[#F4F2F8]">
                Get in Touch
              </h2>
              
              <div className="space-y-4 text-[14px]">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F3F8] dark:bg-[#0B0A12] border border-[#E5E2EE] dark:border-white/[0.06]">
                  <Building2 className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#645D75] dark:text-[#9C97AE] text-[12px] block">Merchant Legal Entity Name</span>
                    <strong className="font-semibold text-[#0F0C1B] dark:text-[#F4F2F8]">PROPEL</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F3F8] dark:bg-[#0B0A12] border border-[#E5E2EE] dark:border-white/[0.06]">
                  <MapPin className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#645D75] dark:text-[#9C97AE] text-[12px] block">Registered Address</span>
                    <strong className="font-semibold text-[#0F0C1B] dark:text-[#F4F2F8]">Gyali Seran, Champawat, Uttarakhand, 262523</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F3F8] dark:bg-[#0B0A12] border border-[#E5E2EE] dark:border-white/[0.06]">
                  <MapPin className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#645D75] dark:text-[#9C97AE] text-[12px] block">Operational Address</span>
                    <strong className="font-semibold text-[#0F0C1B] dark:text-[#F4F2F8]">Gyali Seran, Champawat, Uttarakhand, 262523</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F3F8] dark:bg-[#0B0A12] border border-[#E5E2EE] dark:border-white/[0.06]">
                  <Phone className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#645D75] dark:text-[#9C97AE] text-[12px] block">Telephone No</span>
                    <strong className="font-semibold text-[#0F0C1B] dark:text-[#F4F2F8]">+91 8979434299</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F3F8] dark:bg-[#0B0A12] border border-[#E5E2EE] dark:border-white/[0.06]">
                  <Mail className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#645D75] dark:text-[#9C97AE] text-[12px] block">E-Mail ID</span>
                    <strong className="font-semibold text-[#0F0C1B] dark:text-[#F4F2F8]">propel.genai@gmail.com</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
