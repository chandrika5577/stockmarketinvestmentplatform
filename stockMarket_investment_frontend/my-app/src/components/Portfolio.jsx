import React, { useState, useRef, useContext, useEffect } from "react";
import "../styles/Portfolio.css";
import { FaEdit } from "react-icons/fa";
import StockDataContext from '../contexts/StockDataContext';
import ChartComponent from "./ChartComponent";
import StockDetails from "./StockDetails.jsx";
import Holdings from "./Holdings.jsx";
import Wishlist from "./Wishlist.jsx"
import { fetchWishlist } from "../api";
import Dashboard from "./Dashboard.jsx";

const Portfolio = () => {
    const {
      
        availableStocks,
        wishlist,
        addToWishlist,
        setWishlist,
        stockDetails,
        fetchStockDetails,
        fetchPeers,
        calculateProfitLoss,
        
        removeFromWishlist
    } = useContext(StockDataContext);
   

    const [activeTab, setActiveTab] = useState("charts");
    const sections = useRef({});
    const [selectedStockSymbol, setSelectedStockSymbol] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [hasDemat, setHasDemat] = useState(null);
    const [portfolio, setPortfolio] = useState([]);
    const { userId } = useContext(StockDataContext);

    const scrollToSection = (id) => {
        if (sections.current[id]) {
            sections.current[id].scrollIntoView({ behavior: "smooth" });
            setActiveTab(id);
        }
    };

 
    const addToStocks = (stock) => {
        setPortfolio((prevPortfolio) => [...prevPortfolio, stock]);
        console.log("Updated Portfolio:", portfolio);
        sections.current["holdings"]?.scrollIntoView({ behavior: "smooth" });
    };
    
    
      
   
    const loadWishlist = async () => {
        try {
            const data = await fetchWishlist(userId);
            console.log("Fetched wishlist:", data);
            setWishlist(data || []); 
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };
    

    useEffect(() => {
        loadWishlist();
    }, [userId]);



    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const results = availableStocks.filter((stock) =>
            stock.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
    };



    const handleStockSelect = (symbol) => {
        setSelectedStockSymbol(symbol);
        setSearchQuery("");
        setSearchResults([]);
        fetchStockDetails(symbol);
        fetchPeers(symbol);
    };


    useEffect(() => {
        const storedStock = localStorage.getItem("selectedStock");
        if (storedStock) {
            setSelectedStockSymbol(storedStock);
            fetchStockDetails(storedStock);
            fetchPeers(storedStock);
            addToStocks(availableStocks.find((stock) => stock.symbol === storedStock)); 
            localStorage.removeItem("selectedStock"); 
        }
    }, [availableStocks]); 
    
    


   

    const selectedStock = availableStocks.find(
        (stock) => stock.symbol === selectedStockSymbol
    );

    const currentStockDetails = stockDetails[selectedStockSymbol] || {
        description: "No details available.",
        history: [],
    };
    const profitLossData = calculateProfitLoss();

    const stockProfitLoss = profitLossData.find(
        (item) => item.symbol === selectedStockSymbol
    );
    const profitLossValue = stockProfitLoss ? stockProfitLoss.profitLoss : 0;

    useEffect(() => {
        if (availableStocks.length > 0 && selectedStockSymbol === null) {
            setSelectedStockSymbol(availableStocks[0].symbol);
        }
    }, [availableStocks, selectedStockSymbol]);

    
    

    
    


    return (
        <div className="portfolio-container">
   
            <div className="portfolio-navbar">
                {[
                    "charts",
                    "holdings",
                    "buystocks",
                    "wishlist",
                    "profit-loss",
                ].map((tab) => (
                    <button
                        key={tab}
                        className={activeTab === tab ? "active" : ""}
                        onClick={() => scrollToSection(tab)}
                    >
                        {tab.replace("-", " ").toUpperCase()}
                    </button>
                ))}
            </div>


             

            <div className="portfolio-content" ref={(el) => (sections.current["portfolio-content"] = el)}>
            
                <div className="stock-details">
                    {selectedStock && (
                        <>
                            <h1 className="stock-name">{selectedStock.name}</h1>
                            <p className="stock-symbol">
                                {selectedStock.exchange}: {selectedStock.symbol}
                            </p>
                            <div className="stock-info-grid">
                                <div className="info-box">
                                    <span>Market Cap</span>
                                    <strong>{selectedStock.marketCap}</strong>
                                </div>
                                <div className="info-box">
                                    <span>Current Price</span>
                                    <strong>₹{selectedStock.price.toFixed(2)}</strong>
                                </div>
                                <div className="info-box">
                                    <span>High / Low</span>
                                    <strong>{selectedStock.highLow}</strong>
                                </div>
                                <div className="info-box">
                                    <span>Stock P/E</span>
                                    <strong>{selectedStock.peRatio}</strong>
                                </div>
                                <div className="info-box">
                                    <span>Book Value</span>
                                    <strong>{selectedStock.bookValue}</strong>
                                </div>
                                <div className="info-box">
                                    <span>Dividend Yield</span>
                                    <strong>{selectedStock.dividendYield}</strong>
                                </div>
                                <div className="info-box">
                                    <span>ROCE</span>
                                    <strong>{selectedStock.roce}</strong>
                                </div>
                                <div className="info-box">
                                    <span>ROE</span>
                                    <strong>{selectedStock.roe}</strong>
                                </div>
                                <div className="info-box">
                                    <span>Face Value</span>
                                    <strong>{selectedStock.faceValue}</strong>
                                </div>
                            </div>
                            <div className="search-and-edit-container">
                                <input
                                    type="text"
                                    placeholder="Search and Add Stocks here"
                                    className="ratio-input"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <button className="edit-ratio-btn"><FaEdit />Add Stocks</button>
                            </div>
                            {searchQuery && (
                                <div className="search-results">
                                    {searchResults.map((stock) => (
                                        <div
                                            key={stock.symbol}
                                            className="search-result-item"
                                            onClick={() => handleStockSelect(stock.symbol)}
                                        >
                                            {stock.name} ({stock.symbol})
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="company-overview">
    {selectedStock && (
        <>
            <h2>Description</h2>
            <p>
                {selectedStock.name} is a leading company in its industry, known for its strong market presence and consistent performance. 
                The company has a diverse portfolio, catering to various segments and maintaining a competitive edge in the financial market.
            </p>

            <h3>Key Points</h3>
            <ul>
                <li><strong>Industry Leader:</strong> {selectedStock.name} holds a significant position in the {selectedStock.sector} sector.</li>
                <li><strong>Revenue Growth:</strong> Consistently reports strong financial performance and revenue growth.</li>
                <li><strong>Market Presence:</strong> Actively traded on {selectedStock.exchange} with a robust market cap.</li>
                <li><strong>Investment Potential:</strong> Considered a strong investment option based on financial indicators.</li>
                <li><strong>Dividend Policy:</strong> {selectedStock.name} has a stable dividend yield, benefiting long-term investors.</li>
            </ul>
        </>
    )}
</div>

            </div>






            

            <div ref={(el) => (sections.current["charts"] = el)} id="charts" className="section-container">
                <h3>Charts</h3>
                {selectedStock && (
                    <div style={{ width: '100%' }}>
                        <ChartComponent historicalData={selectedStock.historicalData} />
                    </div>
                )}
            </div>




            <div
                ref={(el) => (sections.current["holdings"] = el)}
                id="holdings"
                className="section-container"
            >
                <h3>Holdings</h3>
                <Holdings
                    portfolio={portfolio}  
                    availableStocks={availableStocks}
                    fetchStockDetails={fetchStockDetails}
                    fetchPeers={fetchPeers}
                    scrollToSection={scrollToSection}
                    setSelectedStockSymbol={setSelectedStockSymbol}
                    addToWishlist={addToWishlist}
                    addToStocks={addToStocks}
                />
                


                {selectedStockSymbol && <StockDetails symbol={selectedStockSymbol} />}
            </div>


            <div ref={(el) => (sections.current["buystocks"] = el)} id="buystocks" className="section-container">
                    <h3>Buystocks</h3>
                    <p>Do you have a Demat account?</p>
                    <button onClick={() => setHasDemat(true)}>Yes</button>
                    <button onClick={() => setHasDemat(false)}>No</button>
                    {hasDemat === true && (
                        <div>
                            <p>Select a brokerage platform:</p>
                            <ul>
                                <li><a href="https://groww.in" target="_blank" rel="noopener noreferrer">Groww</a></li>
                                <li><a href="https://zerodha.com" target="_blank" rel="noopener noreferrer">Zerodha</a></li>
                            </ul>
                        </div>
                    )}
                    {hasDemat === false && (
                        <div>
                            <p>You need a Demat account to buy stocks. Watch this tutorial to learn how:</p>
                            <a href="https://www.youtube.com/results?search_query=how+to+create+demat+account" target="_blank" rel="noopener noreferrer">Watch Tutorial</a>
                        </div>
                    )}
                </div>





                <div ref={(el) => (sections.current["wishlist"] = el)} id="wishlist" className="section-container">
                   
                    <Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />

                </div>




                <div ref={(el) => (sections.current["profit-loss"] = el)} id="profit-loss" className="profit-loss-container">
  <h3 className="profit-loss-title">📈 Profit/Loss Overview</h3>

  <div className="profit-loss-content">
    {/* Profit/Loss Details */}
    {selectedStock ? (
      <div className={`profit-loss-card ${profitLossValue >= 0 ? "profit" : "loss"}`}>
        <div className="stock-header">
          <span className="stock-name">{selectedStock.name} ({selectedStock.symbol})</span>
          <span className={`change-percentage ${profitLossValue >= 0 ? "positive" : "negative"}`}>
            {selectedStock.purchasePrice && selectedStock.quantity
              ? `${((profitLossValue / (selectedStock.purchasePrice * selectedStock.quantity)) * 100).toFixed(2)}%`
              : "N/A"}
          </span>
        </div>

        <div className="profit-details">
          <div className="price-info">
            <p>Entry Price: <span>₹{selectedStock.purchasePrice ? selectedStock.purchasePrice.toFixed(2) : "N/A"}</span></p>
            <p>Current Price: <span>₹{selectedStock.price ? selectedStock.price.toFixed(2) : "N/A"}</span></p>
          </div>

          <div className="investment-summary">
            <p>Invested: <span>₹{selectedStock.purchasePrice && selectedStock.quantity ? 
              (selectedStock.purchasePrice * selectedStock.quantity).toFixed(2) : "N/A"}</span></p>
            <p>Current Value: <span>₹{selectedStock.price && selectedStock.quantity ? 
              (selectedStock.price * selectedStock.quantity).toFixed(2) : "N/A"}</span></p>
            <p className={`net-profit ${profitLossValue >= 0 ? "positive" : "negative"}`}>
              Net P/L: <span>₹{profitLossValue ? profitLossValue.toFixed(2) : "N/A"}</span>
            </p>
          </div>
        </div>
      </div>
    ) : (
      <p className="empty-state">📊 Select a stock to view Profit/Loss</p>
    )}

    {/* Historical Performance Chart */}
    <div className="chart-container">
      <h4>📊 7-Day Performance Trend</h4>
      {selectedStock?.historicalData ? (
        <ChartComponent historicalData={selectedStock.historicalData} />
      ) : (
        <p>No historical data available.</p>
      )}
    </div>
  </div>
</div>




        </div>
    );
};

export default Portfolio;