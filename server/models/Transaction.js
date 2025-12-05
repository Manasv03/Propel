import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planId: { type: String, required: true },
    amount: { type: Number, required: true },
    credits: { type: Number, required: true },
    isPaid: { type: Boolean, required: false },
    razorpayOrderId: {type: String},
    razorpayPaymentId: {type: String},
    razorpaySignature: {type: String},
    paidAt: {type: Date}
},{timestamps: true})

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;