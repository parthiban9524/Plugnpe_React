import React, { useContext, useEffect, useState } from "react";
import DataContext from "../api/context/DataContext";
import "../styles/Payment.css"; // Import the CSS file

function Payment() {
  const { pendingWithdraws, getPendingWithdraws, loading, error, approveWithdrawal } = useContext(DataContext);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    getPendingWithdraws(); // Fetch data when component mounts
  }, []);

  const handleApprove = async (transactionId) => {
    await approveWithdrawal(transactionId);
  };

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="payment-container">
      <h2 className="user-heading">Payment Details</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {pendingWithdraws?.length > 0 ? (
        <table className="payment-table">
          <thead>
            <tr>
              <th>Customer Id</th>
              <th>Customer Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingWithdraws.map((withdraw, index) => (
              <React.Fragment key={index}>
                <tr>
                <td>{withdraw.customerId}</td>
                  <td>{withdraw.customerDetail.firstName} {withdraw.customerDetail.lastName}</td>
                  <td>
                    <button className="get-details-button" onClick={() => toggleRow(index)}>
                      {expandedRows[index] ? "Hide Details" : "Get Details"}
                    </button>
                  </td>
                </tr>
                {expandedRows[index] && (
                  <tr className="details-row">
                    <td colSpan="3">
                      <table className="details-table">
                        <tbody>
                          <tr><td><strong>Mobile Number:</strong></td><td>{withdraw.customerDetail.mobileNumber}</td></tr>
                          <tr><td><strong>Email:</strong></td><td>{withdraw.customerDetail.email}</td></tr>
                          <tr><td><strong>Withdraw Amount:</strong></td><td>{withdraw.amount}</td></tr>
                          <tr><td><strong>Payment Mode:</strong></td><td>{withdraw.note}</td></tr>
                          <tr><td><strong>Account Holder Name:</strong></td><td>{withdraw.customerDetail.accountHolderName}</td></tr>
                          <tr><td><strong>Account Number:</strong></td><td>{withdraw.customerDetail.accountNumber}</td></tr>
                          <tr><td><strong>IFSC Code:</strong></td><td>{withdraw.customerDetail.ifscCode}</td></tr>
                          <tr><td><strong>UPI ID:</strong></td><td>{withdraw.customerDetail.upiid}</td></tr>
                          <tr><td><strong>Payment Status:</strong></td><td>{withdraw.status}</td></tr>
                        </tbody>
                      </table>
                      <div className="approveBtnBox">
                        <button className="approve-btn" onClick={() => handleApprove(withdraw.transactionId)}>
                          Approve
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
}

export default Payment;