import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import { DataProvider } from "../api/context/DataContext";
import AboutUs from "../screens/AboutUs";
import Request from "../screens/Request";
import HostDetails from "../screens/HostDetails";
import Wallet from "../screens/Wallet";

const AppRouter = () => {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            {/* Nested routes under Dashboard */}
            <Route path="host" element={<HostDetails />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="request" element={<Request />} />
            <Route path="about" element={<AboutUs />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default AppRouter;
