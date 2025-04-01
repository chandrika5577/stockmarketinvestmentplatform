import React, { useEffect, useRef } from "react";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import "../styles/StockTicker.css"

const stockData = [
    { symbol: "YESBANK", change: 2.05 },
    { symbol: "TTM", change: 0.0 },
    { symbol: "XRP", change: -3.62 },
    { symbol: "TATASTEEL", change: 1.88 },
    { symbol: "RELIANCE", change: 0.95 },
    { symbol: "INFY", change: -1.12 },
    { symbol: "HDFCBANK", change: 2.34 },
    { symbol: "TCS", change: -0.45 },
    { symbol: "ONGC", change: 1.76 },
    { symbol: "BAJFINANCE", change: -0.89 },
    { symbol: "ICICIBANK", change: 1.52 },
    { symbol: "SBIN", change: -1.75 },
    { symbol: "HINDUNILVR", change: 0.65 },
    { symbol: "WIPRO", change: -0.35 },
    { symbol: "MARUTI", change: 2.10 },
    { symbol: "LT", change: -1.20 },
    { symbol: "AXISBANK", change: 0.85 },
    { symbol: "SUNPHARMA", change: -2.00 },
    { symbol: "ADANIPORTS", change: 1.30 },
  ];

const StockTicker = () => {
  const tickerRef = useRef(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    let animation;

    const startScrolling = () => {
      if (ticker) {
        ticker.style.transform = "translateX(100%)";
        animation = ticker.animate(
          [
            { transform: "translateX(100%)" },
            { transform: "translateX(-100%)" },
          ],
          { duration: 100000, iterations: Infinity, easing: "linear" }
        );
      }
    };

    startScrolling();
    return () => animation.cancel();
  }, []);

  return (
    <div className="stock-ticker-container">
      <div className="stock-ticker" ref={tickerRef}>
        {stockData.map((stock, index) => (
          <span key={index} className="stock-item">
            {stock.symbol} {" "}
            {stock.change > 0 ? (
              <span className="up">
                <VscTriangleUp /> +{stock.change.toFixed(2)}%
              </span>
            ) : stock.change < 0 ? (
              <span className="down">
                <VscTriangleDown /> {stock.change.toFixed(2)}%
              </span>
            ) : (
              <span className="neutral">= 0.00%</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;
