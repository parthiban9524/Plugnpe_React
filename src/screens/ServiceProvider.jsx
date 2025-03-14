import React, { useContext, useEffect, useState } from "react";
import DataContext from "../api/context/DataContext";
import "../styles/ServiceProvider.css";
import { BikeServices, AutoServices, CarServices } from "../Components/utils";

const UserDetails = () => {
  const { userDetails, getUserDetails, loading, error, getServices } =
    useContext(DataContext);
  const [expandedRows, setExpandedRows] = useState({});
  const [serviceData, setServiceData] = useState({}); // Store services per provider

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    console.log("Updated serviceData:", serviceData);
  }, [serviceData]);

  const toggleRow = async (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));

    if (!serviceData[id]) {
      console.log(`Fetching services for provider ID: ${id}`); // ✅ Debugging log

      const services = await getServices(id);
      console.log(`Fetched services for ID ${id}:`, services); // ✅ Debugging log

      setServiceData((prev) => ({ ...prev, [id]: services || [] }));
    }
  };

  const getServiceName = (serviceId, vehicleTypeId) => {
    let serviceList = [];
    if (vehicleTypeId === 2) {
      serviceList = BikeServices;
    } else if (vehicleTypeId === 3) {
      serviceList = AutoServices;
    } else if (vehicleTypeId === 4) {
      serviceList = CarServices;
    }

    const matchedService = serviceList.find((s) => s.id === serviceId);
    return matchedService ? matchedService.name : "Unknown Service";
  };

  // Function to get vehicle type name
  const getVehicleTypeName = (vehicleTypeId) => {
    switch (vehicleTypeId) {
      case 2:
        return "Bike";
      case 3:
        return "Auto";
      case 4:
        return "Car";
      default:
        return "Unknown";
    }
  };

  const filteredUsers =
    userDetails?.filter((user) => user.userType === 1) || [];

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
  {filteredUsers.map((provider) => {
    // ✅ Define groupedServices inside the loop
    const groupedServices = {};
    if (serviceData[provider.id]) {
      serviceData[provider.id].forEach((service) => {
        if (!groupedServices[service.vehicleTypeId]) {
          groupedServices[service.vehicleTypeId] = [];
        }
        groupedServices[service.vehicleTypeId].push(service);
      });
    }

    return (
      <React.Fragment key={provider.id}>
        <tr>
          <td>{provider.id}</td>
          <td>{provider.shopName}</td>
          <td>
            <button
              className="get-userDetails-button"
              onClick={() => toggleRow(provider.id)}
            >
              {expandedRows[provider.id] ? "Hide Details" : "Get Details"}
            </button>
          </td>
        </tr>
        {expandedRows[provider.id] && (
          <tr className="userDetails-row">
            <td colSpan="3">
              <table className="userDetails-table">
                <tbody>
                  <tr>
                    <td><strong>Mobile Number:</strong></td>
                    <td>{provider.mobileNumber}</td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>{provider.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Shop Address</strong></td>
                    <td>{provider.shopAddress}</td>
                  </tr>

                  {/* ✅ Service Details Section */}
                  <tr>
                    <td colSpan="3">
                      <h3>Service Details for {provider.shopName}</h3>
                      <table>
                        <thead>
                          <tr>
                            <th>Vehicle Type</th>
                            <th>Service Name</th>
                            <th>Min Amount</th>
                            <th>Max Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(groupedServices).length > 0 ? (
                            Object.entries(groupedServices).map(([vehicleTypeId, services]) => (
                              <React.Fragment key={vehicleTypeId}>
                                <tr>
                                  <td colSpan="3" style={{ fontWeight: 'bold', background: '#f5f5f5' }}>
                                    {getVehicleTypeName(Number(vehicleTypeId))}
                                  </td>
                                </tr>
                                {services.map((service, index) => (
                                  <tr key={index}>
                                    <td></td>
                                    <td>{getServiceName(service.serviceId, service.vehicleTypeId)}</td>
                                    <td>{service.minAmount}</td>
                                    <td>{service.maxAmount}</td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3">No services available</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  })}
</tbody>

        </table>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
};

export default UserDetails;
