import React from 'react';
import logo from '../assets/Images/logo.png'; 
import "../styles/Header.css"

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
    </header>
  );
};

export default Header;
