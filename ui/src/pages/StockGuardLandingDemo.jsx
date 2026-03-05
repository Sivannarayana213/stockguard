import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboardpage from "./Dashboardpage";


export default function StockGuardLandingDemo() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const stats = {
    saved: 68240,
    paused: 21,
    protected: 34
  };

  const features = [
    {
      title: "Live Inventory Sync",
      description: "Connect your inventory system. We pull real-time stock data every minute.",
      icon: "📦"
    },
    {
      title: "Instant Ad Pause",
      description: "When stock hits zero, we automatically pause your ad campaigns in seconds.",
      icon: "⚡"
    },
    {
      title: "Complete Dashboard",
      description: "See every campaign, every pause, and exactly how much you saved.",
      icon: "📊"
    }
  ];

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>🛡️</span>
            <span>StockGuard</span>
          </div>
          <div style={styles.navButtons}>
            <button style={styles.signInBtn}onClick={()=>navigate("/login")}>
               Sign In
               </button>
            <button style={styles.primaryBtn}onClick={() =>navigate("/register")}>
              Start 14 Day Free Trial
              </button>
          </div>
        </div>
      </nav>

     <section style={styles.hero}>
  <h1>Stop Losing Money on Out-of-Stock Ads</h1>
  <p>Shopify brands waste ₹20,000–₹80,000/month running ads for sold-out products. StockGuard pauses them automatically.</p>

  <button style={styles.cta}>Join Founders Plan – ₹999 Lifetime</button>

  <p style={styles.small}>Limited to first 20 stores.</p>
</section>

<section>
  <h2>This Happens Every Week</h2>
  <ul>
    <li>Ads keep running after stock finishes</li>
    <li>Teams notice too late</li>
    <li>Budget burns on useless clicks</li>
    <li>Manual monitoring fails at scale</li>
  </ul>
</section>

<section>
  <h2>How StockGuard Works</h2>
  <ol>
    <li>Connect Shopify</li>
    <li>Connect Meta Ads</li>
    <li>Auto-pause when stock hits zero</li>
  </ol>
</section>

<section>
  <h2>Founders Plan</h2>
  <h3>₹999 Lifetime</h3>

  <ul>
    <li>Unlimited campaigns</li>
    <li>Meta + Google Ads support</li>
    <li>Early feature access</li>
    <li>Private founder group</li>
  </ul>

  <button style={styles.cta}>Secure Early Access</button>
</section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>© 2026 StockGuard. All rights reserved.</p>
        <div style={styles.footerLinks}>
          <a href="#" style={styles.footerLink}>Privacy</a>
          <a href="#" style={styles.footerLink}>Terms</a>
          <a href="#" style={styles.footerLink}>Contact</a>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "#0f1118",
    color: "#ffffff",
    minHeight: "100vh",
    lineHeight: "1.6",
    overflowX: "hidden"
  },

  // NAVBAR
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 40,
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    background: "rgba(15, 17, 24, 0.85)",
    backdropFilter: "blur(10px)"
  },

  navContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "16px 40px"
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "20px",
    fontWeight: "700",
    letterSpacing: "-0.5px"
  },

  logoIcon: {
    fontSize: "24px"
  },

  navButtons: {
    display: "flex",
    gap: "12px"
  },

  // BUTTONS
  signInBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#ffffff",
    padding: "10px 18px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ":hover": {
      borderColor: "rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.05)"
    }
  },

  primaryBtn: {
    background: "linear-gradient(135deg, #5b6cf8 0%, #4f7cff 100%)",
    border: "none",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(79, 124, 255, 0.25)",
    transition: "all 0.2s ease",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 25px rgba(79, 124, 255, 0.35)"
    }
  },

  secondaryBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },

  // HERO SECTION
  hero: {
    background: "linear-gradient(180deg, rgba(91, 108, 248, 0.1) 0%, rgba(15, 17, 24, 0) 100%)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    paddingTop: "80px",
    paddingBottom: "60px"
  },

  heroContent: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "0 20px",
    textAlign: "center"
  },

  heroTitle: {
    fontSize: "56px",
    fontWeight: "700",
    lineHeight: "1.2",
    marginBottom: "24px",
    background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-1px"
  },

  heroSubtitle: {
    fontSize: "18px",
    color: "#c9c9d0",
    marginBottom: "12px",
    lineHeight: "1.6"
  },

  heroTrialText: {
    fontSize: "16px",
    color: "#5b6cf8",
    marginBottom: "24px",
    fontWeight: "500"
  },

  heroCta: {
    background: "linear-gradient(135deg, #5b6cf8 0%, #4f7cff 100%)",
    border: "none",
    color: "#ffffff",
    padding: "16px 32px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 8px 30px rgba(79, 124, 255, 0.3)",
    transition: "all 0.3s ease",
    marginBottom: "16px",
    display: "inline-block"
  },

  trustText: {
    fontSize: "14px",
    color: "#7d7d8a",
    marginTop: "16px"
  },

  // STATS SECTION
  statsSection: {
    padding: "80px 20px",
    background: "#0f1118"
  },

  statsContainer: {
    maxWidth: "1400px",
    margin: "0 auto"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
    marginTop: "40px"
  },

  statCard: {
    background: "linear-gradient(135deg, rgba(91, 108, 248, 0.08) 0%, rgba(79, 124, 255, 0.04) 100%)",
    border: "1px solid rgba(91, 108, 248, 0.2)",
    padding: "32px 24px",
    borderRadius: "12px",
    textAlign: "center",
    transition: "all 0.3s ease",
    ":hover": {
      borderColor: "rgba(91, 108, 248, 0.4)",
      transform: "translateY(-4px)"
    }
  },

  statNumber: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#5b6cf8",
    marginBottom: "8px"
  },

  statLabel: {
    fontSize: "14px",
    color: "#c9c9d0",
    marginBottom: "8px"
  },

  statTrendUp: {
    fontSize: "13px",
    color: "#5b6cf8",
    fontWeight: "500"
  },

  // FEATURES SECTION
  featuresSection: {
    padding: "80px 20px",
    background: "rgba(91, 108, 248, 0.02)"
  },

  featuresContainer: {
    maxWidth: "1400px",
    margin: "0 auto"
  },

  sectionTitle: {
    fontSize: "42px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "12px",
    letterSpacing: "-0.5px"
  },

  sectionSubtitle: {
    fontSize: "18px",
    color: "#8d8d99",
    textAlign: "center",
    marginBottom: "40px"
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginTop: "40px"
  },

  featureCard: {
    background: "#1a1d2e",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "32px 24px",
    borderRadius: "12px",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },

  featureCardActive: {
    background: "linear-gradient(135deg, rgba(91, 108, 248, 0.15) 0%, rgba(79, 124, 255, 0.08) 100%)",
    borderColor: "rgba(91, 108, 248, 0.3)",
    boxShadow: "0 8px 30px rgba(79, 124, 255, 0.15)"
  },

  featureIcon: {
    fontSize: "32px",
    marginBottom: "12px"
  },

  featureTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#ffffff"
  },

  featureDescription: {
    fontSize: "14px",
    color: "#8d8d99",
    lineHeight: "1.6"
  },

  featureNumber: {
    position: "absolute",
    top: "16px",
    right: "16px",
    fontSize: "28px",
    fontWeight: "700",
    color: "rgba(91, 108, 248, 0.15)"
  },

  // BENEFITS SECTION
  benefitsSection: {
    padding: "80px 20px",
    background: "#0f1118"
  },

  benefitsContainer: {
    maxWidth: "1000px",
    margin: "0 auto"
  },

  benefitsList: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "24px",
    marginTop: "40px"
  },

  benefitItem: {
    display: "flex",
    gap: "20px",
    padding: "24px",
    background: "rgba(91, 108, 248, 0.05)",
    border: "1px solid rgba(91, 108, 248, 0.1)",
    borderRadius: "8px",
    transition: "all 0.2s ease"
  },

  checkmark: {
    fontSize: "20px",
    color: "#5b6cf8",
    fontWeight: "700",
    flexShrink: 0,
    marginTop: "2px"
  },

  benefitTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "4px",
    color: "#ffffff"
  },

  benefitText: {
    fontSize: "14px",
    color: "#8d8d99",
    lineHeight: "1.6"
  },

  // PRICING SECTION
  pricingSection: {
    padding: "80px 20px",
    background: "rgba(91, 108, 248, 0.02)",
    borderTop: "1px solid rgba(255,255,255,0.08)"
  },

  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "40px auto 0"
  },

  pricingCard: {
    background: "#1a1d2e",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "32px 24px",
    borderRadius: "12px",
    position: "relative",
    transition: "all 0.3s ease"
  },

  pricingCardPopular: {
    background: "linear-gradient(135deg, rgba(91, 108, 248, 0.15) 0%, rgba(79, 124, 255, 0.08) 100%)",
    borderColor: "rgba(91, 108, 248, 0.3)",
    transform: "scale(1.05)"
  },

  popularBadge: {
    position: "absolute",
    top: "-12px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#5b6cf8",
    color: "#ffffff",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600"
  },

  pricingName: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#ffffff"
  },

  pricingPrice: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#5b6cf8",
    marginBottom: "4px"
  },

  pricingPeriod: {
    fontSize: "14px",
    color: "#8d8d99",
    fontWeight: "400",
    marginLeft: "4px"
  },

  pricingFeature: {
    fontSize: "14px",
    color: "#8d8d99",
    marginBottom: "12px",
    lineHeight: "1.8"
  },

  primaryBtnLarge: {
    width: "100%",
    marginTop: "16px",
    padding: "12px 24px"
  },

  // FINAL CTA SECTION
  finalCta: {
    padding: "80px 20px",
    background: "linear-gradient(135deg, rgba(91, 108, 248, 0.1) 0%, rgba(79, 124, 255, 0.05) 100%)",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    borderBottom: "1px solid rgba(255,255,255,0.08)"
  },

  finalCtaContent: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center"
  },

  finalCtaTitle: {
    fontSize: "48px",
    fontWeight: "700",
    marginBottom: "16px",
    letterSpacing: "-0.5px"
  },

  finalCtaSubtitle: {
    fontSize: "18px",
    color: "#c9c9d0",
    marginBottom: "32px",
    lineHeight: "1.6"
  },

  heroCtaLarge: {
    background: "linear-gradient(135deg, #5b6cf8 0%, #4f7cff 100%)",
    border: "none",
    color: "#ffffff",
    padding: "16px 40px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 8px 30px rgba(79, 124, 255, 0.3)",
    transition: "all 0.3s ease",
    display: "inline-block",
    marginBottom: "16px"
  },

  finalCtaSmall: {
    fontSize: "14px",
    color: "#7d7d8a",
    marginTop: "16px"
  },

  // FOOTER
  footer: {
    background: "#0a0c12",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    padding: "40px 20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#7d7d8a"
  },

  footerLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    marginTop: "12px"
  },

  footerLink: {
    color: "#7d7d8a",
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.2s ease"
  }
};
