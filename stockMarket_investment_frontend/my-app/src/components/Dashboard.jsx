import React, { useContext, useMemo } from "react"; 
import { StockDataContext } from "../contexts/StockDataContext";
import {
    LineChart, Line, ResponsiveContainer, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, 
    PieChart, Pie, Sector 
} from "recharts";

import '../styles/Dashboard.css';


const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D4FF'];


const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={14} fontWeight="bold">
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector 
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Value ₹${value.toFixed(2)}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


const Dashboard = ({ scrollToSection, setSelectedStockSymbol }) => {
  
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

   
    const [activeIndex, setActiveIndex] = React.useState(0);
    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <div className="dashboard-container">
           
            <aside className="left-sidebar">
                <h3>My Watchlist</h3>
                <p>Track and monitor your investments.</p>
                <h4>Suggested for You</h4>
                {availableStocks && availableStocks.length > 0 ? (
                    <ul className="stock-list">
                        {availableStocks.slice(0, 5).map(stock => ( 
                            <li key={stock.symbol} className="stock-item">
                                <div className="stock-info">
                                    <span className="stock-symbol">{stock.symbol}</span>
                                    <span className="stock-name">{stock.name}</span>
                                </div>
                                <div className="stock-values">
                                    <span className="stock-price">₹{stock.price?.toFixed(2) ?? 'N/A'}</span>
                                    <span className={`stock-change ${stock.change >= 0 ? "positive" : "negative"}`}>
                                        {stock.change?.toFixed(2) ?? 'N/A'}%
                                    </span>
                                </div>
                                <button
                                    className="add-button"
                                    onClick={() => handleStockClick(stock.symbol)}
                                    title={`View ${stock.symbol} details`}
                                >
                                    +
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No stocks available in watchlist.</p>
                )}
            </aside>

          
            <main className="main-content">
                <h2>Portfolio Overview</h2>
               
                <div className="dashboard-metrics">
                    <div className="metric-card">
                        <h3>Total Value</h3> 
                        <p>₹{portfolioMetrics.totalValue.toFixed(2)}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Daily Gain/Loss</h3> 
                        <p className={portfolioMetrics.dailyChangeValue >= 0 ? "positive" : "negative"}>
                            ₹{portfolioMetrics.dailyChangeValue.toFixed(2)}
                        </p>
                    </div>
                    <div className="metric-card">
                        <h3>Top Performer</h3> 
                        <p>{portfolioMetrics.topStock.symbol} ({portfolioMetrics.topStock.change}%)</p>
                    </div>
                    <div className="metric-card">
                        <h3>Worst Performer</h3>
                        <p>{portfolioMetrics.worstStock.symbol} ({portfolioMetrics.worstStock.change}%)</p>
                    </div>
                </div>

              
                <div className="dashboard-charts">
                   
                    <div className="chart-wrapper">
                        <h3>Performance Analysis (% Change)</h3>
                        {portfolioMetrics.performanceData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={portfolioMetrics.performanceData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                    <XAxis dataKey="name" tick={{ fontSize: 10 }}/>
                                    <YAxis tickFormatter={(tick) => `${tick}%`} tick={{ fontSize: 10 }} allowDecimals={false}/>
                                    <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, "Change"]}/>
                                    <Bar dataKey="change">
                                        {portfolioMetrics.performanceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.change >= 0 ? '#28a745' : '#dc3545'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="no-data-message">No performance data available.</p>
                        )}
                    </div>

                  
                    <div className="chart-wrapper">
                        <h3>Portfolio Allocation (by Value)</h3>
                         {portfolioMetrics.allocationData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        activeIndex={activeIndex}
                                        activeShape={renderActiveShape} 
                                        data={portfolioMetrics.allocationData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60} 
                                        outerRadius={85}
                                        fill="#8884d8"
                                        dataKey="value"
                                        onMouseEnter={onPieEnter}
                                        paddingAngle={2} 
                                    >
                                        {portfolioMetrics.allocationData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                 
                                     <Tooltip formatter={(value, name) => [`₹${value.toFixed(2)} (${(value / portfolioMetrics.totalValue * 100).toFixed(1)}%)`, name]}/>
                                </PieChart>
                            </ResponsiveContainer>
                         ) : (
                            <p className="no-data-message">No allocation data available.</p>
                         )}
                    </div>

                    
                </div>

            </main>

           
            <aside className="right-sidebar">
                <h2>Market News</h2>
                <div className="news-section">
                    
                    <p>🔹 Reliance sees major investment in green energy.</p>
                    <p>🔹 IT sector booming with new AI innovations.</p>
                    <p>🔹 Banking stocks gain momentum in Q1 results.</p>
                    <p>🔹 Pharma stocks show steady growth.</p>
                </div>
            </aside>
        </div>
    );
};

export default Dashboard;