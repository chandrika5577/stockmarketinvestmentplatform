import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ChartComponent({ historicalData, timeframe, setTimeframe }) {
  const [showNSE, setShowNSE] = useState(true);
  const [showBSE, setShowBSE] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
  const [show50DMA, setShow50DMA] = useState(false);
  const [show200DMA, setShow200DMA] = useState(false);

  // Transforming historical data for Recharts
  const chartData = historicalData.map((data) => ({
    date: data.date,
    nsePrice: data.nsePrice,
    bsePrice: data.bsePrice,
    volume: data.volume,
  }));

  // Function to calculate Simple Moving Average (SMA)
  const calculateSMA = (data, window) => {
    return data.map((_, index) => {
      if (index < window - 1) return null;
      const sum = data
        .slice(index - window + 1, index + 1)
        .reduce((a, b) => a + b, 0);
      return sum / window;
    });
  };

  // Compute 50-day and 200-day SMA for NSE Prices
  const sma50 = calculateSMA(chartData.map((d) => d.nsePrice), 50);
  const sma200 = calculateSMA(chartData.map((d) => d.nsePrice), 200);

  // Append SMA values to chartData
  chartData.forEach((d, index) => {
    d.sma50 = sma50[index];
    d.sma200 = sma200[index];
  });

  const containerStyle = {
    width: "100%",
    height: "500px",
    position: "relative",
    padding: "10px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    margin: "10px 0",
  };

  const timeframeStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    display: "flex",
    gap: "15px",
    zIndex: 100,
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#666",
    fontSize: "14px",
    padding: "2px 5px",
    transition: "all 0.2s",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    color: "#2962FF",
    fontWeight: "600",
    borderBottom: "2px solid #2962FF",
  };

  const checkboxContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "15px",
    flexWrap: "wrap",
    padding: "10px",
    background: "#f5f5f5",
    borderRadius: "8px",
  };

  return (
    <div style={containerStyle}>
      {/* Timeframe Selector */}
      <div style={timeframeStyle}>
        {["1D", "1W", "1M", "1Y", "2Y"].map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            style={timeframe === tf ? activeButtonStyle : buttonStyle}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* AreaChart */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />

          {showNSE && (
            <Area type="monotone" dataKey="nsePrice" stroke="#FFD700" fill="#FFD70040" name="NSE Price" />
          )}
          {showBSE && (
            <Area type="monotone" dataKey="bsePrice" stroke="#FF4500" fill="#FF450040" name="BSE Price" />
          )}
          {showVolume && (
            <Area type="monotone" dataKey="volume" stroke="#1E90FF" fill="#1E90FF40" name="Volume" />
          )}
          {show50DMA && (
            <Area type="monotone" dataKey="sma50" stroke="#32CD32" fill="none" strokeDasharray="5 5" name="50 DMA" />
          )}
          {show200DMA && (
            <Area type="monotone" dataKey="sma200" stroke="#9400D3" fill="none" strokeDasharray="5 5" name="200 DMA" />
          )}
        </AreaChart>
      </ResponsiveContainer>

      {/* Toggle Checkboxes */}
      <div style={checkboxContainerStyle}>
        {[
          { label: "NSE", state: showNSE, setter: setShowNSE },
          { label: "BSE", state: showBSE, setter: setShowBSE },
          { label: "Volume", state: showVolume, setter: setShowVolume },
          { label: "50 DMA", state: show50DMA, setter: setShow50DMA },
          { label: "200 DMA", state: show200DMA, setter: setShow200DMA },
        ].map((item) => (
          <label key={item.label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              type="checkbox"
              checked={item.state}
              onChange={() => item.setter(!item.state)}
              style={{ accentColor: "#2962FF" }}
            />
            <span style={{ color: "#333", fontSize: "14px" }}>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default ChartComponent;
