import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataContext from "../api/context/DataContext"; // Import Context
import logo from "../assets/Images/logo.png";
import logo2 from "../assets/Images/logo2.png";

const BASE_URL = "https://plugnpe.azurewebsites.net/api";
const OTP_REQUEST = `${BASE_URL}/Customer/SendOTP?mobileNumber=`;
const VERIFY_OTP_REQUEST = `${BASE_URL}/Customer/Authorize?mobileNumber=`;

const LoginScreen = () => {
  const { mobile, setMobile, otp, setOtp, otpSent, setOtpSent,resetLoginState } = useContext(DataContext);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const response = await axios.post(`${OTP_REQUEST}${mobile}`);

      if (response.status === 200) {
        alert("OTP Sent Successfully!");
        setOtpSent(true); // Hide mobile input and show OTP input
      }
    } catch (error) {
      alert("Failed to send OTP!");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${VERIFY_OTP_REQUEST}${mobile}&otp=${otp}`);

      if (response.status === 200) {
        alert("Login Successful!");
        resetLoginState();
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Invalid OTP!");
    }
  };

  return (
    <div className="loginContainer">
      <div className="con1">
        <div className="welCon">
          <h1 className="welTxt">Welcome to </h1>
          <img src={logo} alt="logo.png" />
        </div>
        <h1 className="logTxt">Login</h1>

        {/* Hide mobile input and "Get OTP" button after OTP is sent */}
        {!otpSent ? (
          <>
            <input
              type="tel"
              className="inputField"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <br />
            <button className="sendOtpBtn" onClick={sendOtp} disabled={otpSent}>
              Get OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className="inputField"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <br />
            <button className="verifyOtpBtn" onClick={handleLogin}>Verify OTP</button>
            <button className="resendOtpBtn" onClick={sendOtp}>Resend OTP</button>
          </>
        )}
      </div>

      <div className="con2">
        <img src={logo2} alt="logo.png" />
      </div>
    </div>
  );
};

export default LoginScreen;
