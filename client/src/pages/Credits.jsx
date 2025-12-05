import React, { useEffect, useState } from 'react'
import { getPlans, createRazorpayOrder, verifyRazorpayPayment } from '../../services/payment.service'
import { useAppContext } from '../context/AppContext'
import Loading from './Loading'
import { assets } from '../assets/assets'

const Credits = () => {
  const { user, setUser } = useAppContext()
  
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(null) // Track which plan is being purchased

  // Fetch plans from backend
  const fetchPlans = async () => {
    try {
      const data = await getPlans()
      if (data.success) {
        setPlans(data.plans)
      }
    } catch (error) {
      console.error('Error fetching plans:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  // Handle purchase
  const handlePurchase = async (planId) => {
    try {
      setPurchasing(planId)

      // Check if user is logged in
      if (!user) {
        alert('Please login to purchase credits')
        return
      }

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        alert('Failed to load Razorpay. Please try again.')
        return
      }

      // Create order
      const orderData = await createRazorpayOrder(planId)

      if (!orderData.success) {
        alert(orderData.message || 'Unable to create order')
        return
      }

      // Configure Razorpay options
      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Propel AI',
        description: `Purchase ${orderData.planName} Plan`,
        order_id: orderData.order.id,
        handler: async function (response) {
          // Payment successful - verify it
          const verificationData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            transactionId: orderData.transactionId
          }

          const result = await verifyRazorpayPayment(verificationData)

          if (result.success) {
            alert(`🎉 Payment Successful! ${result.credits} credits added to your account.`)
            
            // Update user credits in context
            setUser(prev => ({
              ...prev,
              credits: result.newBalance
            }))
          } else {
            alert('❌ Payment verification failed! Please contact support.')
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || ''
        },
        theme: {
          color: '#9333ea' // Purple color matching your theme
        },
        modal: {
          ondismiss: function() {
            console.log('Payment cancelled by user')
            setPurchasing(null)
          }
        }
      }

      const rzp = new window.Razorpay(options)
      
      rzp.on('payment.failed', function (response) {
        alert('Payment failed! Please try again.')
        console.error('Payment failed:', response.error)
      })

      rzp.open()

    } catch (error) {
      console.error('Purchase error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setPurchasing(null)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  if (loading) return <Loading />

  return (
    <div className='max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      {/* Header */}
      <div className='text-center mb-10'>
        <h2 className='text-3xl font-semibold text-gray-800 dark:text-white mb-2'>
          Credit Plans
        </h2>
        <p className='text-gray-600 dark:text-purple-200'>
          Choose a plan and power up your AI experience
        </p>
      </div>

      {/* Current Credits Display */}
      {user && (
        <div className='flex justify-center mb-8'>
          <div className='flex items-center gap-3 bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded-full px-6 py-3'>
            <img src={assets.diamond_icon} className='w-6 h-6 dark:invert' alt="credits" />
            <div>
              <p className='text-sm text-gray-600 dark:text-purple-200'>Current Balance</p>
              <p className='text-xl font-bold text-purple-600 dark:text-purple-300'>
                {user.credits} Credits
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Plans Grid */}
      <div className='flex flex-wrap justify-center gap-8'>
        {plans.map((plan) => (
          <div 
            key={plan._id} 
            className={`border border-gray-200 dark:border-purple-700 rounded-4xl shadow hover:shadow-xl transition-all duration-300 p-6 min-w-[300px] flex flex-col ${
              plan._id === "pro" 
                ? "bg-purple-50 dark:bg-purple-900/50 border-2 border-purple-500 scale-105" 
                : "bg-white dark:bg-transparent"
            }`}
          >
            {/* Recommended Badge */}
            {plan._id === "pro" && (
              <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                <span className='bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full'>
                  RECOMMENDED
                </span>
              </div>
            )}

            <div className='flex-1'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                {plan.name}
              </h3>
              <p className='text-3xl font-bold text-purple-600 dark:text-purple-300 mb-1'>
                ₹{plan.price}
              </p>
              <p className='text-sm text-gray-600 dark:text-purple-200 mb-4'>
                {plan.credits} credits
              </p>
              
              <ul className='space-y-2 mb-6'>
                {plan.features.map((feature, index) => (
                  <li key={index} className='flex items-start gap-2 text-sm text-gray-700 dark:text-purple-200'>
                    <span className='text-purple-600 dark:text-purple-400 mt-0.5'>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => handlePurchase(plan._id)}
              disabled={purchasing === plan._id}
              className={`mt-auto w-full font-medium py-3 rounded-full transition-all duration-300 ${
                plan._id === "pro"
                  ? "bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white"
                  : "bg-gray-800 hover:bg-gray-900 dark:bg-purple-700 dark:hover:bg-purple-800 text-white"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {purchasing === plan._id ? (
                <span className='flex items-center justify-center gap-2'>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Buy Now'
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className='mt-12 text-center text-sm text-gray-600 dark:text-purple-200'>
        <p>🔒 Secure payment powered by Razorpay</p>
        <p className='mt-2'>All transactions are encrypted and secure</p>
      </div>
    </div>
  )
}

export default Credits