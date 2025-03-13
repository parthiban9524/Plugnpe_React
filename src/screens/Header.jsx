import React from "react";
import logo from "../assets/Images/logo.png";
import logoutIcon from "../assets/Images/logout.png"; // Replace with your logout icon path
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <button className="LogOut" onClick={handleLogout}>
        <img src={logoutIcon} alt="Logout" className="logout-icon" />
      </button>
    </header>
  );
};

export default Header;
