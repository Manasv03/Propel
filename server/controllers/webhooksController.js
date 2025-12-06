import crypto from 'crypto';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

// Main webhook handler (production)
export const handleRazorpayWebhook = async (req, res) => {
    try {
        const webhookSignature = req.headers['x-razorpay-signature'];
        const webhookBody = JSON.stringify(req.body);
        
        console.log('📥 Webhook received:', req.body.event);
        
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
            .update(webhookBody)
            .digest('hex');
        
        if (webhookSignature !== expectedSignature) {
            console.error('❌ Invalid webhook signature');
            return res.status(400).json({
                success: false,
                message: 'Invalid signature'
            });
        }
        
        console.log('✅ Webhook signature verified');
        
        const event = req.body.event;
        const paymentEntity = req.body.payload.payment.entity;
        
        switch (event) {
            case 'payment.captured':
                await handlePaymentSuccess(paymentEntity);
                break;
                
            case 'payment.failed':
                await handlePaymentFailure(paymentEntity);
                break;
                
            default:
                console.log('ℹ️ Unhandled webhook event:', event);
        }
        
        res.status(200).json({ success: true });
        
    } catch (error) {
        console.error('❌ Webhook Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// TEST WEBHOOK (Development only)
export const testWebhook = async (req, res) => {
    try {
        console.log('🧪 TEST WEBHOOK CALLED');
        console.log('📥 Body received:', req.body);
        console.log('📥 Event:', req.body?.event);
        
        if (!req.body || !req.body.event) {
            return res.status(400).json({
                success: false,
                message: 'Invalid webhook payload. Missing event or payload.'
            });
        }
        
        const event = req.body.event;
        const paymentEntity = req.body.payload?.payment?.entity;
        
        if (!paymentEntity) {
            return res.status(400).json({
                success: false,
                message: 'Invalid webhook payload. Missing payment entity.'
            });
        }
        
        console.log('Event:', event);
        console.log('Payment ID:', paymentEntity.id);
        console.log('Order ID:', paymentEntity.order_id);
        
        switch (event) {
            case 'payment.captured':
                await handlePaymentSuccess(paymentEntity);
                res.json({ 
                    success: true, 
                    message: 'Test payment captured successfully',
                    paymentId: paymentEntity.id,
                    orderId: paymentEntity.order_id
                });
                break;
                
            case 'payment.failed':
                await handlePaymentFailure(paymentEntity);
                res.json({ 
                    success: true, 
                    message: 'Test payment failure recorded',
                    paymentId: paymentEntity.id 
                });
                break;
                
            default:
                res.json({ 
                    success: true, 
                    message: 'Event received',
                    event: event 
                });
        }
        
    } catch (error) {
        console.error('❌ Test Webhook Error:', error);
        res.status(500).json({
            success: false,
            message: error.message,
            error: error.stack
        });
    }
};

// Handle successful payment
const handlePaymentSuccess = async (payment) => {
    try {
        console.log('💰 Processing successful payment:', payment.id);
        
        const orderId = payment.order_id;
        
        const transaction = await Transaction.findOne({ 
            razorpayOrderId: orderId 
        });
        
        if (!transaction) {
            console.error('❌ Transaction not found for order:', orderId);
            throw new Error(`Transaction not found for order: ${orderId}`);
        }
        
        if (transaction.isPaid) {
            console.log('ℹ️ Payment already processed:', payment.id);
            return;
        }
        
        transaction.isPaid = true;
        transaction.razorpayPaymentId = payment.id;
        transaction.paymentStatus = 'success';
        transaction.paidAt = new Date();
        await transaction.save();
        
        const user = await User.findById(transaction.userId);
        
        if (user) {
            user.credits = (user.credits || 0) + transaction.credits;
            await user.save();
            
            console.log(`✅ Added ${transaction.credits} credits to user ${user.email}`);
            console.log(`💳 New balance: ${user.credits} credits`);
        }
        
    } catch (error) {
        console.error('❌ Error processing payment success:', error);
        throw error;
    }
};

// Handle failed payment
const handlePaymentFailure = async (payment) => {
    try {
        console.log('❌ Processing failed payment:', payment.id);
        
        const orderId = payment.order_id;
        
        const transaction = await Transaction.findOne({ 
            razorpayOrderId: orderId 
        });
        
        if (transaction) {
            transaction.paymentStatus = 'failed';
            transaction.razorpayPaymentId = payment.id;
            await transaction.save();
            
            console.log('💔 Payment failed for transaction:', transaction._id);
        }
        
    } catch (error) {
        console.error('❌ Error processing payment failure:', error);
        throw error;
    }
};