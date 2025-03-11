import React, { useEffect, useContext } from "react";
import DataContext from "../api/context/DataContext";
import "../styles/HostDetails.css";

const HostDetails = () => {
  const { token, chargingStations, getChargingStations, loading, error } =
    useContext(DataContext);

  useEffect(() => {
    if (token && !chargingStations) {
      getChargingStations();
    }
  }, [token]);

  if (loading) return <p className="loading">Loading charging station details...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!chargingStations || chargingStations.length === 0)
    return <p className="no-data">No charging station data available.</p>;

  const validStations = chargingStations.filter(station => station.stationName?.trim());

  if (validStations.length === 0)
    return <p className="no-data">No stations available.</p>;

  return (
    <div className="host-details-container">
      {validStations.map((station, index) => (
        <div key={index} className="station-card">
          {/* Header Section with Name & Address */}
          <div className="station-header">
            <h3 className="station-name">{station.stationName}</h3>
            <p className="station-address">{station.address}, {station.city}, {station.state}, {station.country} - {station.pinCode}</p>
          </div>

          {/* Station Details */}
          <div className="station-details">
            <div className="detail-box">
              <strong>Customer ID</strong>
              <span>{station.customerId}</span>
            </div>
            <div className="detail-box">
              <strong>Vehicle Support</strong>
              <span>{station.vehicleSupport}</span>
            </div>
            <div className="detail-box">
              <strong>Charger Type</strong>
              <span>{station.chargerTypeSupport}</span>
            </div>
            <div className="detail-box">
              <strong>Connector Type</strong>
              <span>{station.connectorType}</span>
            </div>
            <div className="detail-box">
              <strong>Power Rating</strong>
              <span>{station.powerRating}</span>
            </div>
            <div className="detail-box">
              <strong>Usage Type</strong>
              <span>{station.usageType}</span>
            </div>
            <div className="detail-box">
              <strong>Availability</strong>
              <span>{station.availability}</span>
            </div>
            <div className="detail-box">
              <strong>Cost per Unit</strong>
              <span>₹{station.cost} / KWh</span>
            </div>
            <div className="detail-box">
              <strong>Vendor</strong>
              <span>{station.vendorName}</span>
            </div>
            <div className="detail-box">
              <strong>Last Used</strong>
              <span>{station.lastUsed}</span>
            </div>
            <div className="detail-box">
              <strong>Charging Status</strong>
              <span>{station.currentChargingStatus}</span>
            </div>
            <div className="detail-box">
              <strong>Contact</strong>
              <span>{station.holderPhone}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HostDetails;
