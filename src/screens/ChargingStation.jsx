import React, { useState, useContext } from "react";
import DataContext from "../api/context/DataContext";
import "../styles/ChargingStation.css";
import { useNavigate } from "react-router-dom";

const ChargingStation = () => {
  const navigate = useNavigate();

  const amenitiesList = [
    { id: 1, name: "Cafe" },
    { id: 2, name: "Hotel" },
    { id: 3, name: "Parking" },
    { id: 4, name: "Restaurant" },
    { id: 5, name: "Shopping Mall" },
    { id: 6, name: "Institution" },
    { id: 7, name: "Govt." },
    { id: 8, name: "Theatre" },
  ];

  const [showAmenities, setShowAmenities] = useState(false);

  const { chargingStations, addChargingStation } = useContext(DataContext);
  const [deviceId, setDeviceId] = useState("");
  const [existingStation, setExistingStation] = useState(null);
  const [step, setStep] = useState(1);
  const [connectivity, setConnectivity] = useState("");
  const [formData, setFormData] = useState({
    customerId: "",
    stationName: "",
    deviceName: "",
    amenitiesAvailable: [],
    address: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pinCode: "",
    landmark: "",
    latitude: "",
    longitude: "",
    holderName: "",
    holderMobile: "",
    holderEmail: "",
    vehicleSupport: [],
    chargerTypeSupport: "",
    connectorType: "",
    powerRating: "",
    usageType: "",
    deviceSequence: 0,
    wifiUsername: "",
    wifipassword: "",
    availability: "",
    costType: "",
    cost: 0,
    minCharge: 0,
  });

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked
        ? [...(Array.isArray(prevState[name]) ? prevState[name] : []), value]
        : prevState[name].filter((item) => item !== value),
    }));
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// Handle Amenity Selection
const handleAmenityChange = (amenityId) => {
  setFormData((prevData) => {
    const isSelected = prevData.amenitiesAvailable.includes(amenityId);
    return {
      ...prevData,
      amenitiesAvailable: isSelected
        ? prevData.amenitiesAvailable.filter((id) => id !== amenityId) // Remove if already selected
        : [...prevData.amenitiesAvailable, amenityId], // Add if not selected
    };
  });
};

  const handleConnectivityChange = (type) => {
    setConnectivity(type);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeviceIdSubmit = () => {
    const deviceIdPattern = /^PLUGNPE_\d{5}$/;

    if (!deviceIdPattern.test(deviceId)) {
      alert(
        "Check your Device ID format. It should be in the format 'PLUGNPE_00001'."
      );
      setDeviceId("");
      return;
    }

    // Check if the device ID exists in the charging stations
    const station = chargingStations.find(
      (station) => station.deviceId === deviceId
    );

    if (station) {
      if (station.stationName) {
        alert("This Device ID is already associated with a station.");
        setDeviceId("");
        navigate("/dashboard/hostDetails");
        return;
      }
      console.log("Existing Station", station);
      setExistingStation(station); // Store the existing station in state
    } else {
      setExistingStation(null);
    }

    // If Device ID is valid and either not found or found without a station name, move to step 2
    setStep(2);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addChargingStation(
        existingStation,
        formData,
        deviceId,
        connectivity
      );
      alert("Charging Station added successfully!");

      // Reset form state
      setStep(1);
      setDeviceId("");
      setConnectivity("");
      setExistingStation(null);
      navigate("/dashboard/hostDetails");
    } catch (error) {
      console.error("Error adding charging station:", error);
      alert("Failed to add charging station.");
      navigate("/dashboard/hostDetails");
    }
  };

  return (
    <>
      <div className="headerCon">
        <h2 className="station-heading">Add New Station</h2>
      </div>

      {step === 1 && (
        <div className="charging-form">
          <h3 className="heading">Enter PlugnPe Device ID</h3>
          <input
            type="text"
            className="device-input"
            placeholder="Device ID"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            required
          />
          <button className="save-button" onClick={handleDeviceIdSubmit}>
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="charging-form">
          <h3 className="heading">New Charging Device Found</h3>
          <div className="detail-box">
            <strong>PlugnPe Device ID:</strong> <span>{deviceId}</span>
          </div>
          <div className="radio-group">
            {["LTE", "Wifi", "BLE"].map((type) => (
              <label key={type} className="radio-label">
                <input
                  type="radio"
                  name="connectivity"
                  value={type}
                  checked={connectivity === type}
                  onChange={() => handleConnectivityChange(type)}
                />
                {type}
              </label>
            ))}
          </div>
          {connectivity === "Wifi" && (
            <div className="wifi-details">
              <input
                type="text"
                className="input-field"
                placeholder="WiFi Name"
                name="wifiUsername"
                value={formData.wifiUsername}
                onChange={handleChange}
              />
              <input
                type="password"
                className="input-field"
                placeholder="WiFi Password"
                name="wifipassword"
                value={formData.wifipassword}
                onChange={handleChange}
              />
            </div>
          )}
          <button
            className="save-button"
            onClick={() => setStep(3)}
            disabled={connectivity === "BLE"}
          >
            Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <form className="charging-form">
          <h3 className="heading">Station Details</h3>
          <input
            type="number"
            placeholder="Customer ID"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Station Name"
            name="stationName"
            value={formData.stationName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Device Name"
            name="deviceName"
            value={formData.deviceName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Station Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <div className="row-container">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row-container">
            <input
              type="text"
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Pincode"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            required
          />

          <h3 className="heading">Host Holder Details</h3>
          <input
            type="text"
            placeholder="Holder Name"
            name="holderName"
            value={formData.holderName}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            placeholder="Holder Mobile Number"
            name="holderMobile"
            value={formData.holderMobile}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Holder Email ID"
            name="holderEmail"
            value={formData.holderEmail}
            onChange={handleChange}
            required
          />

          <h3 className="heading">Charging Usage Details</h3>
          <div className="checkbox-group">
            <label className="label">Vehicle Support:</label>
            {["Bike", "Auto", "Car"].map((type) => (
              <label key={type} className="checkbox-label">
                <input
                  type="checkbox"
                  name="vehicleSupport"
                  value={type}
                  checked={formData.vehicleSupport.includes(type)}
                  onChange={handleCheckboxChange}
                />
                {type}
              </label>
            ))}
          </div>

          <div className="checkbox-group">
            <label className="label">Charger Type Support:</label>
            {["Level 1", "Level 2"].map((type) => (
              <label key={type} className="checkbox-label">
                <input
                  type="radio"
                  name="chargerTypeSupport"
                  value={type}
                  checked={formData.chargerTypeSupport === type}
                  onChange={handleRadioChange}
                />

                {type}
              </label>
            ))}
          </div>

          <div className="checkbox-group">
            <label className="label">Connector Type:</label>
            {["India", "Us", "Uk"].map((type) => (
              <label key={type} className="checkbox-label">
                <input
                  type="radio"
                  name="connectorType"
                  value={type}
                  checked={formData.connectorType === type}
                  onChange={handleRadioChange}
                />
                {type}
              </label>
            ))}
          </div>

          <div className="dropdown-container">
            <div className="dropdown-group">
              <div className="row-container">
                <label className="label">Power Rating</label>
                <select
                  name="powerRating"
                  value={formData.powerRating}
                  onChange={handleChange}
                >
                  <option value="">Power Rating</option>
                  <option value="3.3 kW">3.3 kW</option>
                  <option value="7.2 kW">7.2 kW</option>
                  <option value="7.6 kW">7.6 kW</option>
                </select>
              </div>
              <div className="row-container">
                <label className="label">Usage Type</label>
                <select
                  name="usageType"
                  value={formData.usageType}
                  onChange={handleChange}
                >
                  <option value="">Usage Type</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                  <option value="viewonly">ViewOnly</option>
                </select>
              </div>

              <div className="row-container">
                <label className="label">Cost Type</label>
                <select
                  name="costType"
                  value={formData.costType}
                  onChange={handleChange}
                >
                  <option value="">Cost Type</option>
                  <option value="Paid/Unit(Kwh)">Paid/Unit(Kwh)</option>
                  <option value="Free">Free</option>
                </select>
              </div>

              {formData.costType === "Paid/Unit(Kwh)" && (
                <div className="row-container">
                  <div className="input-group">
                    <label className="label">Cost</label>
                    <input
                      type="number"
                      placeholder="Cost/kWh"
                      name="cost"
                      value={formData.cost}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Min Cost</label>
                    <input
                      type="number"
                      placeholder="Min Cost/kWh"
                      name="minCharge"
                      value={formData.minCharge}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div className="row-container">
                <label className="label">Availability</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                >
                  <option value="">Availabilty</option>
                  <option value="Open Specific Time">Open Specific Time</option>
                  <option value="Open 24/7">Open 24/7</option>
                  <option value="Closed">Closed</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>
              <div>
                {/* Amenities Selection Styled as a Dropdown */}
                <div className="row-container">
                  <label htmlFor="amenities-select" className="custom-label">
                    Select Amenities
                  </label>
                  <div
                    className="custom-select"
                    onClick={() => setShowAmenities(!showAmenities)}
                  >
                    {formData.amenitiesAvailable.length > 0
                      ? formData.amenitiesAvailable.join(", ")
                      : "-- Choose amenities --"}
                    <span className="dropdown-arrow">▼</span>
                  </div>
                </div>

                {/* Amenities Checkbox List (Visible when clicked) */}
                {showAmenities && (
                  <div className="amenities-container">
                    {amenitiesList.map((amenity) => (
                      <label key={amenity.id} className="amenity-item">
                        <input
                          type="checkbox"
                          value={amenity.id} // Send ID instead of name
                          checked={formData.amenitiesAvailable.includes(
                            amenity.id
                          )}
                          onChange={() => handleAmenityChange(amenity.id)}
                        />
                        {amenity.name} {/* Display name */}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button type="submit" className="save-button" onClick={handleSubmit}>
            Save
          </button>
        </form>
      )}
    </>
  );
};

export default ChargingStation;
