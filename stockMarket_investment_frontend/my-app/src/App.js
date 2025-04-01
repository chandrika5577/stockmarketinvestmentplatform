import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StockDataProvider } from "./contexts/StockDataContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";

import Signin from "./components/Signin";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Portfolio from "./components/Portfolio";
import Holdings from "./components/Holdings";
import StockHolders from "./components/StockHolders";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Learn from "./components/Learn";
import Budget from "./components/Budget";
import Market from "./components/Market";
// import FunChatbot from "./components/FunChatbot";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <DarkModeProvider>
      <StockDataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
           

           
            <Route path="/home/*" element={<Home />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="learn" element={<Learn />} />
              <Route path="profile" element={<Profile />} />
              <Route path="budget" element={<Budget />} />
              <Route path="stocks" element={<StockHolders />} />
              <Route path="market" element={<Market/>}/>

             
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="portfolio/holdings" element={<Holdings />} />
            </Route>
          </Routes>
        
        </Router>
      </StockDataProvider>
    </DarkModeProvider>
  );
};

export default App;
