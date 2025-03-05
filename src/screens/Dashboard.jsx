import React from "react";
import { Link, Outlet,useNavigate } from "react-router-dom";
import Header from "./Header";

const Dashboard = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear(); 
    navigate("/");
  };
  return (
    <>
      <Header />
      <div className="dashboard-container">
        <nav className="sidebar">
          <h2>Menu</h2>
          <ul>
            <li><Link to="host">Host Details</Link></li>
            <li><Link to="wallet">Wallet</Link></li>
            <li><Link to="request">Request</Link></li>
            <li><Link to="about">About Us</Link></li>
          </ul>
          <button className="LogOut" onClick={handleLogout}>
            LogOut
          </button>
        </nav>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
