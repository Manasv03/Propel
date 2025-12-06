import express from 'express';
import { handleRazorpayWebhook, testWebhook } from '../controllers/webhooksController.js';

const router = express.Router();

// Production webhook endpoint (with signature verification)
router.post('/razorpay', express.raw({ type: 'application/json' }), handleRazorpayWebhook);

// DEVELOPMENT ONLY - Test endpoint without signature verification
router.post('/test', express.json(), testWebhook);

// Health check
router.get('/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Webhook endpoint is working',
        timestamp: new Date().toISOString()
    });
});

export default router;