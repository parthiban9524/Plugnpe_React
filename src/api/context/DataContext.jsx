import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [chargingStations, setChargingStations] = useState(
    JSON.parse(localStorage.getItem("chargingStations")) || null
  );
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || null
  );
  const [pendingWithdraws, setPendingWithdraws] = useState([]);

  const BASE_URL = "https://plugnpe.azurewebsites.net/api";
  const verificationUrl = `${BASE_URL}/Customer/AuthorizeAdmin`;
  const getAllPendingWithdraws = `${BASE_URL}/Payment/GetAllPendingWithdraws`;
  const getChargingStationsUrl = `${BASE_URL}/chargingStation/GetChargingStations`;
  const getUserDetailsUrl = `${BASE_URL}/Customer/GetCustomers`;


   

  // Save token in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // **Login API**
  const login = async (email, password) => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return { success: false, message: "Please enter email and password." };
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${verificationUrl}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        { method: "POST" }
      );

      const data = await response.json();

      if (response.ok && data.token) {
        setIsAuthenticated(true);
        setEmail(email);
        setPassword(password);
        setToken(data.token);
        setError("");
        return { success: true, message: "Login Successful!" };
      } else {
        setError(data.message || "Invalid email or password.");
        alert(data.message || "Invalid email or password.");
        return { success: false, message: data.message || "Invalid email or password." };
      }
    } catch (error) {
      setError(error.message);
      alert(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // **Fetch Charging Stations & Store in Local Storage**
  const getChargingStations = async () => {
    setLoading(true);
    setError("");
  
    try {
      const url = `${getChargingStationsUrl}?hostId=0`;
      console.log("Fetching charging stations from:", url);
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is correct
        },
      });
  
      console.log("Response Status:", response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Charging Stations Data:", data);
  
      setChargingStations(data);
      localStorage.setItem("chargingStations", JSON.stringify(data));
    } catch (err) {
      setError(err.message);
      console.error("Fetch Charging Stations Error:", err);
    } finally {
      setLoading(false);
    }
  };
  

  const getUserDetails = async () => {
    setLoading(true);
    setError("");
  
    try {
      const url = `${getUserDetailsUrl}?id=0`;
      console.log("Fetching User Details from:", url);
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is correct
        },
      });
  
      console.log("Response Status:", response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Uer Details Data:", data);
  
      setUserDetails(data);
      localStorage.setItem("chargingStations", JSON.stringify(data));
    } catch (err) {
      setError(err.message);
      console.error("Fetch Charging Stations Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // **Fetch Pending Withdrawals**
  const getPendingWithdraws = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${getAllPendingWithdraws}?customerId=0`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();
      if (!text) {
        setPendingWithdraws([]);
        return;
      }

      const data = JSON.parse(text);
      setPendingWithdraws(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // **Approve Withdrawal**
  const approveWithdrawal = async (transactionId) => {
    if (!transactionId) {
      alert("Invalid transaction ID");
      return { success: false, message: "Invalid transaction ID" };
    }

    setLoading(true);
    setError("");

    try {
      const url = `${BASE_URL}/Payment/ApproveBalanceWithdraw?referenceNumber=${transactionId}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = `HTTP error! Status: ${response.status}`;
        throw new Error(errorMessage);
      }

      alert("Withdrawal approved!");
      return { success: true, message: "Withdrawal approved!" };
    } catch (error) {
      setError(error.message);
      alert(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // **Logout Function (Clears Local Storage)**
  const logout = () => {
    setEmail("");
    setPassword("");
    setIsAuthenticated(false);
    setToken("");
    setChargingStations(null);
    localStorage.removeItem("token");
    localStorage.removeItem("chargingStations"); // Clear stored data on logout
  };

  const deleteCustomer = async (id) => {
    if (!id) {
      alert("Invalid customer ID");
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
  
    setLoading(true);
    setError("");
  
    try {
      const url = `${BASE_URL}/customer/DeleteCustomer?id=${id}`;
  
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      alert("User deleted successfully!");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteHost = async (id) => {
    if (!id) {
      alert("Invalid customer ID");
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to delete this Host?");
    if (!confirmDelete) return;
  
    setLoading(true);
    setError("");
  
    try {
      const url = `${BASE_URL}/ChargingStation/DeleteChargingStation?stationId=${id}`;
  
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      alert("Host deleted successfully!");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getServices = async (id) => {
    console.log(`Fetching services for customerId: ${id}`); 
  
    try {
      const response = await fetch(`${BASE_URL}/ServiceDetail/GetServiceDetail?customerId=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log(`HTTP Status: ${response.status}`);
  
      if (!response.ok) {
        console.error("HTTP error! Status:", response.status);
        return [];
      }
  
      const data = await response.json();
      console.log(`API Response for ID ${id}:`, data);
  
      // Ensure we correctly extract service details
      if (data && Array.isArray(data)) {
        console.log(`Valid services for ID ${id}:`, data);
        return data;  // ✅ Return services directly if it's an array
      } 
      else if (data?.status === "Success" && Array.isArray(data.result)) {
        console.log(`Valid services (inside result) for ID ${id}:`, data.result);
        return data.result;  // ✅ Return `data.result` if it's inside the "result" key
      } 
      else {
        console.warn(`Unexpected API structure for ID ${id}:`, data);
        return []; // Return empty array if structure is incorrect
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      return [];
    }
  };

  const addChargingStation = async (existingStation, formData, deviceId) => {
    const payload = {
      id: existingStation?.id || 0,
      createdDate: existingStation?.createdDate,
      modifiedDate: existingStation?.modifiedDate,
      createdBy: existingStation?.createdBy || 0,
      modifiedBy: existingStation?.modifiedBy || 0,
      status: existingStation?.status,
      customerId: Number(formData?.customerId) || existingStation?.customerId,
      stationName: formData.stationName || null,
      amenitiesAvailable: Array.isArray(formData.amenitiesAvailable) 
      ? formData.amenitiesAvailable.join(", ") 
      : "",
      address: formData.address || null,
      city: formData.city || null,
      district: formData.district || null,
      state: formData.state || null,
      country: formData.country || null,
      pinCode: Number(formData.pinCode) || null,
      landmark: formData.landmark || null,
      latitude: formData.latitude || null,
      longitude: formData.longitude || null,
      holderName: formData.holderName || null,
      holderPhone: formData.holderMobile|| null,
      holderEmail: formData.holderEmail || null,
      vehicleSupport: Array.isArray(formData.vehicleSupport) 
      ? formData.vehicleSupport.join(", ") 
      : "",
      chargerTypeSupport:formData.chargerTypeSupport || null,
      connectorType: formData.connectorType || null,
      powerRating: formData.powerRating || null,
      usageType: formData.usageType || null,
      deviceId: deviceId,
      deviceSequence: existingStation?.deviceSequence || 0,
      wifiUsername: formData.wifiUsername || null,
      wifipassword: formData.wifipassword || null,
      defaultWifiName: existingStation?.defaultWifiName || "",
      defaultWifiPassword: existingStation?.defaultWifiPassword || "",
      macAddress: existingStation?.macAddress || "",
      deviceModel: existingStation?.deviceModel || null,
      deviceName: formData.deviceName || null,
      mqttDeviceStatus: existingStation?.mqttDeviceStatus || "",
      mqttUpdatedTime: existingStation?.mqttUpdatedTime,
      availability: formData.availability || null,
      availableFromTime: formData.availableFromTime || null,
      availableToTime: formData.availableToTime || null,
      costType: formData.costType || null,
      cost: Number(formData.cost) || 0,
      minCharge: Number(formData.minCharge) || 0,
      photo1: formData.photo1 || "",
      photo2: formData.photo2 || "",
      photo3: formData.photo3 || "",
      vendorName: existingStation?.vendorName || null,
      vendorDeviceId: existingStation?.vendorDeviceId || null,
      connectivityMode: existingStation?.connectivityMode || null,
      isFavourite: existingStation?.isFavourite || false,
      currentChargingStatus: existingStation?.currentChargingStatus || "Idle",
      lastUsed: existingStation?.lastUsed || "",
      rating: Number(existingStation?.rating) || 0,
    };
  
    console.log("Final Payload in Context:", JSON.stringify(payload, null, 2));
  
    try {
      const response = await fetch(
        `${BASE_URL}/ChargingStation/UpdateChargingStation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
  
      // 🛠 Fix: Read response as text before parsing
      const text = await response.text();
      if (!text) {
        console.warn("Empty response from API");
        return null; // Avoid parsing empty response
      }
  
      const data = JSON.parse(text);
      console.log("Station added successfully:", data);
      return data;
    } catch (error) {
      console.error("Error adding station:", error);
      throw error;
    }
  };
  
  
  
  
  
  
  

  return (
    <DataContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        isAuthenticated,
        setIsAuthenticated,
        token,
        loading,
        error,
        login,
        logout,
        pendingWithdraws,
        getPendingWithdraws,
        approveWithdrawal,
        chargingStations,
        getChargingStations,
        getUserDetails,
        userDetails,
        deleteCustomer,
        deleteHost,
        getServices,
        addChargingStation
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
