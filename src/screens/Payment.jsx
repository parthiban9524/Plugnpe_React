import React, { useContext, useEffect,useState } from "react";
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
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {pendingWithdraws?.length > 0 ? (
        <div className="user-list">
          {pendingWithdraws.map((withdraw,index) => (
            <div key={index} className="user-item">
                <div className="user-header">
            <h3 className="user-name">{withdraw.customerDetail.firstName} {withdraw.customerDetail.lastName}</h3>
            <p className="user-address">{withdraw.customerDetail.email}</p>
            <button className="get-details-button" onClick={() => toggleRow(index)}>
                {expandedRows[index] ? "Hide Details" : "Get Details"}
              </button> 
          </div>


           

              {/* ✅ Expanded Details (Only show when button clicked) */}
              {expandedRows[index] && (
                <>
                <div className="user-details">
                  <div className="detail-box"><strong>Customer ID</strong><span>{withdraw.customerId}</span></div>
                  <div className="detail-box"><strong>Mobile Number</strong><span>{withdraw.customerDetail.mobileNumber}</span></div>
                  <div className="detail-box"><strong>Email</strong><span>{withdraw.customerDetail.email}</span></div>
                  <div className="detail-box"><strong>Withdraw Amount</strong><span>{withdraw.amount}</span></div>
                  <div className="detail-box"><strong>Payment Mode</strong><span>{withdraw.note}</span></div>
                  <div className="detail-box"><strong>Account Holder Name</strong><span>{withdraw.customerDetail.accountHolderName}</span></div>
                  <div className="detail-box"><strong>AccountNumber</strong><span>{withdraw.customerDetail.accountNumber}</span></div>
                  <div className="detail-box"><strong>IFSC Code</strong><span>{withdraw.customerDetail.ifscCode}</span></div>
                  <div className="detail-box"><strong>Upi Id</strong><span>{withdraw.customerDetail.upiid}</span></div>
                  <div className="detail-box"><strong>Payment Status</strong><span>{withdraw.status}</span></div>
                </div>
                <div className="approveBtnBox">
                         <button className="approve-btn" onClick={() => handleApprove(withdraw.transactionId)}>
                    Approve
              </button>
                </div>
                </>
                
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
}

export default Payment;
