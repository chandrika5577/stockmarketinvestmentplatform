import React, { useState, useEffect, useContext } from "react";
import { fetchWishlist, removeFromWishlist } from "../api";
import StockDataContext from '../contexts/StockDataContext';
import { CiCircleRemove } from "react-icons/ci";

const Wishlist = ({ scrollToSection }) => {
    const { userId ,wishlist,setWishlist} = useContext(StockDataContext);
    

    
    useEffect(() => { if (userId) loadWishlist(); }, [userId]);
    const loadWishlist = async () => {
        const data = await fetchWishlist(userId);
        setWishlist(data || []);
    };
    const handleRemoveFromWishlist = async (symbol) => {
        setWishlist((prevWishlist) => prevWishlist.filter(stock => stock.symbol !== symbol)); // Remove immediately
        await removeFromWishlist(userId, symbol);
        loadWishlist();
    };
    
    return (
        <div className="wishlist-container">
            <h2>My Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <table className="table wishlist-table">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Exchange</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlist.map((stock) => (
                            <tr key={stock.symbol}>
                                <td>{stock.symbol}</td>
                                <td>{stock.name}</td>
                                <td>₹{stock.price}</td>
                                <td>{stock.exchange}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromWishlist(stock.symbol)}>
                                    <CiCircleRemove />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Wishlist;