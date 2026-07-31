import React, { useEffect, useState } from 'react';
import { getPlans, createRazorpayOrder, verifyRazorpayPayment } from '../../services/payment.service';
import { useAppContext } from '../context/AppContext';
import Loading from './Loading';
import toast from 'react-hot-toast';
import { CreditCard, Check, Zap, Shield, Sparkles } from 'lucide-react';

const Credits = () => {
  const { user, setUser } = useAppContext();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(null);
  const { token, axios } = useAppContext();

  // Fetch plans from backend
  const fetchPlans = async () => {
    try {
      const data = await getPlans();
      if (data.success) {
        setPlans(data.plans);
      } else {
        toast.error(data.message || "Failed to fetch plans");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle purchase
  const handlePurchase = async (planId) => {
    try {
      setPurchasing(planId);

      if (!user) {
        toast.error('Please login to purchase credits');
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay. Please try again.');
        return;
      }

      const orderData = await createRazorpayOrder(planId);

      if (!orderData.success) {
        alert(orderData.message || 'Unable to create order');
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Propel AI',
        description: `Purchase ${orderData.planName} Plan`,
        order_id: orderData.order.id,
        handler: async function (response) {
          const verificationData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            transactionId: orderData.transactionId
          };

          const result = await verifyRazorpayPayment(verificationData);

          if (result.success) {
            alert(`🎉 Payment Successful! ${result.credits} credits added to your account.`);

            setUser(prev => ({
              ...prev,
              credits: result.newBalance
            }));
          } else {
            alert('❌ Payment verification failed! Please contact support.');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || ''
        },
        theme: {
          color: '#7C3AED'
        },
        modal: {
          ondismiss: function () {
            console.log('Payment cancelled by user');
            setPurchasing(null);
          }
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function (response) {
        alert('Payment failed! Please try again.');
        console.error('Payment failed:', response.error);
      });

      rzp.open();

    } catch (error) {
      console.error('Purchase error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setPurchasing(null);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 bg-[#F8F7FC] dark:bg-[#0B0A12] text-[#0F0C1B] dark:text-[#F4F2F8] transition-colors max-w-7xl mx-auto">

      {/* Top Header & Balance */}
      <div className="text-center shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE9F6] dark:bg-[#151320] border border-[#7C3AED]/20 dark:border-white/10 mb-2">
          <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span className="text-[11px] font-mono tracking-wider text-[#7C3AED] uppercase">
            Credit Packages
          </span>
        </div>

        <h1 className="font-geist text-[24px] sm:text-[32px] font-bold text-[#0F0C1B] dark:text-[#F4F2F8] tracking-tight">
          Credit Plans
        </h1>
        <p className="text-[13px] sm:text-[14px] text-[#645D75] dark:text-[#9C97AE] mt-0.5 max-w-[460px] mx-auto">
          Choose a plan to power up your prompts with Gemini 2.5 & ImageKit.
        </p>

        {/* Compact Current Balance Display */}
        {user && (
          <div className="inline-flex items-center gap-2.5 bg-white dark:bg-[#151320] border border-[#E5E2EE] dark:border-white/[0.08] rounded-full px-4 py-1.5 mt-2.5 shadow-sm mb-8">
            <CreditCard className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-[13px] text-[#645D75] dark:text-[#9C97AE]">
              Current Balance: <strong className="text-[14px] font-bold font-geist text-[#7C3AED] dark:text-[#F4F2F8] ml-1">{user.credits} Credits</strong>
            </span>
          </div>
        )}
      </div>

      {/* Perfectly Spaced Non-Scrolling Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl w-full mx-auto items-stretch shrink-1">
        {plans.map((plan) => {
          const isPro = plan._id === "pro";
          return (
            <div
              key={plan._id}
              className={`relative bg-white dark:bg-[#151320] rounded-[20px] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-sm ${isPro
                ? "border-2 border-[#7C3AED] shadow-lg z-10"
                : "border border-[#E5E2EE] dark:border-white/[0.08]"
                }`}
            >
              {/* Recommended Badge (Floating cleanly above border) */}
              {isPro && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-[#7C3AED] text-white text-[10px] font-bold font-mono tracking-wider px-3.5 py-1 rounded-full uppercase shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Recommended
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-[18px] font-bold font-geist text-[#0F0C1B] dark:text-[#F4F2F8] mb-0.5">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-[28px] sm:text-[32px] font-bold font-geist text-[#7C3AED]">
                    ₹{plan.price}
                  </span>
                  <span className="text-[12px] text-[#645D75] dark:text-[#9C97AE]">
                    / pack
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F4F3F8] dark:bg-[#0B0A12] border border-[#E5E2EE] dark:border-white/[0.06] text-[12px] font-medium text-[#0F0C1B] dark:text-[#F4F2F8] mb-4">
                  <CreditCard className="w-3 h-3 text-[#F59E0B]" />
                  <span>{plan.credits} Credits</span>
                </div>

                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-[13px] text-[#0F0C1B] dark:text-[#F4F2F8]">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePurchase(plan._id)}
                disabled={purchasing === plan._id}
                className={`w-full font-medium text-[14px] py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] cursor-pointer ${isPro
                  ? "bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                  : "bg-[#1E1730] hover:bg-[#2A2242] text-white dark:bg-[#1E1730] dark:hover:bg-[#2A2242]"
                  } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2`}
              >
                {purchasing === plan._id ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  'Buy Now'
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Compact Security Footer */}
      <div className="shrink-0 text-center text-[12px] text-[#645D75] dark:text-[#9C97AE] flex items-center justify-center gap-1.5 mt-2">
        <Shield className="w-3.5 h-3.5 text-[#10B981]" />
        <span>Secure 256-bit encrypted payment powered by Razorpay</span>
      </div>
    </div>
  );
};

export default Credits;