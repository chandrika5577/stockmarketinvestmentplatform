import React, { useContext, useState,useMemo } from 'react';
import StockDataContext from '../contexts/StockDataContext';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    PieChart, Pie, Cell, Tooltip, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, Legend
  } from 'recharts'
  
import '../styles/Dashboard.css'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = ({ setSelectedStockSymbol, scrollToSection }) => {
  const { availableStocks = [], fetchStockDetails, fetchPeers } = useContext(StockDataContext);

  const handleStockClick = (symbol) => {
    if (fetchStockDetails && fetchPeers && setSelectedStockSymbol && scrollToSection) {
      fetchStockDetails(symbol);
      fetchPeers(symbol);
      setSelectedStockSymbol(symbol);
      scrollToSection("charts");
    } else {
      console.error("One or more required functions/props are missing in Dashboard.jsx!");
    }
  };

  const portfolioMetrics = useMemo(() => {
    if (!availableStocks || availableStocks.length === 0) {
      return {
        totalValue: 0,
        dailyChangeValue: 0,
        topStock: { name: 'N/A', symbol: '', change: 0 },
        worstStock: { name: 'N/A', symbol: '', change: 0 },
        performanceData: [],
        allocationData: []
      };
    }

    const totalValue = availableStocks.reduce((total, stock) => total + (stock.price || 0), 0);

    const dailyChangeValue = availableStocks.reduce((total, stock) => {
      const valueBeforeChange = stock.price / (1 + (stock.change || 0) / 100);
      const changeAmount = valueBeforeChange * ((stock.change || 0) / 100);
      return total + changeAmount;
    }, 0);

    const topStock = availableStocks.reduce((prev, current) =>
      (prev.change || -Infinity) > (current.change || -Infinity) ? prev : current
    );

    const worstStock = availableStocks.reduce((prev, current) =>
      (prev.change || Infinity) < (current.change || Infinity) ? prev : current
    );

    const performanceData = availableStocks.map(stock => ({
      name: stock.symbol,
      change: stock.change || 0
    }));

    const allocationData = availableStocks.map(stock => ({
      name: stock.symbol,
      value: stock.price || 0
    })).filter(item => item.value > 0);

    return {
      totalValue,
      dailyChangeValue,
      topStock,
      worstStock,
      performanceData,
      allocationData
    };
  }, [availableStocks]);

  const pieData = availableStocks.reduce((acc, stock) => {
    const found = acc.find(item => item.name === stock.sector);
    if (found) {
      found.value += 1;
    } else {
      acc.push({ name: stock.sector, value: 1 });
    }
    return acc;
  }, []);

  if (!availableStocks || availableStocks.length === 0) {
    return <p>Loading stock data...</p>;
  }

  return (
    <div className="dashboard-layout">

    
      <aside className="portfolio-column">
        <h2>Portfolio</h2>

        <div className="metric-box">
          <h4>Total Value</h4>
          <p>₹{portfolioMetrics.totalValue.toFixed(2)}</p>
        </div>

        <div className="metric-box">
          <h4>Daily Gain/Loss</h4>
          <p className={portfolioMetrics.dailyChangeValue >= 0 ? 'positive' : 'negative'}>
            ₹{portfolioMetrics.dailyChangeValue.toFixed(2)}
          </p>
        </div>

        <div
          className="metric-box clickable"
          onClick={() => handleStockClick(portfolioMetrics.topStock.symbol)}
        >
          <h4>Top Performer</h4>
          <p>
            {portfolioMetrics.topStock.symbol} ({portfolioMetrics.topStock.change}%)
          </p>
        </div>

        <div
          className="metric-box clickable"
          onClick={() => handleStockClick(portfolioMetrics.worstStock.symbol)}
        >
          <h4>Worst Performer</h4>
          <p>
            {portfolioMetrics.worstStock.symbol} ({portfolioMetrics.worstStock.change}%)
          </p>
        </div>
      </aside>

      
      <section className="charts-column">
        <h2>Performance Insights</h2>
        <div className="charts-grid">

         
          <div className="chart-box">
            <h4>{portfolioMetrics.topStock.symbol} Price Trend</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={portfolioMetrics.topStock.historicalData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#007bff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

         
          <div className="chart-box">
            <h4>{portfolioMetrics.topStock.symbol} Volume</h4>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={portfolioMetrics.topStock.historicalData || []}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="volume" stroke="#00C49F" fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          
          <div className="chart-box">
            <h4>Daily Change Comparison</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={portfolioMetrics.performanceData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="change" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

         
          <div className="chart-box">
            <h4>Sector Allocation</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </section>

    
      <section className="watchlist-section">
        <h2>Watchlist</h2>
        <div className="watchlist-grid">
          {availableStocks.map(stock => (
            <div className="watch-card" key={stock.symbol}>
              <h4>{stock.symbol}</h4>
              <p>
                ₹{stock.price}{' '}
                <span className={stock.change >= 0 ? 'positive' : 'negative'}>
                  {stock.change}%
                </span>
              </p>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={stock.historicalData}>
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;