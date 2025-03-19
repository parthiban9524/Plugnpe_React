import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import { DataProvider } from "../api/context/DataContext";
import Location from "../screens/Location";
import Reports from "../screens/Reports";
import AdminDashboard from "../screens/AdminDashboard";
import Payment from "../screens/Payment";
import HostDetails from "../screens/HostDetails";
import UserDetails from "../screens/UserDetails";
import ServiceProvider from "../screens/ServiceProvider";
import ChargingStation from "../screens/ChargingStation";

const AppRouter = () => {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="adminDashboard" element={<AdminDashboard />} />
            <Route path="hostDetails" element={<HostDetails />} />
            <Route path="payment" element={<Payment />} />
            <Route path="reports" element={<Reports />} />
            <Route path="location" element={<Location />} />
            <Route path="chargingStation" element={<ChargingStation/>} />
            
            {/* ✅ New User Routes */}
            <Route path="userDetails" element={<UserDetails />} />
            <Route path="serviceProvider" element={<ServiceProvider />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default AppRouter;
