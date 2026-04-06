import React from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "../components/Layout";

function HomeContent() {
  return (
    <section className="landing-hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span>📈 Smart Portfolio Management</span>
          </div>
          <h1 className="hero-title">
            Track Your <span className="gradient-text">Stock Portfolio</span> Like a Pro
          </h1>
          <p className="hero-description">
            Complete investor workspace with real-time portfolio tracking, detailed analytics, 
            and admin dashboard for comprehensive market insights.
          </p>
          <div className="hero-actions">
            <Link to="/auth?mode=signup" className="btn-primary">
              Get Started Free
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/auth?mode=signin" className="btn-secondary">
              Sign In
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Active Investors</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$2.5M</span>
              <span className="stat-label">Portfolio Value</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="portfolio-preview">
            <div className="preview-card">
              <div className="preview-header">
                <span className="preview-title">Portfolio Overview</span>
                <span className="preview-badge">Live</span>
              </div>
              <div className="preview-content">
                <div className="preview-metric">
                  <span className="metric-label">Total Value</span>
                  <span className="metric-value">$45,234.56</span>
                </div>
                <div className="preview-chart">
                  <div className="chart-bar" style={{height: '60%'}}></div>
                  <div className="chart-bar" style={{height: '80%'}}></div>
                  <div className="chart-bar" style={{height: '45%'}}></div>
                  <div className="chart-bar" style={{height: '90%'}}></div>
                  <div className="chart-bar" style={{height: '70%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features for Smart Investors</h2>
            <p className="section-subtitle">Everything you need to manage your investment portfolio efficiently</p>
          </div>
          <div className="features-grid-modern">
            <div className="feature-card-modern">
              <div className="feature-icon">👤</div>
              <h3>Personal Investor Profiles</h3>
              <p>Collect full identity details including country and hobby preferences for personalized experience.</p>
              <div className="feature-features">
                <span className="feature-tag">Profile Management</span>
                <span className="feature-tag">Personalization</span>
              </div>
            </div>
            <div className="feature-card-modern">
              <div className="feature-icon">📊</div>
              <h3>Fast Portfolio Creation</h3>
              <p>Add stock symbol, company, shares, buy price, and notes to build your comprehensive portfolio.</p>
              <div className="feature-features">
                <span className="feature-tag">Quick Entry</span>
                <span className="feature-tag">Real-time Data</span>
              </div>
            </div>
            <div className="feature-card-modern">
              <div className="feature-icon">🔐</div>
              <h3>Shared Login Experience</h3>
              <p>Users and admin sign in from one route, then land on their own protected workspace.</p>
              <div className="feature-features">
                <span className="feature-tag">Secure Access</span>
                <span className="feature-tag">Role-based</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Get started with your portfolio in 3 simple steps</p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p>Sign up with your email and create your investor profile with personal details.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Add Stocks</h3>
              <p>Enter your stock holdings with purchase details and track your investments.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Track & Analyze</h3>
              <p>Monitor your portfolio performance and make informed investment decisions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Take Control of Your Investments?</h2>
            <p>Join thousands of investors who trust our platform for portfolio management.</p>
            <Link to="/auth?mode=signup" className="btn-primary btn-large">
              Start Your Free Account
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

function HomePage() {
  return (
    <PublicLayout>
      <HomeContent />
    </PublicLayout>
  );
}

export { HomeContent };
export default HomePage;
