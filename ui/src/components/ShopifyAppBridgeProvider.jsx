import { useMemo } from "react";
import { AppBridgeProvider } from "@shopify/app-bridge-react";

export default function ShopifyAppBridgeProvider({ children }) {

  const params = new URLSearchParams(window.location.search);
  const shop = params.get("shop");
  const host = params.get("host");

  const apiKey = import.meta.env.VITE_SHOPIFY_API_KEY;

  // 🚨 Hard stop if API key missing
  if (!apiKey) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>❌ Shopify API Key Missing</h2>
        <p>Check Vercel environment variable:</p>
        <code>VITE_SHOPIFY_API_KEY</code>
      </div>
    );
  }

  // 🚨 If opened outside Shopify Admin
  if (!shop || !host) {
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
