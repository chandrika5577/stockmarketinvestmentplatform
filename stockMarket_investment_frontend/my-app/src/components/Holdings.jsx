import React, { useState, useContext } from "react";
import StockDataContext from '../contexts/StockDataContext';
import { addToWishlist } from "../api";
import { IoMdAdd } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import "../styles/Holdings.css"

const Holdings = ({
  availableStocks,
  fetchStockDetails,
  fetchPeers,
  scrollToSection,
  setSelectedStockSymbol,
}) => {
  const [exchangeFilter, setExchangeFilter] = useState("All");
  const { userId, wishlist, setWishlist } = useContext(StockDataContext);

  const handleStockSelect = (symbol) => {
    fetchStockDetails(symbol);
    fetchPeers(symbol);
    setSelectedStockSymbol(symbol);
    scrollToSection("charts");
  };
  const handleAddToWishlist = async (stock) => {
    if (!userId) {
      console.error("User ID is missing!");
      return;
    }

    setWishlist((prevWishlist) => [...prevWishlist, stock]); 
    try {
      await addToWishlist(userId, stock);
      console.log("Wishlist API Response: Added successfully.");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const filteredStocks = availableStocks.filter(
    (stock) => exchangeFilter === "All" || stock.exchange === exchangeFilter
  );

  return (
    <div>
      <label htmlFor="exchangeFilter">Filter by Exchange:</label>
      <select
        id="exchangeFilter"
        value={exchangeFilter}
        onChange={(e) => setExchangeFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="NSE">NSE</option>
        <option value="BSE">BSE</option>
      </select>

      {filteredStocks.length === 0 ? (
        <p>No stocks available</p>
      ) : (
        <table className="table">
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
            {filteredStocks.map((stock) => (
              <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>₹{stock.price.toFixed(2)}</td>
                <td>{stock.exchange}</td>
                <td>
                  <button
                    className="add-btn"
                    onClick={() => handleStockSelect(stock.symbol)}
                  >
                    <IoMdAdd />
                  </button>
                  <button
                    className="wishlist-btn"
                    onClick={() => {
                      console.log("Wishlist button clicked for:", stock);
                      handleAddToWishlist(stock);
                    }}
                  >
                    <CiStar />
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

export default Holdings;
