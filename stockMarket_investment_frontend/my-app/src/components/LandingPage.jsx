import React, { useState, useEffect } from "react";
import { useNavigate,Link ,Outlet,useLocation} from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FaChartLine, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/LandingPage.css";
import Profile from "./Profile";

import { CgProfile } from "react-icons/cg";

const messages = [
  " As long as you think wisely, opportunities are infinite --invest wisely, grow infinitely.",
  "StockWise empowers investors with real-time market insights, portfolio tracking, and smart investment tools.",
  "Whether you're a beginner or an expert, our platform helps you make informed financial decisions with ease.",
  "Start your journey towards financial growth today!",
];

const stocksData = [
  { 
    title: "Stock Market Basics", 
    image: "/graph1.jpeg", 
    description: "Learn how stock markets work." 
  },
  
  { title: "Types of Stocks", image: "/about2.jpeg", description: "Common vs Preferred stocks explained." },
  { title: "Stock Trading Strategies", image: "/graph3.jpeg", description: "Maximize profits with proven strategies." },
  { title: "Market Trends & Analysis", image: "/analystis.jpg", description: "Analyze trends to make informed decisions." },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

 
  const location=useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <FaChartLine />
            <span className="logo-text">StockWise</span>
          </div>
          <ul className="nav-links">
            <li><button onClick={() => scrollToSection("about-stocks")}>About Stocks</button></li>
            <li><button onClick={() => scrollToSection("about-us-footer")}>About Us</button></li>
            <li><button onClick={() => navigate("/signin")}>Sign In</button></li>
            
          </ul>
          <div className="profile">
            <CgProfile 
              className="profile-icon" 
              onClick={() => setIsSidebarOpen(true)} 
            />
          </div>
        </div>
      </nav>
      <Profile 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      

      <div className="content">
        <h2 className="dynamic-text">{messages[currentIndex]}</h2>
        <button className="get-started-btn" onClick={() => navigate("/signin")}>
          Get Started <BsArrowRight />
        </button>
      </div>

      <div className="about-stocks-section" id="about-stocks">
        <h2>About Stocks</h2>
        <div className="stocks-container">
          {stocksData.map((stock, index) => (
            <div className="stock-item" key={index}>
              <div className="stock-text">
                <h3>{stock.title}</h3>
                <p>{stock.description}</p>
              </div>
              <div className="stock-image-container">
                <img src={stock.image} alt={stock.title} className="stock-image" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer id="about-us-footer" className="about-us-footer">
        <div className="footer-container">
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>stockwise@gmail.com</p>
          </div>
          <div className="footer-bottom">
            <div className="social-icons">
              <FaFacebook className="icon" />
              <FaTwitter className="icon" />
              <FaInstagram className="icon" />
              <FaLinkedin className="icon" />
            </div>
            <div className="legal-links">
              <a href="/terms">Terms & Conditions</a>
              <a href="/privacy">Privacy Policy</a>
            </div>
            <p className="copyright">© 2025 StockWise. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
