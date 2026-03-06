import React, { useState } from "react";

const ShopifyConnectButton = () => {
  const [shopDomain, setShopDomain] = useState("");
  const [error, setError] = useState("");

  const handleConnectShopify = () => {
    setError("");

    const shop = shopDomain.trim();

    // ✅ 1 — validate domain
    if (!shop || !shop.endsWith(".myshopify.com")) {
      setError("Enter valid Shopify domain (store-name.myshopify.com)");
      return;
    }

    // ✅ 2 — check login
    const userId = localStorage.getItem("userId",5);
    if (!userId) {
      setError("You must login first");
      return;
    }

    console.log("Connecting shop:", shop);
    console.log("UserId:", userId);

    // ✅ 3 — redirect to backend OAuth
    window.location.href =
      `https://stockguard-production-19c2.up.railway.app/api/integrations/shopify/connect?shop=${shop}&userId=${userId}`;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Connect Shopify Store
        </h2>
        <p className="text-gray-600">
          Connect your Shopify store to enable automated inventory monitoring
          and campaign management
        </p>
      </div>

      {/* ✅ ERROR MESSAGE */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shopify Store Domain
          </label>

          <input
            type="text"
            value={shopDomain}
            onChange={(e) => setShopDomain(e.target.value)}
            placeholder="store-name.myshopify.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="mt-1 text-xs text-gray-500">
            Enter your Shopify domain (no https://)
          </p>
        </div>

        <button
          onClick={handleConnectShopify}
          disabled={!shopDomain.trim()}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          Connect Shopify
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          What happens next?
        </h3>

        <ul className="text-sm text-blue-600 space-y-1">
          <li>• Redirect to Shopify</li>
          <li>• Approve permissions</li>
          <li>• Return automatically</li>
          <li>• Automation starts</li>
        </ul>
      </div>
    </div>
  );
};

export default ShopifyConnectButton;