import express from 'express';
import { textMessageController, imageMessageController} from '../controllers/messageController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Main routes
router.post('/text', protect, textMessageController);
router.post('/image', protect, imageMessageController);

export default router;