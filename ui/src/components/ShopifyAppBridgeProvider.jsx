import { useMemo } from "react";
import { AppBridgeProvider } from "@shopify/app-bridge-react";

export default function ShopifyAppBridgeProvider({ children }) {

  const params = new URLSearchParams(window.location.search);
  const shop = params.get("shop");
  const host = params.get("host");

  const apiKey = import.meta.env.VITE_SHOPIFY_API_KEY || "your-shopify-client-id";

  // 🚨 If opened outside Shopify Admin (local development)
  if (!shop || !host) {
    // For local development, render children without AppBridge
    if (window.location.hostname === "localhost") {
      console.log("Local development: Rendering without Shopify AppBridge");
      return children;
    }
    
    // For production, show proper error
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>⚠️ Open App From Shopify Admin</h2>
        <p>
          Go to: <strong>Shopify Admin → Apps → Your App</strong>
        </p>
        <p>Do not open directly in browser.</p>
      </div>
    );
  }

  const config = useMemo(() => {
    return {
      apiKey,
      host,
      forceRedirect: true,
    };
  }, [apiKey, host]);

  return (
    <AppBridgeProvider config={config}>
      {children}
    </AppBridgeProvider>
  );
}
