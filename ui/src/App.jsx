import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import StockGuardLandingDemo from "./pages/StockGuardLandingDemo";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboardpage from "./pages/Dashboardpage";
import IntegrationsPage from "./pages/IntegrationsPage";
import ShopifyAppBridgeProvider from "./components/ShopifyAppBridgeProvider";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email") || "");


  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
  };

  return (
      <Router>
        <Routes>
          <Route path="/" element={<StockGuardLandingDemo />} />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterPage onLogin={handleLogin} />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboardpage userEmail={userEmail} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/integrations"
            element={isLoggedIn ? <IntegrationsPage /> : <Navigate to="/login" />}
          />
          <Route
          path="/shopify"
          element={
            <ShopifyAppBridgeProvider>
              <Dashboardpage userEmail={userEmail} onLogout={handleLogout} />
            </ShopifyAppBridgeProvider>
          }
        />
        </Routes>
      </Router>
  );
}

