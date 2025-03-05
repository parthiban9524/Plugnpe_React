import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const resetLoginState = () => {
    setMobile("");
    setOtp("");
    setOtpSent(false);
  };

  return (
    <DataContext.Provider
      value={{
        mobile,
        setMobile,
        otp,
        setOtp,
        otpSent,
        setOtpSent,
        resetLoginState 
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
