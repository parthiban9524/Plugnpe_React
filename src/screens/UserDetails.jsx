import React, { useContext, useEffect, useState } from "react";
import DataContext from "../api/context/DataContext";
import "../styles/User.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const UserDetails = () => {
  const { userDetails, getUserDetails, deleteCustomer, loading, error } =
    useContext(DataContext);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    getUserDetails(); // Fetch user details on mount
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      await deleteCustomer(id);
      getUserDetails(); // Refresh list after deletion
    }
  };

  return (
    <div className="user-container">
       <h2 className="user-heading">User's Details</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {userDetails?.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Customer Id</th>
              <th>Customer Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userDetails.map((user, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{user.id}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>
                    <button
                      className="get-userDetails-button"
                      onClick={() => toggleRow(index)}
                    >
                      {expandedRows[index] ? "Hide Details" : "Get Details"}
                    </button>
                  </td>
                </tr>
                {expandedRows[index] && (
                  <tr className="userDetails-row">
                    <td colSpan="3">
                      <table className="userDetails-table">
                        <tbody>
                          <tr>
                            <td>
                              <strong>Mobile Number:</strong>
                            </td>
                            <td>{user.mobileNumber}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Email:</strong>
                            </td>
                            <td>{user.email}</td>
                          </tr>
                        </tbody>
                      </table>
                            <div colSpan="2" className="button-container">
                              <button className="edit-button">Edit</button>
                              <button
                                className="delete-button"
                                onClick={() => handleDelete(user.id)}
                              >
                                Delete
                              </button>
                            </div>
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
