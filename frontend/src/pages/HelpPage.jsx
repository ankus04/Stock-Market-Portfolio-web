import React from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "../components/Layout";

const helpCards = [
  {
    title: "Getting Started Guide",
    text: "Learn the basics of setting up your account, creating your first portfolio, and understanding key features.",
  },
  {
    title: "Video Tutorials",
    text: "Watch step-by-step video guides covering everything from basic navigation to advanced portfolio management.",
  },
  {
    title: "FAQ Section",
    text: "Find answers to commonly asked questions about account setup, portfolio tracking, and troubleshooting.",
  },
];

function HelpContent() {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-header">
          <div className="page-badge">
            <span>📚 Help Center</span>
          </div>
          <h1 className="page-title">Get the Most Out of Your Portfolio Management</h1>
          <p className="page-description">
            Access comprehensive resources, tutorials, and support to help you master 
            our investment platform and make informed financial decisions.
          </p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">🚀</div>
            <h3>Quick Start</h3>
            <ul className="contact-list">
              <li>Create your investor account</li>
              <li>Set up your personal profile</li>
              <li>Add your first stock portfolio</li>
              <li>Track your investment performance</li>
              <li>Explore advanced features</li>
            </ul>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">📊</div>
            <h3>Portfolio Management</h3>
            <p>Learn how to effectively manage your investment portfolio with our comprehensive tools. 
            Track performance, analyze trends, and make data-driven investment decisions.</p>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Features:</strong> Real-time tracking, analytics, reporting
              </div>
              <div className="contact-item">
                <strong>Support:</strong> 24/7 help documentation
              </div>
              <div className="contact-item">
                <strong>Updates:</strong> Regular feature enhancements
              </div>
            </div>
          </div>
          
          {helpCards.map((card) => (
            <div className="contact-card" key={card.title}>
              <div className="contact-icon">💡</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
        
        <div className="cta-content">
          <h2>Need More Help?</h2>
          <p>Our support team is here to assist you with any questions or issues.</p>
          <Link to="/contact" className="btn-primary btn-large">
            Contact Support
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function HelpPage() {
  return (
    <PublicLayout>
      <HelpContent />
    </PublicLayout>
  );
}

export { HelpContent };
export default HelpPage;
