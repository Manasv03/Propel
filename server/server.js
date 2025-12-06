import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import creditRoutes from './routes/creditRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';

const app = express();

await connectDB();

// Middleware
app.use(cors());
app.use('/api/webhook', webhookRoutes);
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Server is Live!'))
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)
app.use('/api/credits', creditRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
     console.log(`Webhook endpoint: http://localhost:${PORT}/api/webhook/razorpay`);
})