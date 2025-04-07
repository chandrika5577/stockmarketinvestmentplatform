import React, { createContext, useState, useEffect, useContext } from 'react';

const StockDataContext = createContext();

export const StockDataProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [wallet, setWallet] = useState(100000);
  const [portfolio, setPortfolio] = useState([]);
  const [availableStocks, setAvailableStocks] = useState([]);
  const [stockDetails, setStockDetails] = useState({});
  const [peers, setPeers] = useState({});
  const [investors, setInvestors] = useState({});
  const [history, setHistory] = useState([]);
  const [nseCompanies, setNseCompanies] = useState([]);
  const [bseCompanies, setBseCompanies] = useState([]);

  const news = [
    { title: "Market rallies today", source: "Economic Times" },
    { title: "Reliance shares hit new high", source: "MoneyControl" },
  ];

  // stock data from json file
  useEffect(() => {
    const loadStockData = async () => {
      try {
        const response = await fetch('/data/stockData.json');
        const data = await response.json();
        setAvailableStocks(data);
      } catch (error) {
        console.error('Error loading stock data:', error);
      }
    };
    loadStockData();
  }, []);

  //   price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAvailableStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const randomChange = (Math.random() - 0.5) * 2;
          const newPrice = stock.price + randomChange * 10;
          return { ...stock, price: newPrice, change: randomChange };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
      setName(storedUser.name);
      setEmail(storedUser.email);
    } else {
      console.error("No user found in localStorage!");
    }
  }, []);

  const getWishlistStocks = () => wishlist ?? [];

  const addStockToPortfolio = (stockToAdd, quantity, buyPrice) => {
    const existingStock = portfolio.find((stock) => stock.symbol === stockToAdd.symbol);
    if (existingStock) {
      setPortfolio((prevPortfolio) =>
        prevPortfolio.map((stock) =>
          stock.symbol === stockToAdd.symbol
            ? {
                ...stock,
                quantity: stock.quantity + quantity,
                buyPrice:
                  (stock.buyPrice * stock.quantity + buyPrice * quantity) /
                  (stock.quantity + quantity),
              }
            : stock
        )
      );
    } else {
      setPortfolio((prevPortfolio) => [
        ...prevPortfolio,
        { ...stockToAdd, quantity, buyPrice },
      ]);
    }
  };

  const editStockInPortfolio = (symbol, updatedStock) => {
    setPortfolio((prevPortfolio) =>
      prevPortfolio.map((stock) => (stock.symbol === symbol ? updatedStock : stock))
    );
  };

  const sellStockFromPortfolio = (symbol, quantity) => {
    setPortfolio((prevPortfolio) => {
      const stockToSell = prevPortfolio.find((stock) => stock.symbol === symbol);
      if (!stockToSell) return prevPortfolio;

      if (stockToSell.quantity <= quantity) {
        return prevPortfolio.filter((stock) => stock.symbol !== symbol);
      } else {
        return prevPortfolio.map((stock) =>
          stock.symbol === symbol ? { ...stock, quantity: stock.quantity - quantity } : stock
        );
      }
    });

    const soldStock = availableStocks.find((stock) => stock.symbol === symbol);
    if (soldStock) {
      updateWallet(soldStock.price * quantity);
    }
  };

  const addToWishlist = (stock) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.symbol === stock.symbol)) return prevWishlist;
      return [...prevWishlist, stock];
    });
  };

  const removeFromWishlist = (symbol) => {
    setWishlist((prevWishlist) => prevWishlist.filter((stock) => stock.symbol !== symbol));
  };

  const updateWallet = (amount) => {
    setWallet((prevWallet) => prevWallet + amount);
  };

  const addTransaction = (transaction) => {
    setHistory((prevHistory) => [...prevHistory, transaction]);
  };

  const fetchStockDetails = async (symbol) => {
    const details = {
      description: `Detailed info for ${symbol}`,
      history: [],
      keyPoints: "simulated key points",
    };
    setStockDetails((prev) => ({ ...prev, [symbol]: details }));
  };

  const fetchPeers = async (symbol) => {
    const peerList = ["Peer1", "Peer2"];
    setPeers((prev) => ({ ...prev, [symbol]: peerList }));
  };

  const fetchInvestors = async (symbol) => {
    const investorList = ["Investor1", "Investor2"];
    setInvestors((prev) => ({ ...prev, [symbol]: investorList }));
  };

  const fetchNseCompanies = async () => {
    const nseList = ["NSE1", "NSE2"];
    setNseCompanies(nseList);
  };

  const fetchBseCompanies = async () => {
    const bseList = ["BSE1", "BSE2"];
    setBseCompanies(bseList);
  };

  const calculateProfitLoss = () => {
    return portfolio.map((stock) => {
      const currentPrice = availableStocks.find((s) => s.symbol === stock.symbol)?.price || 0;
      const profitLoss = (currentPrice - stock.buyPrice) * stock.quantity;
      return { symbol: stock.symbol, profitLoss };
    });
  };

  const calculatePortfolioValue = () => {
    return portfolio.reduce((total, stock) => {
      const currentPrice = availableStocks.find((s) => s.symbol === stock.symbol)?.price || 0;
      return total + currentPrice * stock.quantity;
    }, 0);
  };

  const value = {
    userId,
    setUserId,
    name,
    setName,
    email,
    setEmail,
    availableStocks,
    wishlist,
    setWishlist,
    getWishlistStocks,
    wallet,
    updateWallet,
    portfolio,
    addStockToPortfolio,
    editStockInPortfolio,
    sellStockFromPortfolio,
    addToWishlist,
    removeFromWishlist,
    stockDetails,
    peers,
    investors,
    fetchStockDetails,
    fetchPeers,
    fetchInvestors,
    history,
    addTransaction,
    nseCompanies,
    bseCompanies,
    fetchNseCompanies,
    fetchBseCompanies,
    calculateProfitLoss,
    calculatePortfolioValue,
    news,
  };

  return (
    <StockDataContext.Provider value={value}>
      {children}
    </StockDataContext.Provider>
  );
};


export const useStockData = () => useContext(StockDataContext);
export default StockDataContext;
