import React from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "../components/Layout";

const careerCards = [
  {
    title: "Frontend Developer",
    text: "Join our team to build beautiful, responsive user interfaces using React and modern CSS frameworks.",
  },
  {
    title: "Backend Developer",
    text: "Help us scale our API infrastructure and build robust backend systems using Node.js and MongoDB.",
  },
  {
    title: "Product Designer",
    text: "Design intuitive user experiences and create stunning visual designs for our investment platform.",
  },
];

function CareerContent() {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-header">
          <div className="page-badge">
            <span>💼 Join Our Team</span>
          </div>
          <h1 className="page-title">Build Your Career with a Growing FinTech Company</h1>
          <p className="page-description">
            We're looking for talented individuals who are passionate about revolutionizing 
            investment management through technology. Join us in building the future of portfolio tracking.
          </p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">🎯</div>
            <h3>Why Work With Us</h3>
            <ul className="contact-list">
              <li>Competitive salary and equity packages</li>
              <li>Flexible work arrangements</li>
              <li>Professional development opportunities</li>
              <li>Collaborative and innovative environment</li>
              <li>Make a real impact in the fintech space</li>
            </ul>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">🌟</div>
            <h3>Our Culture</h3>
            <p>We foster a culture of innovation, continuous learning, and mutual respect. 
            Our team is passionate about technology and committed to excellence.</p>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Team Size:</strong> 15-20 passionate professionals
              </div>
              <div className="contact-item">
                <strong>Growth:</strong> Rapidly expanding with new opportunities
              </div>
              <div className="contact-item">
                <strong>Location:</strong> Remote-friendly with occasional meetups
              </div>
            </div>
          </div>
          
          {careerCards.map((card) => (
            <div className="contact-card" key={card.title}>
              <div className="contact-icon">🚀</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
        
        <div className="cta-content">
          <h2>Ready to Join Our Team?</h2>
          <p>Send your resume and portfolio to careers@stockportfolio.com</p>
          <Link to="/contact" className="btn-primary btn-large">
            Contact Us
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CareerPage() {
  return (
    <PublicLayout>
      <CareerContent />
    </PublicLayout>
  );
}

export { CareerContent };
export default CareerPage;
