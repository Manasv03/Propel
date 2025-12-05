import express from 'express';
import { 
    getPlans, 
    purchasePlan, 
    verifyPayment, 
    getUserTransactions,
} from '../controllers/creditController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/plans', getPlans);
router.post('/purchase', protect, purchasePlan);
router.post('/verify', protect, verifyPayment);
router.get('/transactions', protect, getUserTransactions);

export default router;
