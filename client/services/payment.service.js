import apiCall from '../services/api.services';

export const getPlans = async () => {
    return await apiCall('/api/credits/plans');
};

export const createRazorpayOrder = async (planId) => {
    return await apiCall('/api/credits/purchase', {
        method: 'POST',
        body: JSON.stringify({ planId }),
    });
};

export const verifyRazorpayPayment = async (paymentData) => {
    return await apiCall('/api/credits/verify', {
        method: 'POST',
        body: JSON.stringify(paymentData),
    });
};

export const getUserTransactions = async () => {
    return await apiCall('/api/credits/transactions');
};