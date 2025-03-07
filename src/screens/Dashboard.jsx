import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineLocationOn, MdOutlinePayment, MdOutlineTimeline, MdOutlineArticle } from "react-icons/md";
import Header from "./Header";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear(); 
    navigate("/");
  };

  return (
    <>
      <div className="dashboard-container">
        <nav className="sidebar">
          <h2>Admin Console</h2>
          <ul>
            <li>
              <Link to="adminDashboard">
                <MdOutlineDashboard className="menu-icon" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="location">
                <MdOutlineLocationOn className="menu-icon" />
                <span>Location</span>
              </Link>
            </li>
            <li>
              <Link to="payment">
                <MdOutlinePayment className="menu-icon" />
                <span>Payment</span>
              </Link>
            </li>
            <li>
              <Link to="reports">
                <MdOutlineArticle className="menu-icon" />
                <span>Reports</span>
              </Link>
            </li>
          </ul>
          <button className="LogOut" onClick={handleLogout}>
            LogOut
          </button>
        </nav>

        <main className="content">
          <Header />
          <div className="mainContent">
          <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
