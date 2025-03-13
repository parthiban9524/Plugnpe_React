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

  // Filter users with userType === 1
  const filteredUsers = userDetails?.filter(user => user.userType === 1) || [];

  return (
    <div className="user-container">
      <h2 className="user-heading">24/7 Service Provider</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {filteredUsers.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Service Provider Id</th>
              <th>Shop Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((provider, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{provider.id}</td>
                  <td>{provider.shopName}</td>
                  <td>
                    <button className="get-userDetails-button" onClick={() => toggleRow(index)}>
                      {expandedRows[index] ? "Hide Details" : "Get Details"}
                    </button>
                  </td>
                </tr>
                {expandedRows[index] && (
                  <tr className="userDetails-row">
                    <td colSpan="3">
                      <table className="userDetails-table">
                        <tbody>
                          <tr><td><strong>Mobile Number:</strong></td><td>{provider.mobileNumber}</td></tr>
                          <tr><td><strong>Email:</strong></td><td>{provider.email}</td></tr>
                          <tr><td><strong>Shop Address</strong></td><td>{provider.shopAddress}</td></tr>
                          <tr><td><strong>Services Offered</strong></td><td>{provider.servicesOffered}</td></tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
};

export default UserDetails;
