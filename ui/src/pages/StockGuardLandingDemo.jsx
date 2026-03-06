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

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Stop Wasting Ad Spend On Out Of Stock Products
          </h1>
          <p style={styles.heroSubtitle}>
            Automatically pause ad campaigns when inventory runs low. Protect your budget, increase ROI.
          </p>
          <p style={styles.heroTrialText}>
            Start your <strong>14-day free trial</strong>. No credit card required. Cancel anytime.
          </p>
          <button style={styles.heroCta}onClick={()=> navigate("/register")}>
            Start 14 Day Free Trial →
          </button>
          <p style={styles.trustText}>
            ✓ 200+ merchants already protecting their ad spend
          </p>
        </div>
      </section>

      {/* LIVE DEMO STATS */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <h2 style={styles.sectionTitle}>Real Numbers From Our Platform</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>₹{(stats.saved / 1000).toFixed(0)}K</div>
              <p style={styles.statLabel}>Ad Spend Protected This Month</p>
              <div style={styles.statTrendUp}>↑ 24% vs last month</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.paused}</div>
              <p style={styles.statLabel}>Campaigns Auto-Paused Today</p>
              <div style={styles.statTrendUp}>⚡ Real-time protection</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.protected}</div>
              <p style={styles.statLabel}>Products Being Protected</p>
              <div style={styles.statTrendUp}>🎯 Across all channels</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={styles.featuresSection}>
        <div style={styles.featuresContainer}>
          <h2 style={styles.sectionTitle}>How StockGuard Works</h2>
          <p style={styles.sectionSubtitle}>
            Three steps to protect your ad budget
          </p>

          <div style={styles.featureGrid}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  ...styles.featureCard,
                  ...(activeFeature === index && styles.featureCardActive)
                }}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h4 style={styles.featureTitle}>{feature.title}</h4>
                <p style={styles.featureDescription}>{feature.description}</p>
                <div style={styles.featureNumber}>0{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section style={styles.benefitsSection}>
        <div style={styles.benefitsContainer}>
          <h2 style={styles.sectionTitle}>Why Merchants Love StockGuard</h2>
          <div style={styles.benefitsList}>
            <div style={styles.benefitItem}>
              <span style={styles.checkmark}>✓</span>
              <div>
                <h4 style={styles.benefitTitle}>Save Man-Hours</h4>
                <p style={styles.benefitText}>No more manual campaign management. Automation handles pauses 24/7.</p>
              </div>
            </div>
            <div style={styles.benefitItem}>
              <span style={styles.checkmark}>✓</span>
              <div>
                <h4 style={styles.benefitTitle}>Reduce Wasted Spend</h4>
                <p style={styles.benefitText}>Stop paying for clicks on products you can't sell. Immediate ROI.</p>
              </div>
            </div>
            <div style={styles.benefitItem}>
              <span style={styles.checkmark}>✓</span>
              <div>
                <h4 style={styles.benefitTitle}>Complete Visibility</h4>
                <p style={styles.benefitText}>Know exactly which campaigns are paused and how much you saved.</p>
              </div>
            </div>
            <div style={styles.benefitItem}>
              <span style={styles.checkmark}>✓</span>
              <div>
                <h4 style={styles.benefitTitle}>Works With Your Tools</h4>
                <p style={styles.benefitText}>Syncs with Shopify, Google Ads, Facebook Ads, and more.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING HINT */}
      <section style={styles.pricingSection}>
        <h2 style={styles.sectionTitle}>Simple, Transparent Pricing</h2>
        <div style={styles.pricingGrid}>
          <div style={styles.pricingCard}>
            <h4 style={styles.pricingName}>Starter</h4>
            <p style={styles.pricingPrice}>₹0<span style={styles.pricingPeriod}>/mo first 14 days</span></p>
            <p style={styles.pricingFeature}>• Up to 25 campaigns</p>
            <p style={styles.pricingFeature}>• Basic reports</p>
            <button style={styles.primaryBtn}>Start Free Trial</button>
          </div>
          <div style={{ ...styles.pricingCard, ...styles.pricingCardPopular }}>
            <div style={styles.popularBadge}>Most Popular</div>
            <h4 style={styles.pricingName}>Professional</h4>
            <p style={styles.pricingPrice}>₹999<span style={styles.pricingPeriod}>/mo</span></p>
            <p style={styles.pricingFeature}>• Unlimited campaigns</p>
            <p style={styles.pricingFeature}>• Advanced analytics</p>
            <p style={styles.pricingFeature}>• Priority support</p>
            <button style={{ ...styles.primaryBtn, ...styles.primaryBtnLarge }}>Start Free Trial</button>
          </div>
          <div style={styles.pricingCard}>
            <h4 style={styles.pricingName}>Enterprise</h4>
            <p style={styles.pricingPrice}>Custom</p>
            <p style={styles.pricingFeature}>• Everything in Pro</p>
            <p style={styles.pricingFeature}>• Custom integrations</p>
            <p style={styles.pricingFeature}>• Dedicated support</p>
            <button style={styles.secondaryBtn}>Talk to Sales</button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={styles.finalCta}>
        <div style={styles.finalCtaContent}>
          <h2 style={styles.finalCtaTitle}>Ready To Stop Losing Money?</h2>
          <p style={styles.finalCtaSubtitle}>
            Start protecting your ad budget today. 14 days free. No credit card.
          </p>
          <button style={styles.heroCtaLarge}>
            Start 14 Day Free Trial →
          </button>
          <p style={styles.finalCtaSmall}>
            Most users see ROI within the first week.
          </p>
        </div>
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
