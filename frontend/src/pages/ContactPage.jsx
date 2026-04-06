import React from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "../components/Layout";

const contactCards = [
  {
    title: "API Integration",
    text: "Connect your portfolio with real-time market data feeds and trading APIs for automated tracking.",
  },
  {
    title: "Mobile App",
    text: "Access your portfolio on the go with our native mobile applications for iOS and Android.",
  },
  {
    title: "Advanced Analytics",
    text: "Deep dive into your investment performance with comprehensive analytics and reporting tools.",
  },
];

function ContactContent() {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-header">
          <div className="page-badge">
            <span>💬 Get in Touch</span>
          </div>
          <h1 className="page-title">Talk to the Team Behind Your Investing Workspace</h1>
          <p className="page-description">
            Reach out for onboarding support, admin setup questions, feature requests, 
            or help with portfolio workflows. We're here to help you succeed.
          </p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <h3>Support Channels</h3>
            <p>Email support for account issues, dashboard questions, and access requests.</p>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Email:</strong> umashankar19249@gmail.com
              </div>
              <div className="contact-item">
                <strong>Business Hours:</strong> Monday to Friday, 9:00 AM to 6:00 PM
              </div>
              <div className="contact-item">
                <strong>Response Goal:</strong> Within one business day
              </div>
            </div>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">🎯</div>
            <h3>Why People Contact Us</h3>
            <ul className="contact-list">
              <li>New investor onboarding</li>
              <li>Portfolio data clarification</li>
              <li>Admin visibility and reporting help</li>
              <li>Feature requests and feedback</li>
              <li>Technical support and troubleshooting</li>
            </ul>
          </div>
          
          {contactCards.map((card) => (
            <div className="contact-card" key={card.title}>
              <div className="contact-icon">🚀</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <PublicLayout>
      <ContactContent />
    </PublicLayout>
  );
}

export { ContactContent };
export default ContactPage;
