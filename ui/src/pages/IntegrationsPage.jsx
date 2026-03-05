import React, { useState, useEffect } from 'react';
import api from '../api/api';
import ShopifyConnectButton from '../components/ShopifyConnectButton';

const IntegrationsPage = () => {
  const [integrations, setIntegrations] = useState({
    shopify: { connected: false, storeCount: 0 },
    meta: { connected: false, accountCount: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIntegrationStatus();
  }, []);

  const fetchIntegrationStatus = async () => {
    try {
      const response = await api.get('/api/integrations/shopify/status');
      setIntegrations(response.data);
    } catch (error) {
      console.error('Failed to fetch integration status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnectShopify = async () => {
    try {
      await api.post('/api/integrations/shopify/disconnect', {
        shopDomain: 'current-store.myshopify.com'
      });
      await fetchIntegrationStatus();
    } catch (error) {
      console.error('Failed to disconnect Shopify:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="mt-2 text-gray-600">
            Connect your e-commerce and advertising platforms to enable automated inventory management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shopify Integration */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-8 w-8" src="https://cdn.shopify.com/assets/images/logos/shopify-bag.svg" alt="Shopify" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Shopify</h3>
                    <p className="text-sm text-gray-500">E-commerce Platform</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {integrations.shopify.connected ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Connected
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      Not Connected
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Real-time inventory synchronization</li>
                  <li>• Product stock monitoring</li>
                  <li>• Automated webhook setup</li>
                  <li>• Order tracking integration</li>
                </ul>
              </div>

              {integrations.shopify.connected ? (
                <div className="space-y-3">
                  <div className="bg-green-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-green-800 mb-1">Connection Active</h4>
                    <p className="text-sm text-green-600">
                      Your Shopify store is connected and actively syncing inventory data.
                    </p>
                    <p className="text-xs text-green-500 mt-1">
                      Connected stores: {integrations.shopify.storeCount}
                    </p>
                  </div>
                  <button
                    onClick={handleDisconnectShopify}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Disconnect Shopify
                  </button>
                </div>
              ) : (
                <ShopifyConnectButton />
              )}
            </div>
          </div>

          {/* Meta Integration */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-8 w-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg" alt="Meta" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Meta (Facebook)</h3>
                    <p className="text-sm text-gray-500">Advertising Platform</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Coming Soon
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Campaign automation</li>
                  <li>• Ad performance tracking</li>
                  <li>• Budget optimization</li>
                  <li>• Real-time campaign control</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">Meta Integration</h4>
                <p className="text-sm text-yellow-600">
                  Meta Ads integration is currently in development. This will enable automated campaign pausing/resuming based on inventory levels.
                </p>
              </div>

              <button
                disabled
                className="w-full bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
              >
                Connect Meta (Coming Soon)
              </button>
            </div>
          </div>
        </div>

        {/* Integration Benefits */}
        <div className="mt-12 bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Integration Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto mb-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7m0 0v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Automated Control</h3>
                  <p className="text-sm text-gray-600">
                    Automatically pause ads when products go out of stock and resume when inventory is restored
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto mb-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Cost Savings</h3>
                  <p className="text-sm text-gray-600">
                    Save money by preventing ad spend on products that are out of stock
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto mb-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V0a2 2 0 00-2-2h-2a2 2 0 00-2 2v6z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Real-time Sync</h3>
                  <p className="text-sm text-gray-600">
                    Instant inventory updates ensure your campaigns are always in sync with stock levels
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
