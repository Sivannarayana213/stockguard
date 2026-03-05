import React, { useState } from 'react';
import api from '../api/api';

const ShopifyConnectButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shopDomain, setShopDomain] = useState('');

  const handleConnectShopify = async () => {
    if (!shopDomain.trim()) {
      setError('Please enter a valid Shopify store domain');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/api/integrations/shopify/connect', {
        shopDomain: shopDomain.trim()
      });

      if (response.data.authUrl) {
        // Redirect to Shopify OAuth
        window.location.href = response.data.authUrl;
      } else {
        setError('Failed to generate Shopify authorization URL');
      }
    } catch (err) {
      console.error('Shopify connection error:', err);
      setError(err.response?.data?.message || 'Failed to connect to Shopify');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Connect Shopify Store</h2>
        <p className="text-gray-600">
          Connect your Shopify store to enable automated inventory monitoring and campaign management
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="shopDomain" className="block text-sm font-medium text-gray-700 mb-2">
            Shopify Store Domain
          </label>
          <input
            type="text"
            id="shopDomain"
            value={shopDomain}
            onChange={(e) => setShopDomain(e.target.value)}
            placeholder="your-store.myshopify.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          />
          <p className="mt-1 text-xs text-gray-500">
            Use your real Shopify store: <strong>store-name.myshopify.com</strong> (no https://). Find it in Shopify Admin → Settings → Domains.
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleConnectShopify}
            disabled={loading || !shopDomain.trim()}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </span>
            ) : (
              'Connect Shopify'
            )}
          </button>

        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 mb-2">What happens next?</h3>
        <ul className="text-sm text-blue-600 space-y-1">
          <li>• You'll be redirected to Shopify for authorization</li>
          <li>• Grant permissions for inventory and product access</li>
          <li>• Return here to complete the setup</li>
          <li>• Start automated campaign management</li>
        </ul>
      </div>
    </div>
  );
};

export default ShopifyConnectButton;
