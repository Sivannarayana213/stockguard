import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

import connectShopify from "../components/ShopifyConnectButton";

// Import your components
import InventoryTable from "../components/InventoryTable";
import CampaignTable from "../components/CampaignTable";
import ActionFeed from "../components/ActionFeed";

export default function Dashboardpage({ userEmail, onLogout }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    moneySaved: 0,
    pausedCampaigns: 0,
    totalProducts: 0,
    activeCampaigns: 0
  });

  // 1. Fetch Real Stats
  const fetchStats = async () => {
    try {
      const res = await api.get("/api/dashboard"); // Note: /api/dashboard
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">

      {/* Navbar */}
      <nav className="bg-slate-800/50 border-b border-purple-500/20 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
            <span>🛡️</span> StockGuard
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <button onClick={() => navigate("/integrations")} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
        🔗 Integration
      </button>


      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-1">Dashboard</h2>
            <p className="text-gray-400">Real-time protection status</p>
          </div>
        </div>


        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-slate-800/80 border border-white/10 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Money Saved</p>
            <h3 className="text-3xl font-bold text-green-400">₹{stats.moneySaved}</h3>
          </div>

          <div className="bg-slate-800/80 border border-white/10 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Paused Campaigns</p>
            <h3 className="text-3xl font-bold text-blue-400">{stats.pausedCampaigns}</h3>
          </div>

          <div className="bg-slate-800/80 border border-white/10 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Total Products</p>
            <h3 className="text-3xl font-bold text-purple-400">{stats.totalProducts}</h3>
          </div>

          <div className="bg-slate-800/80 border border-white/10 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Active Campaigns</p>
            <h3 className="text-3xl font-bold text-yellow-400">{stats.activeCampaigns}</h3>
          </div>

        </div>

        {/* Main Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Tables */}
          <div className="lg:col-span-2 space-y-8">
            <CampaignTable />
            <InventoryTable />
          </div>

          {/* Right Column: Activity Feed */}
          <div>
            <ActionFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
