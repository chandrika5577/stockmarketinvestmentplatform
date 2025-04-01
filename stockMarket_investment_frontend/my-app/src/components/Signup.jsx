import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signin-up.auth.css";

import { MdEmail } from "react-icons/md";
import { FaLock, FaUser, FaChartLine } from "react-icons/fa";
import Alert from "react-bootstrap/Alert";
import { registerUser } from "../api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setAlert({ type: "danger", message: "Please fill in all fields." });
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
    if (formData.password !== formData.confirmPassword) {
      setAlert({ type: "warning", message: "Passwords do not match!" });
      setLoading(false);
      return;
    }
    try {
      const response = await registerUser(formData); 
      console.log("Signup successful:", response.data);
  
      navigate("/signin"); 
  
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setAlert({ type: "danger", message: error.response?.data?.message || "Signup failed. Please try again." });
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="sign-up">
          <div className="navbar-logo">
            <FaChartLine />
            <span className="logo-text">StockWise</span>
          </div>
          <h1 className="heading">Register</h1>
          {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="text">
              <FaUser size={20} />
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="text">
              <MdEmail size={20} />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="text">
              <FaLock size={20} />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="text">
              <FaLock size={20} />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            </div>
            <button type="submit" disabled={loading}>{loading ? "Registering..." : "CREATE ACCOUNT"}</button>
            <p className="conditions">Already have an account? <Link to="/signin">Sign In</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
