const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Get auth token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token'); // Adjust this based on where you store token
};

// API call helper
const apiCall = async (endpoint, options = {}) => {
    const token = getAuthToken();
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, message: error.message };
    }
};

export default apiCall;