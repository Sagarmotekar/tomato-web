import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState("");

    const url = import.meta.env.VITE_BACKEND_URL;

    // Add item to cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        }
    };

    // Total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find(product => product._id === itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    };

    // Fetch all foods from backend
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                // Use the full Cloudinary image URL directly
                const foodsWithUrl = response.data.data.map(item => ({
                    ...item,
                    image: item.image // Already Cloudinary URL
                }));
                setFoodList(foodsWithUrl);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Load cart from backend if user is logged in
    const loadCartData = async () => {
        try {
            if (!token) return;
            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                const savedToken = localStorage.getItem("token");
                setToken(savedToken);
                await loadCartData();
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
