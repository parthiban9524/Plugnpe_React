import React, { useContext, useEffect } from "react";
import DataContext from "../api/context/DataContext";
import "../styles/Payment.css"; // Import the CSS file

function Payment() {
  const { pendingWithdraws, getPendingWithdraws, loading, error, approveWithdrawal } = useContext(DataContext);

  useEffect(() => {
    getPendingWithdraws(); // Fetch data when component mounts
  }, []);

  const handleApprove = async (transactionId) => {
    await approveWithdrawal(transactionId);
  };

  return (
    <div className="payment-container">
      <h1>Pending Withdrawals</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      {pendingWithdraws.length > 0 ? (
        <div className="table-wrapper">
          <table className="payment-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Amount</th>
                <th>Payment Mode</th>
                <th>Account Holder</th>
                <th>Account Number</th>
                <th>IFSC Code</th>
                <th>UPI ID</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingWithdraws.map((withdraw, index) => (
                <tr key={index}>
                  <td>{withdraw.customerId || "-"}</td>
                  <td>{withdraw.amount || "-"}</td>
                  <td>{withdraw.note || "-"}</td>
                  <td>{withdraw.customerDetail.accountHolderName || "-"}</td>
                  <td>{withdraw.customerDetail.accountNumber || "-"}</td>
                  <td>{withdraw.customerDetail.ifscCode || "-"}</td>
                  <td>{withdraw.customerDetail.upiid || "-"}</td>
                  <td>{withdraw.status || "-"}</td>
                  <td>{withdraw.date ? new Date(withdraw.date).toLocaleDateString() : "-"}</td>
                  <td>
                    <button className="approve-btn" onClick={() => handleApprove(withdraw.transactionId)}>
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No pending withdrawals found.</p>
      )}
    </div>
  );
}

export default Payment;
