import React, { useContext, useState } from "react";
import { Link, Outlet ,useLocation,useNavigate} from "react-router-dom";
import "../styles/Home.css";
import { FaChartLine } from "react-icons/fa";
import StockDataContext from '../contexts/StockDataContext';
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import StockTicker from "./StockTicker";
import Profile from "./Profile.jsx";

const Home = () => {
  const { availableStocks } = useContext(StockDataContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const location=useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  
    
    const handleSearchChange = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      const results = availableStocks.filter((stock) =>
          stock.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
  };

 
  const handleStockSelect = (symbol) => {
      localStorage.setItem("selectedStock", symbol); 
      setSearchQuery(""); 
      setSearchResults([]); 
      navigate("/home/portfolio");
  };


  return (
    <div className="home-container">
     
      <nav className="home-navbar">
        <div className="navbar-logo">
          <FaChartLine />
          <span className="logo-text">StockWise</span>
        </div>
        <ul className="home-nav-links">
          <li><Link to="/home/dashboard">Dashboard</Link></li>
          <li><Link to="/home/market">Market</Link></li>
          <li><Link to="/home/portfolio">Portfolio</Link></li>
          <li><Link to="/home/budget">Budget</Link></li>
          <li><Link to="/home/learn">Learn</Link></li>
        </ul>
        <div className="profile">
  <CgProfile 
    className="profile-icon" 
    onClick={() => setIsSidebarOpen(true)} 
  />
</div>
      </nav>
      <Profile 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      {location.pathname==="/home" &&(
           <div className="ticker">
           <StockTicker/>
         </div>
      )}
     
      
      {location.pathname === "/home" && (
                <div className="center-home-search-container">
                    <h1>StockWise <FaChartLine  className="hlogo"/></h1>
                    <p>Find stock market insights instantly</p>
                    <div className="home-search-box">
                        <input
                            type="text"
                            placeholder="Search for a company"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                        <button><CiSearch /></button>
                    </div>
                    {searchQuery && searchResults.length > 0 && (
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
                </div>
            )}

      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default Home;
