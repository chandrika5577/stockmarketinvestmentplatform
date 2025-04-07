import React, { useContext } from "react";
import StockDataContext from '../contexts/StockDataContext';

const StockDetails = ({ symbol }) => {
  const { selectedStockData, selectedPeers } = useContext(StockDataContext);

  if (!selectedStockData) return null;

  return (
    <div className="mt-4 p-3 border rounded bg-light">
      <h4>Stock Details: {selectedStockData.name} ({symbol})</h4>
      <p>Price: ₹{selectedStockData.currentPrice}</p>
      <p>Change (24H): {selectedStockData.change24H}%</p>
      <p>Market Cap: ₹{selectedStockData.marketCap}</p>

      <h5>Competitor Stocks</h5>
      <ul>
        {selectedPeers.map((peer) => (
          <li key={peer.symbol}>{peer.name} - ₹{peer.currentPrice}</li>
        ))}
      </ul>
    </div>
  );
};

export default StockDetails;
