import { createContext, useState ,useEffect} from "react";

export const StockDataContext = createContext();

export const StockDataProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([]);
  
    const [availableStocks,setAvailableStocks]=useState([
        {
            symbol: "RELIANCE",
            name: "Reliance Industries",
            exchange: "NSE",
            sector: "Energy",
            price: 2470.75,
            change: -0.73,
            marketCap: "₹16.5L Cr",
            highLow: "2600/2400",
            peRatio: "30",
            bookValue: "1000",
            dividendYield: "1.0%",
            roce: "12%",
            roe: "10%",
            faceValue: "10",
            historicalData: [
              { date: "2023-01-01", price: 2450.00, peRatio: 29, volume: 1000000 },
              { date: "2023-01-02", price: 2470.00, peRatio: 30, volume: 1200000 },
              { date: "2023-01-03", price: 2465.00, peRatio: 29.5, volume: 1100000 },
              { date: "2023-01-04", price: 2480.00, peRatio: 30.5, volume: 1300000 },
              { date: "2023-01-05", price: 2475.00, peRatio: 30.2, volume: 1150000 },
              { date: "2023-01-06", price: 2490.00, peRatio: 31, volume: 1400000 },
              { date: "2023-01-07", price: 2485.00, peRatio: 30.8, volume: 1250000 },
              { date: "2023-01-08", price: 2500.00, peRatio: 31.5, volume: 1500000 },
              { date: "2023-01-09", price: 2495.00, peRatio: 31.2, volume: 1350000 },
              { date: "2023-01-10", price: 2510.00, peRatio: 32, volume: 1600000 },
            ],
          },
          {
            symbol: "TCS",
            name: "Tata Consultancy Services",
            exchange: "BSE",
            sector: "IT",
            price: 3512.35,
            change: 0.25,
            marketCap: "₹12.8L Cr",
            highLow: "3600/3400",
            peRatio: "35",
            bookValue: "800",
            dividendYield: "1.2%",
            roce: "15%",
            roe: "13%",
            faceValue: "1",
            historicalData: [
              { date: "2023-01-01", price: 3500.00, peRatio: 34, volume: 800000 },
              { date: "2023-01-02", price: 3510.00, peRatio: 35, volume: 900000 },
              { date: "2023-01-03", price: 3515.00, peRatio: 35.2, volume: 850000 },
              { date: "2023-01-04", price: 3525.00, peRatio: 35.5, volume: 950000 },
              { date: "2023-01-05", price: 3520.00, peRatio: 35.3, volume: 920000 },
              { date: "2023-01-06", price: 3530.00, peRatio: 36, volume: 1000000 },
              { date: "2023-01-07", price: 3528.00, peRatio: 35.9, volume: 980000 },
              { date: "2023-01-08", price: 3540.00, peRatio: 36.2, volume: 1050000 },
              { date: "2023-01-09", price: 3535.00, peRatio: 36.1, volume: 1020000 },
              { date: "2023-01-10", price: 3550.00, peRatio: 36.5, volume: 1100000 },
            ],
          },
          {
            symbol: "INFY",
            name: "Infosys",
            exchange: "NSE",
            sector: "IT",
            price: 1579.25,
            change: -0.65,
            marketCap: "₹6.6L Cr",
            highLow: "1650/1550",
            peRatio: "28",
            bookValue: "600",
            dividendYield: "1.1%",
            roce: "14%",
            roe: "12%",
            faceValue: "5",
            historicalData: [
              { date: "2023-01-01", price: 1580.00, peRatio: 27.5, volume: 600000 },
              { date: "2023-01-02", price: 1575.00, peRatio: 27, volume: 580000 },
              { date: "2023-01-03", price: 1582.00, peRatio: 28.1, volume: 620000 },
              { date: "2023-01-04", price: 1585.00, peRatio: 28.3, volume: 650000 },
              { date: "2023-01-05", price: 1581.00, peRatio: 28, volume: 630000 },
              { date: "2023-01-06", price: 1590.00, peRatio: 28.5, volume: 680000 },
              { date: "2023-01-07", price: 1588.00, peRatio: 28.4, volume: 670000 },
              { date: "2023-01-08", price: 1595.00, peRatio: 28.7, volume: 700000 },
              { date: "2023-01-09", price: 1592.00, peRatio: 28.6, volume: 690000 },
              { date: "2023-01-10", price: 1600.00, peRatio: 29, volume: 720000 },
            ],
          },
          {
            "symbol": "HDFCBANK",
            "name": "HDFC Bank",
            "exchange": "NSE",
            "sector": "Banking",
            "price": 1650.00,
            "change": 5.50,
            "marketCap": "₹12.0L Cr",
            "highLow": "1680/1600",
            "peRatio": "25",
            "bookValue": "650",
            "dividendYield": "0.8%",
            "roce": "18%",
            "roe": "16%",
            "faceValue": "1",
            "historicalData": [
              { "date": "2023-01-01", "price": 1630.00, "peRatio": 24, "volume": 1500000 },
              { "date": "2023-01-02", "price": 1640.00, "peRatio": 24.5, "volume": 1600000 },
              { "date": "2023-01-03", "price": 1635.00, "peRatio": 24.2, "volume": 1550000 },
              { "date": "2023-01-04", "price": 1650.00, "peRatio": 25, "volume": 1700000 },
              { "date": "2023-01-05", "price": 1645.00, "peRatio": 24.8, "volume": 1650000 },
              { "date": "2023-01-06", "price": 1660.00, "peRatio": 25.5, "volume": 1800000 },
              { "date": "2023-01-07", "price": 1655.00, "peRatio": 25.2, "volume": 1750000 },
              { "date": "2023-01-08", "price": 1670.00, "peRatio": 26, "volume": 1900000 },
              { "date": "2023-01-09", "price": 1665.00, "peRatio": 25.8, "volume": 1850000 },
              { "date": "2023-01-10", "price": 1680.00, "peRatio": 26.5, "volume": 2000000 }
            ]
          },
          {
            "symbol": "ICICIBANK",
            "name": "ICICI Bank",
            "exchange": "NSE",
            "sector": "Banking",
            "price": 950.00,
            "change": 3.00,
            "marketCap": "₹6.6L Cr",
            "highLow": "970/930",
            "peRatio": "22",
            "bookValue": "400",
            "dividendYield": "0.5%",
            "roce": "16%",
            "roe": "14%",
            "faceValue": "2",
            "historicalData": [
              { "date": "2023-01-01", "price": 935.00, "peRatio": 21, "volume": 1800000 },
              { "date": "2023-01-02", "price": 940.00, "peRatio": 21.5, "volume": 1900000 },
              { "date": "2023-01-03", "price": 938.00, "peRatio": 21.3, "volume": 1850000 },
              { "date": "2023-01-04", "price": 950.00, "peRatio": 22, "volume": 2000000 },
              { "date": "2023-01-05", "price": 948.00, "peRatio": 21.8, "volume": 1950000 },
              { "date": "2023-01-06", "price": 960.00, "peRatio": 22.5, "volume": 2100000 },
              { "date": "2023-01-07", "price": 958.00, "peRatio": 22.3, "volume": 2050000 },
              { "date": "2023-01-08", "price": 970.00, "peRatio": 23, "volume": 2200000 },
              { "date": "2023-01-09", "price": 968.00, "peRatio": 22.8, "volume": 2150000 },
              { "date": "2023-01-10", "price": 980.00, "peRatio": 23.5, "volume": 2300000 }
            ]
          },
          {
            "symbol": "SBIN",
            "name": "State Bank of India (SBI)",
            "exchange": "NSE",
            "sector": "Banking",
            "price": 580.50,
            "change": -1.50,
            "marketCap": "₹5.2L Cr",
            "highLow": "600/560",
            "peRatio": "18",
            "bookValue": "350",
            "dividendYield": "1.8%",
            "roce": "14%",
            "roe": "12%",
            "faceValue": "1",
            "historicalData": [
              { "date": "2023-01-01", "price": 570.00, "peRatio": 17, "volume": 2000000 },
              { "date": "2023-01-02", "price": 575.00, "peRatio": 17.5, "volume": 2100000 },
              { "date": "2023-01-03", "price": 573.00, "peRatio": 17.3, "volume": 2050000 },
              { "date": "2023-01-04", "price": 580.00, "peRatio": 18, "volume": 2200000 },
              { "date": "2023-01-05", "price": 578.00, "peRatio": 17.8, "volume": 2150000 },
              { "date": "2023-01-06", "price": 590.00, "peRatio": 18.5, "volume": 2300000 },
              { "date": "2023-01-07", "price": 588.00, "peRatio": 18.3, "volume": 2250000 },
              { "date": "2023-01-08", "price": 600.00, "peRatio": 19, "volume": 2400000 },
              { "date": "2023-01-09", "price": 598.00, "peRatio": 18.8, "volume": 2350000 },
              { "date": "2023-01-10", "price": 610.00, "peRatio": 19.5, "volume": 2500000 }
            ]
          }, {
            "symbol": "BHARTIARTL",
            "name": "Bharti Airtel",
            "exchange": "NSE",
            "sector": "Telecommunications",
            "price": 750.00,
            "change": 4.00,
            "marketCap": "₹4.5L Cr",
            "highLow": "760/720",
            "peRatio": "40",
            "bookValue": "200",
            "dividendYield": "0.3%",
            "roce": "10%",
            "roe": "8%",
            "faceValue": "5",
            "historicalData": [
              { "date": "2023-01-01", "price": 735.00, "peRatio": 39, "volume": 1600000 },
              { "date": "2023-01-02", "price": 740.00, "peRatio": 39.5, "volume": 1700000 },
              { "date": "2023-01-03", "price": 738.00, "peRatio": 39.3, "volume": 1650000 },
              { "date": "2023-01-04", "price": 750.00, "peRatio": 40, "volume": 1800000 },
              { "date": "2023-01-05", "price": 748.00, "peRatio": 39.8, "volume": 1750000 },
              { "date": "2023-01-06", "price": 760.00, "peRatio": 40.5, "volume": 1900000 },
              { "date": "2023-01-07", "price": 758.00, "peRatio": 40.3, "volume": 1850000 },
              { "date": "2023-01-08", "price": 770.00, "peRatio": 41, "volume": 2000000 },
              { "date": "2023-01-09", "price": 768.00, "peRatio": 40.8, "volume": 1950000 },
              { "date": "2023-01-10", "price": 780.00, "peRatio": 41.5, "volume": 2100000 }
            ]
          },
          {
            "symbol": "L&T",
            "name": "Larsen & Toubro (L&T)",
            "exchange": "NSE",
            "sector": "Construction",
            "price": 2500.00,
            "change": -5.00,
            "marketCap": "₹3.5L Cr",
            "highLow": "2550/2450",
            "peRatio": "26",
            "bookValue": "900",
            "dividendYield": "1.1%",
            "roce": "15%",
            "roe": "13%",
            "faceValue": "2",
            "historicalData": [
              { "date": "2023-01-01", "price": 2480.00, "peRatio": 25, "volume": 900000 },
              { "date": "2023-01-02", "price": 2490.00, "peRatio": 25.5, "volume": 1000000 },
              { "date": "2023-01-03", "price": 2485.00, "peRatio": 25.2, "volume": 950000 },
              { "date": "2023-01-04", "price": 2500.00, "peRatio": 26, "volume": 1100000 },
              { "date": "2023-01-05", "price": 2495.00, "peRatio": 25.8, "volume": 1050000 },
              { "date": "2023-01-06", "price": 2510.00, "peRatio": 26.5, "volume": 1200000 },
              { "date": "2023-01-07", "price": 2505.00, "peRatio": 26.2, "volume": 1150000 },
              { "date": "2023-01-08", "price": 2520.00, "peRatio": 27, "volume": 1300000 },
              { "date": "2023-01-09", "price": 2515.00, "peRatio": 26.8, "volume": 1250000 },
              { "date": "2023-01-10", "price": 2530.00, "peRatio": 27.5, "volume": 1400000 }
            ]
          },
          {
            "symbol": "ITC",
            "name": "ITC",
            "exchange": "NSE",
            "sector": "Consumer Goods",
            "price": 450.00,
            "change": 2.50,
            "marketCap": "₹5.6L Cr",
            "highLow": "460/430",
            "peRatio": "28",
            "bookValue": "150",
            "dividendYield": "3.5%",
            "roce": "25%",
            "roe": "23%",
            "faceValue": "1",
            "historicalData": [
              { "date": "2023-01-01", "price": 440.00, "peRatio": 27, "volume": 2500000 },
              { "date": "2023-01-02", "price": 445.00, "peRatio": 27.5, "volume": 2600000 },
              { "date": "2023-01-03", "price": 443.00, "peRatio": 27.3, "volume": 2550000 },
              { "date": "2023-01-04", "price": 450.00, "peRatio": 28, "volume": 2700000 },
              { "date": "2023-01-05", "price": 448.00, "peRatio": 27.8, "volume": 2650000 },
              { "date": "2023-01-06", "price": 460.00, "peRatio": 28.5, "volume": 2800000 },
              { "date": "2023-01-07", "price": 458.00, "peRatio": 28.3, "volume": 2750000 },
              { "date": "2023-01-08", "price": 470.00, "peRatio": 29, "volume": 2900000 },
              { "date": "2023-01-09", "price": 468.00, "peRatio": 28.8, "volume": 2850000 },
              { "date": "2023-01-10", "price": 480.00, "peRatio": 29.5, "volume": 3000000 }
            ]
          },
          {
            "symbol": "HINDUNILVR",
            "name": "Hindustan Unilever (HUL)",
            "exchange": "NSE",
            "sector": "Consumer Goods",
            "price": 2600.00,
            "change": -8.00,
            "marketCap": "₹6.1L Cr",
            "highLow": "2650/2550",
            "peRatio": "60",
            "bookValue": "400",
            "dividendYield": "1.0%",
            "roce": "28%",
            "roe": "25%",
            "faceValue": "1",
            "historicalData": [
              { "date": "2023-01-01", "price": 2580.00, "peRatio": 59, "volume": 700000 },
              { "date": "2023-01-02", "price": 2590.00, "peRatio": 59.5, "volume": 800000 },
              { "date": "2023-01-03", "price": 2585.00, "peRatio": 59.2, "volume": 750000 },
              { "date": "2023-01-04", "price": 2600.00, "peRatio": 60, "volume": 900000 },
              { "date": "2023-01-05", "price": 2595.00, "peRatio": 59.8, "volume": 850000 },
              { "date": "2023-01-06", "price": 2610.00, "peRatio": 60.5, "volume": 1000000 },
              { "date": "2023-01-07", "price": 2605.00, "peRatio": 60.2, "volume": 950000 },
              { "date": "2023-01-08", "price": 2620.00, "peRatio": 61, "volume": 1100000 },
              { "date": "2023-01-09", "price": 2615.00, "peRatio": 60.8, "volume": 1050000 },
              { "date": "2023-01-10", "price": 2630.00, "peRatio": 61.5, "volume": 1200000 }
            ]
          },
          {
            "symbol": "AXISBANK",
            "name": "Axis Bank",
            "exchange": "NSE",
            "sector": "Banking",
            "price": 850.00,
            "change": 6.00,
            "marketCap": "₹2.6L Cr",
            "highLow": "860/820",
            "peRatio": "20",
            "bookValue": "420",
            "dividendYield": "0.4%",
            "roce": "15%",
            "roe": "13%",
            "faceValue": "2",
            "historicalData": [
              { "date": "2023-01-01", "price": 835.00, "peRatio": 19, "volume": 1900000 },
              { "date": "2023-01-02", "price": 840.00, "peRatio": 19.5, "volume": 2000000 },
              { "date": "2023-01-03", "price": 838.00, "peRatio": 19.3, "volume": 1950000 },
              { "date": "2023-01-04", "price": 850.00, "peRatio": 20, "volume": 2100000 },
              { "date": "2023-01-05", "price": 848.00, "peRatio": 19.8, "volume": 2050000 },
              { "date": "2023-01-06", "price": 860.00, "peRatio": 20.5, "volume": 2200000 },
              { "date": "2023-01-07", "price": 858.00, "peRatio": 20.3, "volume": 2150000 },
              { "date": "2023-01-08", "price": 870.00, "peRatio": 21, "volume": 2300000 },
              { "date": "2023-01-09", "price": 868.00, "peRatio": 20.8, "volume": 2250000 },
              { "date": "2023-01-10", "price": 880.00, "peRatio": 21.5, "volume": 2400000 }
            ]
          },
          {
            "symbol": "KOTAKBANK",
            "name": "Kotak Mahindra Bank",
            "exchange": "NSE",
            "sector": "Banking",
            "price": 1800.00,
            "change": -4.00,
            "marketCap": "₹3.6L Cr",
            "highLow": "1830/1770",
            "peRatio": "32",
            "bookValue": "550",
            "dividendYield": "0.2%",
            "roce": "17%",
            "roe": "15%",
            "faceValue": "5",
            "historicalData": [
              { "date": "2023-01-01", "price": 1780.00, "peRatio": 31, "volume": 1200000 },
              { "date": "2023-01-02", "price": 1790.00, "peRatio": 31.5, "volume": 1300000 },
              { "date": "2023-01-03", "price": 1785.00, "peRatio": 31.2, "volume": 1250000 },
              { "date": "2023-01-04", "price": 1800.00, "peRatio": 32, "volume": 1400000 },
              { "date": "2023-01-05", "price": 1798.00, "peRatio": 31.8, "volume": 1350000 },
              { "date": "2023-01-06", "price": 1810.00, "peRatio": 32.5, "volume": 1500000 },
              { "date": "2023-01-07", "price": 1808.00, "peRatio": 32.3, "volume": 1450000 },
              { "date": "2023-01-08", "price": 1820.00, "peRatio": 33, "volume": 1600000 },
              { "date": "2023-01-09", "price": 1818.00, "peRatio": 32.8, "volume": 1550000 },
              { "date": "2023-01-10", "price": 1830.00, "peRatio": 33.5, "volume": 1700000 }
            ]
          },
        
    ]) 
  const [userId, setUserId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [wallet, setWallet] = useState(100000);
  const [stockDetails, setStockDetails] = useState({});
  const [peers, setPeers] = useState({});
  const [investors, setInvestors] = useState({});
  const [history, setHistory] = useState([]);
  const [nseCompanies, setNseCompanies] = useState([]);
  const [bseCompanies, setBseCompanies] = useState([]);
  const [name,setName]=useState([]);
  const [email,setEmail]=useState([]);


  const news = [
    { title: "Market rallies today", source: "Economic Times" },
    { title: "Reliance shares hit new high", source: "MoneyControl" },
  ];

  useEffect(() => {
     
      const interval = setInterval(() => {
          setAvailableStocks((prevStocks) =>
              prevStocks.map((stock) => {
                  const randomChange = (Math.random() - 0.5) * 2; // -1 to 1
                  const newPrice = stock.price + randomChange * 10;
                  return { ...stock, price: newPrice, change: randomChange };
              })
          );
      }, 5000);

      return () => clearInterval(interval);
  }, []);


 


// Update user function
useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
        setUserId(storedUser.id);
        setName(storedUser.name); 
        setEmail(storedUser.email); 
        console.log("User loaded from localStorage:", storedUser);
    } else {
        console.error("No user found in localStorage!");
    }
}, []);

  // stock price updates every 5 seconds
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

  // Fetch stock details
 


 
//for dashboard stocks
const getWishlistStocks = () => {
    return wishlist ? wishlist : [];  
};





  const addStockToPortfolio = (stockToAdd, quantity, buyPrice) => {
      const existingStock = portfolio.find((stock) => stock.symbol === stockToAdd.symbol);
      if (existingStock) {
          setPortfolio((prevPortfolio) =>
              prevPortfolio.map((stock) =>
                  stock.symbol === stockToAdd.symbol
                      ? { ...stock, quantity: stock.quantity + quantity, buyPrice: (stock.buyPrice * stock.quantity + buyPrice * quantity) / (stock.quantity + quantity) }
                      : stock
              )
          );
      } else {
          setPortfolio((prevPortfolio) => [...prevPortfolio, { ...stockToAdd, quantity, buyPrice }]);
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
      const soldStock = availableStocks.find((stock)=> stock.symbol === symbol);
      if(soldStock){
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

  const fetchStockDetails = async (symbol) => {
      const details = { description: `Detailed info for ${symbol}`, history: [], keyPoints: "simulated key points" };
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

  const calculateProfitLoss = () => {
      const profitLossData = portfolio.map((stock) => {
          const currentPrice = availableStocks.find((s) => s.symbol === stock.symbol)?.price || 0;
          const profitLoss = (currentPrice - stock.buyPrice) * stock.quantity;
          return { symbol: stock.symbol, profitLoss };
      });
      return profitLossData;
  };

  const addTransaction = (transaction) => {
      setHistory((prevHistory) => [...prevHistory, transaction]);
  };

  const fetchNseCompanies = async () => {
      const nseList = ["NSE1", "NSE2"];
      setNseCompanies(nseList);
  };

  const fetchBseCompanies = async () => {
      const bseList = ["BSE1", "BSE2"];
      setBseCompanies(bseList);
  };

  const calculatePortfolioValue = () => {
      return portfolio.reduce((total, stock) => {
          const currentPrice = availableStocks.find((s) => s.symbol === stock.symbol)?.price || 0;
          return total + currentPrice * stock.quantity;
      }, 0);
  };

  const value = {
      portfolio,
     news,
      availableStocks,
      wishlist,
      setWishlist,
      getWishlistStocks,
      wallet,
      name,
      setName,
      email,
      setEmail,
      userId,
      setUserId,
      stockDetails,
      peers,
      investors,
      history,
      nseCompanies,
      bseCompanies,
      addStockToPortfolio,
      editStockInPortfolio,
      sellStockFromPortfolio,
      addToWishlist,
      removeFromWishlist,
      updateWallet,
      fetchStockDetails,
      fetchPeers,
      fetchInvestors,
      calculateProfitLoss,
      addTransaction,
      fetchNseCompanies,
      fetchBseCompanies,
      calculatePortfolioValue,
  };

  return (
      <StockDataContext.Provider value={value}>{children}</StockDataContext.Provider>
  );
};
export default StockDataContext