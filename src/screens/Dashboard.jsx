import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineLocationOn, MdOutlinePayment, MdOutlineArticle, MdMenu, MdClose } from "react-icons/md";
import Header from "./Header";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* Menu Icon for Mobile & Tablet Only */}
      <button className="menu-toggle" onClick={toggleSidebar}>
        {!isSidebarOpen ? <MdMenu size={28} /> : <MdClose size={28} />}
      </button>

      {/* Sidebar */}
      <nav className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Admin Console</h2>
        <ul>
          <li>
            <Link to="adminDashboard" className={location.pathname.includes("adminDashboard") ? "active" : ""} onClick={closeSidebar}>
              <MdOutlineDashboard className="menu-icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="location" className={location.pathname.includes("location") ? "active" : ""} onClick={closeSidebar}>
              <MdOutlineLocationOn className="menu-icon" />
              <span>Location</span>
            </Link>
          </li>
          <li>
            <Link to="payment" className={location.pathname.includes("payment") ? "active" : ""} onClick={closeSidebar}>
              <MdOutlinePayment className="menu-icon" />
              <span>Payment</span>
            </Link>
          </li>
          <li>
            <Link to="reports" className={location.pathname.includes("reports") ? "active" : ""} onClick={closeSidebar}>
              <MdOutlineArticle className="menu-icon" />
              <span>Reports</span>
            </Link>
          </li>
        </ul>
        <button className="LogOut" onClick={handleLogout}>LogOut</button>
      </nav>

      {/* Main Content */}
      <main className="content">
        <Header />
        <div className="mainContent">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
