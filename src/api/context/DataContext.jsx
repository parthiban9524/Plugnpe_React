import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingWithdraws, setPendingWithdraws] = useState([]); // Store API data

  const BASE_URL = "https://plugnpe.azurewebsites.net/api";
  const verificationUrl = `${BASE_URL}/Customer/AuthorizeAdmin`;
  const getAllPendingWithdraws = `${BASE_URL}/Payment/GetAllPendingWithdraws`;
  const token =
    "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiOTM2MTgzMDI4OCIsImp0aSI6IjA1OGUyYWFmLTQwMzAtNGIwYi05MzQwLWIyZTQzYjAzMTk1ZiIsImV4cCI6MTc0MjQ0MDkyNCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNDEiLCJhdWQiOiJVc2VyIn0.hyC3Ln7g6yqi9VyksEcHFFrju1GPBUAwNT_AzzGHUd0";

  const login = async (email, password) => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return { success: false, message: "Please enter email and password." };
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${verificationUrl}?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`,
        { method: "POST" }
      );

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setEmail(email);
        setPassword(password);
        setError("");

        alert("Login Successful!");
        return { success: true, message: "Login Successful!" };
      } else {
        setError(data.message || "Invalid email or password.");
        alert(data.message || "Invalid email or password.");
        return {
          success: false,
          message: data.message || "Invalid email or password.",
        };
      }
    } catch (error) {
      setError(error.message);
      alert(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getPendingWithdraws = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${getAllPendingWithdraws}?customerId=0`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔹 Add the correct auth token
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();
      if (!text) {
        setPendingWithdraws([]); // Handle empty response safely
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

  const logout = () => {
    setEmail("");
    setPassword("");
    setIsAuthenticated(false);
  };

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
          Authorization: `Bearer ${token}`, // 🔹 Add the correct auth token
        },
      });
      console.log("responseeee",response)

      if (!response.ok) {
        const errorMessage = `HTTP error! Status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : {}; // Safely parse response

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

  return (
    <DataContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        error,
        login,
        logout,
        pendingWithdraws,
        getPendingWithdraws, // Provide function
        approveWithdrawal,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
