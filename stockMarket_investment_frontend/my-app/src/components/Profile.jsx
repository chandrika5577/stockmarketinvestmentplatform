import React, { useState, useEffect } from "react";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = ({ isOpen, onClose }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Retrieve user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");  // Clear user data
    navigate("/signin");              // Redirect to signin
  };

  if (!isOpen) return null;

  return (
    <div className="profile-sidebar">
      <div className="profile-header">
        <div className="profile-image">
          <FaUser className="user-icon" />
        </div>
        <div className="profile-info">
          <h4>Hi, {user?.name || "User"}</h4>
          <p>{user?.email || "user@email.com"}</p>
        </div>
        <button className="close-sidebar" onClick={onClose}>
          <IoMdClose size={24} />
        </button>
      </div>
      <div className="profile-options">
        <button onClick={toggleDarkMode} className="profile-button">
          {darkMode ? <BsSunFill /> : <BsMoonStarsFill />}{" "}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button className="profile-button" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
