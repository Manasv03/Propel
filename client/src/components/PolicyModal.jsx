import React from 'react';
import { Link } from 'react-router-dom';
import { X, FileText, Phone, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

const PolicyModal = ({ show, onClose }) => {
  if (!show) return null;

  const policyLinks = [
    { label: "Contact Us", path: "/policy/contact-us", icon: Phone },
    { label: "Delivery Policy", path: "/policy/shipping-policy", icon: Truck },
    { label: "Terms & Conditions", path: "/policy/terms-and-conditions", icon: FileText },
    { label: "Cancellation & Refund", path: "/policy/cancellation-refund", icon: RefreshCw },
    { label: "Privacy Policy", path: "/policy/privacy-policy", icon: ShieldCheck }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
      <div className="bg-white dark:bg-[#151320] border border-[#E5E2EE] dark:border-white/[0.08] rounded-[20px] p-6 sm:p-7 max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#645D75] dark:text-[#9C97AE] hover:text-[#0F0C1B] dark:hover:text-[#F4F2F8] p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Close policies modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <h3 className="font-geist text-[22px] font-bold text-[#0F0C1B] dark:text-[#F4F2F8] mb-6 text-center">
          Legal & Policies
        </h3>

        {/* Policy Links Stack */}
        <div className="flex flex-col gap-2.5">
          {policyLinks.map((policy) => {
            const Icon = policy.icon;
            return (
              <Link 
                key={policy.path}
                to={policy.path} 
                onClick={onClose} 
                className="bg-[#F4F3F8] dark:bg-[#0B0A12] hover:bg-[#EDE9F6] dark:hover:bg-[#1E1730] border border-[#E5E2EE] dark:border-white/[0.08] text-[#0F0C1B] dark:text-[#F4F2F8] py-3 px-4 rounded-xl flex items-center gap-3 transition-colors font-medium text-[14px] group"
              >
                <Icon className="w-4 h-4 text-[#7C3AED] shrink-0 group-hover:scale-110 transition-transform" />
                <span>{policy.label}</span>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default PolicyModal;
