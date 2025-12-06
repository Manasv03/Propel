import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import razorpay from '../configs/razorpay.js';
import crypto from 'crypto';

const plans = [
    {
        _id: "basic",
        name: "Basic",
        price: 299,
        credits: 100,
        features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
    },
    {
        _id: "pro",
        name: "Pro",
        price: 799,
        credits: 500,
        features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
    },
    {
        _id: "premium",
        name: "Premium",
        price: 1499,
        credits: 1000,
        features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
    }
];

// Get all plans
export const getPlans = async (req, res) => {
    try {
        res.json({ success: true, plans });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Purchase plan
export const purchasePlan = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.user._id;

        // Validate planId
        if (!planId) {
            return res.status(400).json({
                success: false,
                message: 'planId is required'
            });
        }

        // Find plan
        const plan = plans.find(plan => plan._id === planId);

        if (!plan) {
            return res.status(400).json({
                success: false,
                message: 'Invalid plan'
            });
        }

        // Create transaction
        const transaction = await Transaction.create({
            userId: userId,
            planId: plan._id,
            amount: plan.price,
            credits: plan.credits,
            isPaid: false
        });

        // Create Razorpay order
        const options = {
            amount: plan.price * 100,
            currency: 'INR',
            receipt: transaction._id.toString(),
            notes: {
                planId: plan._id,
                planName: plan.name,
                userId: userId.toString()
            }
        };

        const order = await razorpay.orders.create(options);

        // Update transaction with order ID
        transaction.razorpayOrderId = order.id;
        await transaction.save();

        res.json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency
            },
            transactionId: transaction._id,
            planName: plan.name,
            key: process.env.RAZORPAY_ID_KEY
        });

    } catch (error) {
        console.error('Purchase Plan Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Verify payment
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, transactionId } = req.body;

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !transactionId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const userId = req.user._id;

        // Verify signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_ID_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature !== expectedSign) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }

        // Find transaction
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        // Verify transaction belongs to user
        if (transaction.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        // Check if already paid
        if (transaction.isPaid) {
            return res.status(400).json({
                success: false,
                message: 'Transaction already completed'
            });
        }

        // Update transaction
        transaction.isPaid = true;
        transaction.razorpayPaymentId = razorpay_payment_id;
        transaction.razorpaySignature = razorpay_signature;
        transaction.paidAt = Date.now();
        await transaction.save();

        // Update user credits
        const user = await User.findById(userId);
        user.credits = (user.credits || 0) + transaction.credits;
        await user.save();

        res.json({
            success: true,
            message: 'Payment verified successfully',
            credits: transaction.credits,
            newBalance: user.credits
        });

    } catch (error) {
        console.error('Verify Payment Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get user transactions
export const getUserTransactions = async (req, res) => {
    try {
        const userId = req.user._id;

        const transactions = await Transaction.find({ userId, isPaid: true })
            .sort({ createdAt: -1 })
            .limit(10);

        res.json({ success: true, transactions });

    } catch (error) {
        console.error('Get Transactions Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ⚠️ TEMPORARY - Create test transaction for webhook testing
export const createTestTransaction = async (req, res) => {
    try {
        const { planId, userId } = req.body;
        
        // Use default values if not provided
        const testUserId = userId || req.user?._id || '691dc2972c867779bd5d4f87';
        const testPlanId = planId || 'pro';
        
        const plan = plans.find(p => p._id === testPlanId);
        
        if (!plan) {
            return res.status(400).json({
                success: false,
                message: 'Invalid plan'
            });
        }
        
        // Create transaction
        const transaction = await Transaction.create({
            userId: testUserId,
            planId: plan._id,
            amount: plan.price,
            credits: plan.credits,
            isPaid: false,
            razorpayOrderId: 'order_test_' + Date.now()
        });
        
        res.json({
            success: true,
            message: 'Test transaction created',
            transaction: {
                _id: transaction._id,
                razorpayOrderId: transaction.razorpayOrderId,
                planName: plan.name,
                credits: plan.credits,
                amount: plan.price
            }
        });
        
    } catch (error) {
        console.error('Create Test Transaction Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};