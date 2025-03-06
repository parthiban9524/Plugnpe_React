import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import logo from "../assets/Images/logo.png";
import logo2 from "../assets/Images/logo2.png";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();

  // Dummy function for now, can be used later for actual verification
  const sendVerificationEmail = async () => {
    alert("Verification link sent successfully!");
    setVerificationSent(true);
  };

  // Dummy function for confirming email
  const confirmEmail = async () => {
    alert("Email confirmed successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-welcome">
          <h1 className="login-welcome-text">Welcome to </h1>
          <h1 className="login-welcome-text2">Plugnpe </h1>
        </div>
        <h1 className="login-title">Login</h1>

        <div className="login-steps">
          <div className="login-step active">
            <div className="login-step-icon-container">
              <FaEnvelope className="login-step-icon" />
              <div className="login-step-line"></div>
              <label className="login-label">Email</label>
            </div>
            <div className="emailCon">
            {!verificationSent && (
              <input
                type="email"
                className="login-input"
                placeholder="Email Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            {!verificationSent && (
              <button className="login-submit-btn" onClick={sendVerificationEmail}>
                Submit
              </button>
            )}
            </div>
          </div>

          <div className={`login-step ${verificationSent ? "active" : ""}`}>
            <div className="login-step-icon-container">
              <FaPaperPlane className="login-step-icon" />
              <div className="login-step-line2"></div>
              <span className="login-step-text">Sent Verification Link</span>
            </div>
          </div>

          <div className="login-step">
            <div className="login-step-icon-container2">
              <FaCheckCircle className="login-step-icon" />
              <span className="login-step-text">Confirm Email</span>
            </div>
            {verificationSent && (
              <button className="login-confirm-btn" onClick={confirmEmail}>
                Confirm Email
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="login-logo-container">
  <div className="imgCon">
    <img src={logo} alt="logo1" className="logo-style1"/>
    <img src={logo2} alt="logo2" className="logo-style2"/>
  </div>
</div>

    </div>
  );
};

export default LoginScreen;
