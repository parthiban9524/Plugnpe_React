import React, { useState } from "react";
import { Link, Outlet,useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserSubMenuOpen, setIsUserSubMenuOpen] = useState(false); // Submenu state for User tab
  const [isServiceUserSubMenuOpen, setIsServiceUserSubMenuOpen] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleUserSubMenu = () => {
    setIsUserSubMenuOpen(!isUserSubMenuOpen);
  };

  const toggleServiceUserSubMenu = () => {
    setIsServiceUserSubMenuOpen(!isServiceUserSubMenuOpen);
  };

  return (
    <div className="dashboard">
      <Header/>
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
              <span>User's Details</span>
            </button>
            {isUserSubMenuOpen && (
              <ul className="sub-menu">
                <li>
                  <Link
                    to="userDetails"
                    className={location.pathname.includes("userDetails") ? "active" : ""}
                    onClick={closeSidebar}
                  >
                     <MdOutlinePerson className="menu-icon" />
                    <span>Customers</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="hostDetails"
                    className={location.pathname.includes("hostDetails") ? "active" : ""}
                    onClick={closeSidebar}
                  >
                     <MdOutlinePerson className="menu-icon" />
                    <span>Host's</span>
                  </Link>
                </li>
                <li className="user-menu">
                <button className="user-menu-toggle" onClick={toggleServiceUserSubMenu}>
              <MdOutlinePerson className="menu-icon" />
              <span>24/7 Service</span>
            </button>
            {isServiceUserSubMenuOpen && (
              <ul className="sub-menu">
                <li>
                  <Link
                    to="userDetails"
                    className={location.pathname.includes("userDetails") ? "active" : ""}
                    onClick={closeSidebar}
                  >
                    <MdOutlinePerson className="menu-icon" />
                    <span>24/7 User's</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="serviceProvider"
                    className={location.pathname.includes("hostDetails") ? "active" : ""}
                    onClick={closeSidebar}
                  >
                    <MdOutlinePerson className="menu-icon" />
                    <span>24/7 Service Providers</span>
                  </Link>
                </li>
              </ul>
            )}

            
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
      </nav>

      {/* Main Content */}
      <main className="content">
        <div className="mainContent">
          <Outlet />
        </div>
      </main>
    </div>
    </div>
  );
};

export default Dashboard;
