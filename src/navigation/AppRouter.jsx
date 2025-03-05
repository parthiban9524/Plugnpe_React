import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
