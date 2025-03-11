import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdOutlineLocationOn,
  MdOutlinePayment,
  MdOutlineArticle,
  MdMenu,
  MdClose,
  MdOutlinePerson
} from "react-icons/md";
import Header from "./Header";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserSubMenuOpen, setIsUserSubMenuOpen] = useState(false); // Submenu state for User tab

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

  const toggleUserSubMenu = () => {
    setIsUserSubMenuOpen(!isUserSubMenuOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Menu Icon for Mobile & Tablet */}
      <button className="menu-toggle" onClick={toggleSidebar}>
        {!isSidebarOpen ? <MdMenu size={28} /> : <MdClose size={28} />}
      </button>

      {/* Sidebar */}
      <nav className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Admin Console</h2>
        <ul>
          <li>
            <Link
              to="adminDashboard"
              className={location.pathname.includes("adminDashboard") ? "active" : ""}
              onClick={closeSidebar}
            >
              <MdOutlineDashboard className="menu-icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="location"
              className={location.pathname.includes("location") ? "active" : ""}
              onClick={closeSidebar}
            >
              <MdOutlineLocationOn className="menu-icon" />
              <span>Location</span>
            </Link>
          </li>
            {/* ✅ User Tab with Submenu */}
            <li className="user-menu">
            <button className="user-menu-toggle" onClick={toggleUserSubMenu}>
              <MdOutlinePerson className="menu-icon" />
              <span>User</span>
            </button>
            {isUserSubMenuOpen && (
              <ul className="sub-menu">
                <li>
                  <Link
                    to="userDetails"
                    className={location.pathname.includes("userDetails") ? "active" : ""}
                    onClick={closeSidebar}
                  >
                    <span>Normal User</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="hostDetails"
                    className={location.pathname.includes("hostDetails") ? "active" : ""}
                    onClick={closeSidebar}
                  >
                    <span>Host</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="serviceProvider"
                    className={location.pathname.includes("serviceProvider") ? "active" : ""}
                    onClick={closeSidebar}
                  >
                    <span>24/7 Service Provider</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              to="payment"
              className={location.pathname.includes("payment") ? "active" : ""}
              onClick={closeSidebar}
            >
              <MdOutlinePayment className="menu-icon" />
              <span>Payment</span>
            </Link>
          </li>
          <li>
            <Link
              to="reports"
              className={location.pathname.includes("reports") ? "active" : ""}
              onClick={closeSidebar}
            >
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
