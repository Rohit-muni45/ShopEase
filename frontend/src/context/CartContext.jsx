import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import apiUrl from "../../apiUrl.json";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartCount, setCartCount] = useState(0);
    const { user } = useContext(AuthContext);

    const fetchCartCount = async () => {
        if (!user) {
            setCartCount(0);
            return;
        }

        try {
            const res = await api.get(apiUrl.GetCart);
            const items = res.data.items.length;
            setCartCount(items);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user) fetchCartCount();
        else {
            setCartCount(0);
        }
    }, [user]);

    const updateCartCount = (count) => setCartCount(count);

    return (
        <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
