import React, { useEffect, useContext, useState } from "react";
import DataContext from "../api/context/DataContext";
import "../styles/HostDetails.css";
import { useNavigate } from "react-router-dom";

const HostDetails = () => {
  const { chargingStations, getChargingStations, loading, error, deleteHost } =
    useContext(DataContext);
  const [expandedStations, setExpandedStations] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getChargingStations();
  }, []);

  if (loading)
    return <p className="loading">Loading charging station details...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!chargingStations || chargingStations.length === 0)
    return <p className="no-data">No charging station data available.</p>;

  const validStations = chargingStations.filter((station) =>
    station.stationName?.trim()
  );

  if (validStations.length === 0)
    return <p className="no-data">No stations available.</p>;

  const toggleDetails = (index) => {
    setExpandedStations((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Host?"
    );
    if (confirmDelete) {
      await deleteHost(id);
      getChargingStations(); // Refresh list after deletion
    }
  };

  const handleNewStation = async () => {
    navigate("/dashboard/chargingStation");
  };

  return (
    <div className="host-details-container">
      <div className="headerCon">
        <h2 className="host-heading">Host's Details</h2>
        <button
          className="get-details-button"
          onClick={() => handleNewStation()}
        >
          Add New Station
        </button>
      </div>
      {validStations.map((station, index) => (
        <div key={index} className="station-card">
          {/* Header Section with Name & Address */}
          <div className="station-header">
            <h3 className="station-name">{station.stationName}</h3>
            <p className="station-address">
              {station.address}, {station.city}, {station.state},{" "}
              {station.country} - {station.pinCode}
            </p>
            <button
              className="get-details-button"
              onClick={() => toggleDetails(index)}
            >
              {expandedStations[index] ? "Hide Details" : "Get Details"}
            </button>
          </div>

          {/* Station Details - Show only when button is clicked */}
          {expandedStations[index] && (
            <>
              <div className="station-details">
                <div className="detail-box">
                  <strong>Host ID</strong>
                  <span>{station.customerId}</span>
                </div>
                <div className="detail-box">
                  <strong>Device ID</strong>
                  <span>{station.deviceId}</span>
                </div>
                <div className="detail-box">
                  {" "}
                  <strong>Device Status</strong>
                  <span>
                    {station.mqttDeviceStatus === "U"
                      ? "Offline"
                      : station.mqttDeviceStatus === "A"
                      ? "Available"
                      : "Charging"}
                  </span>
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
                  <strong>Cost Type</strong>
                  <span>{station.costType}</span>
                </div>
                <div className="detail-box">
                  <strong>Cost per Unit</strong>
                  <span>₹{station.cost} / KWh</span>
                </div>
                <div className="detail-box">
                  <strong>Vendor Name</strong>
                  <span>{station.vendorName}</span>
                </div>
                <div className="detail-box">
                  <strong>Vendor DeviceId</strong>
                  <span>{station.vendorDeviceId}</span>
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
              <div colSpan="2" className="button-container">
                <button className="edit-button">Edit</button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(station.id)}
                  disabled={true}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default HostDetails;
