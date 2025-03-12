import React, { useContext, useEffect, useState } from "react";
import DataContext from "../api/context/DataContext";
import "../styles/User.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons

const UserDetails = () => {
  const { userDetails, getUserDetails, loading, error } = useContext(DataContext);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    getUserDetails(); // Fetch user details on mount
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {userDetails?.length > 0 ? (
        <div className="user-list">
          {userDetails.map((user,index) => (
            <div key={index} className="user-item">
                <div className="user-header">
            <h3 className="user-name">{user.firstName} {user.lastName}</h3>
            <p className="user-address">{user.email}</p>
            <button className="get-details-button" onClick={() => toggleRow(index)}>
                {expandedRows[index] ? "Hide Details" : "Get Details"}
              </button>
          
          </div>


           

              {/* ✅ Expanded Details (Only show when button clicked) */}
              {expandedRows[index] && (
                <div className="user-details">
                  <div className="detail-box"><strong>Customer ID</strong><span>{user.id}</span></div>
                  <div className="detail-box"><strong>MobileNumber</strong><span>{user.mobileNumber}</span></div>
                  <div className="detail-box"><strong>Email</strong><span>{user.email}</span></div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
};

export default UserDetails;
