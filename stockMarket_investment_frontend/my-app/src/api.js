import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}` // Ensure token is stored in localStorage after login
    },
});

// Authentication APIs
export const loginUser = async (formData) => {
    try {
        const response = await api.post("/users/login", formData);
        console.log("Login API Response:", response.data); // ✅ Debugging API response

        if (response.data && response.data.userId) {
            const userData = {
                id: response.data.userId,  
                name: response.data.name || "guest", // ✅ Default to Guest if missing
                email: response.data.email || "",  // ✅ Ensure email is stored
            };

            localStorage.setItem("user", JSON.stringify(userData)); // ✅ Store only relevant fields
            console.log("User stored in localStorage:", userData);
        }
        
        return response;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error;
    }
};



export const registerUser = async (formData) => api.post("/users/register", formData);


// Wishlist APIs
export const addToWishlist = async (userId, stock) => {
    console.log("Sending request to backend...", { userId, stock });

    try {
        const response = await api.post("/stocks/wishlist/add", { userId, ...stock });
        console.log("Add Wishlist API Response:", response.data);
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
        console.log("Fetched Wishlist Data from Backend:", response.data); // ✅ Debugging
        return response.data;
    } catch (error) {
        console.error("Error fetching wishlist:", error.response?.data || error.message);
    }
};

export const saveBudget = async (budgetData) => {
    console.log("Sending Budget Data to Backend:", budgetData); // ✅ Debugging

    try {
        const response = await api.post("/budget/set", budgetData); // Update endpoint
        console.log("API Response:", response.data); // ✅ Debugging
        return response.data;
    } catch (error) {
        console.error("Error saving budget:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchBudget = async (userId) => {
    try {
        const response = await api.get(`/budget/${userId}`); // Matches your backend endpoint
        console.log("Fetched Budget:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching budget:", error.response?.data || error.message);
        throw error;
    }
};


export default api;
