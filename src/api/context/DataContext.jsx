import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = "https://plugnpe.azurewebsites.net/api";
  const verificationUrl = `${BASE_URL}/Customer/AuthorizeAdmin`;

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

      if (response.ok) {
        setIsAuthenticated(true);
        setEmail(email);
        setPassword(password);
        setError("");

        alert("Login Successful!"); // ✅ Show success alert
        return { success: true, message: "Login Successful!" };
      } else {
        setError(data.message || "Invalid email or password.");
        alert(data.message || "Invalid email or password."); // ❌ Show actual API error
        return { success: false, message: data.message || "Invalid email or password." };
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      alert("Something went wrong. Please try again."); // ❌ Show network error
      return { success: false, message: "Something went wrong. Please try again." };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setEmail("");
    setPassword("");
    setIsAuthenticated(false);
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
