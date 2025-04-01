import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signin-up.auth.css";
import { MdEmail } from "react-icons/md";
import { FaLock, FaChartLine } from "react-icons/fa";

import Alert from "react-bootstrap/Alert";
import { loginUser } from "../api";
import { StockDataContext } from "../contexts/StockDataContext";

const Signin = () => {
  const navigate = useNavigate();
  const { setUserId } = useContext(StockDataContext); 
  const {setName}=useContext(StockDataContext);
  const {setEmail}=useContext(StockDataContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !formData.password) {
      setAlert({ type: "danger", message: "Please fill in both fields." });
      setLoading(false);
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setAlert({ type: "warning", message: "Please enter a valid email address." });
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setAlert({ type: "warning", message: "Password must be at least 6 characters long." });
      setLoading(false);
      return;
    }
    
    try {
      const response = await loginUser(formData);
      console.log("User logged in successfully. Response:", response.data);
  
    
      localStorage.setItem("token", response.data.token);
  
      if (response.data.userId) {
          setUserId(response.data.userId);
          console.log("Login successful, User ID:", response.data.userId);
       if(response.data.name) {
        setName(response.data.name);
        
       }
       if(response.data.email) {
        setEmail(response.data.email);
       }
         
          localStorage.setItem("user", JSON.stringify({
              id: response.data.userId,  
              name: response.data.name || "Guest",  
              email: response.data.email || ""      
          }));
      }
  
      navigate("/home");
  
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setAlert({ type: "danger", message: error.response?.data?.message || "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
   
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="sign-up">
          <div className="sign-navbar-logo">
            <FaChartLine />
            <span className="logo-text">StockWise</span>
          </div>
          <h1 className="heading">Sign In</h1>
          {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="text">
              <MdEmail size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="text">
              <FaLock size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="terms">
              <input type="checkbox" id="rememberMe" />
              <p className="conditions">Remember Me</p>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
            <p className="conditions">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;