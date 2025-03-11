import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import DataContext from "../api/context/DataContext";
import logo from "../assets/Images/logo.png";
import logo2 from "../assets/Images/logo2.png";
import logo3 from "../assets/Images/logo3.png";
import "../styles/Login.css";

const LoginScreen = () => {
  const { email, setEmail, password, setPassword, login, loading } = useContext(DataContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    const response = await login(email, password); // Call login function
  
    if (response.success) {
      navigate("/dashboard"); // Navigate if login is successful
    } else {
      alert(response.message); // Show API error in an alert
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Side - Login Form */}
        <div className="login-left">
          <div className="login-header">
            <img src={logo} alt="logo1" className="logo-img" />
            <h2 className="welcome-text">Welcome to Plugnpe</h2>
            <h2 className="welcome-text">Login</h2>
          </div>

          <div className="login-form">
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                className="login-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group password-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="login-button" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>

        {/* Right Side - Footer Logo with Conditional Image */}
        <div className="login-right">
          <h2 className="EV-text">Making EV Drive Smarter</h2>
          <img src={logo2} alt="logo2" className="logo2-img desktop-logo" />
          <img src={logo3} alt="logo3" className="logo3-img mobile-logo" />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
