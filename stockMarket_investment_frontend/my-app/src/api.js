import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
});

export const loginUser = async (formData) => {
    try {
        const response = await api.post("/users/login", formData);
        
        if (response.data && response.data.userId) {
            const userData = {
                id: response.data.userId,  
                name: response.data.name || "guest",
                email: response.data.email || "",
            };

            localStorage.setItem("user", JSON.stringify(userData));
        }
        
        return response;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  

export const registerUser = async (formData) => api.post("/users/register", formData);

export const addToWishlist = async (userId, stock) => {
    try {
        const response = await api.post("/stocks/wishlist/add", { userId, ...stock });
        return response.data;
    } catch (error) {
        console.error("Error in Wishlist API:", error.response?.data || error.message);
    }
};

export const removeFromWishlist = async (userId, symbol) => {
    try {
        await api.post("/stocks/wishlist/remove", { userId, symbol });
    } catch (error) {
        console.error("Error removing from wishlist:", error.response?.data || error.message);
    }
};

export const fetchWishlist = async (userId) => {
    try {
        const response = await api.get(`/stocks/wishlist/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching wishlist:", error.response?.data || error.message);
    }
};

export const saveBudget = async (budgetData) => {
    try {
        const response = await api.post("/budget/set", budgetData);
        return response.data;
    } catch (error) {
        console.error("Error saving budget:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchBudget = async (userId) => {
    try {
        const response = await api.get(`/budget/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching budget:", error.response?.data || error.message);
        throw error;
    }
};

export default api;
