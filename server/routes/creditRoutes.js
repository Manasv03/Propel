import express from 'express';
import { 
    getPlans, 
    purchasePlan, 
    verifyPayment, 
    getUserTransactions,
    createTestTransaction,
} from '../controllers/creditController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/plans', getPlans);
router.post('/purchase', protect, purchasePlan);
router.post('/verify', protect, verifyPayment);
router.get('/transactions', protect, getUserTransactions);

if(process.env.NODE_ENV !== 'production'){
    router.post('/create-test-transaction', createTestTransaction)
} 

export default router;
