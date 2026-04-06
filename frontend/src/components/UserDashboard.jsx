import React, { useState } from "react";

function UserDashboard({ user, portfolios, onLogout, onCreatePortfolio, onDeletePortfolio, onDeleteAccount }) {
  const [form, setForm] = useState({
    stockSymbol: "",
    companyName: "",
    shares: "",
    buyPrice: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreatePortfolio(form);
    setForm({
      stockSymbol: "",
      companyName: "",
      shares: "",
      buyPrice: "",
      notes: "",
    });
  };

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            Manage your stock portfolio and track your investments
          </p>
        </div>
      </header>

      <div className="user-profile-card">
        <div className="profile-grid">
          <div className="profile-item">
            <span className="profile-label">Full Name</span>
            <span className="profile-value">{user?.fullName || "N/A"}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user?.email || "N/A"}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Country</span>
            <span className="profile-value">{user?.country || "N/A"}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Hobby</span>
            <span className="profile-value">{user?.hobby || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Account Management Section - Only for normal users */}
      {user?.role !== "admin" && (
        <div className="account-management-card">
          <div className="account-management-header">
            <h3>Account Management</h3>
            <p>Manage your account settings</p>
          </div>
          <div className="account-actions">
            <button
              className="danger-btn delete-account-btn"
              onClick={onDeleteAccount}
            >
              Delete Account
            </button>
            <p className="delete-warning">
              This action cannot be undone. You will be asked to enter your password for confirmation. All your portfolios and data will be permanently deleted.
            </p>
          </div>
        </div>
      )}

      <main className="dashboard-main">
        <section className="dashboard-overview">
          <div className="stats-grid">
            <div className="stat-card">
              <strong>{portfolios.length}</strong>
              <span>Total Stocks</span>
            </div>
            <div className="stat-card">
              <strong>
                ${portfolios
                  .reduce(
                    (total, p) => total + (p.shares * p.buyPrice || 0),
                    0
                  )
                  .toFixed(2)}
              </strong>
              <span>Total Investment</span>
            </div>
            <div className="stat-card">
              <strong>
                ${portfolios.length > 0
                  ? (portfolios.reduce(
                      (total, p) => total + (p.shares * p.buyPrice || 0),
                      0
                    ) / portfolios.length
                  ).toFixed(2)
                  : "0.00"}
              </strong>
              <span>Avg. Investment</span>
            </div>
          </div>
        </section>

        <section className="portfolio-section">
          <div className="section-header">
            <h2>Add New Stock</h2>
          </div>
          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              Stock Symbol
              <input
                value={form.stockSymbol}
                onChange={(e) => setForm({ ...form, stockSymbol: e.target.value })}
                placeholder="e.g., AAPL"
                required
              />
            </label>
            <label>
              Company Name
              <input
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                placeholder="e.g., Apple Inc."
                required
              />
            </label>
            <label>
              Number of Shares
              <input
                type="number"
                value={form.shares}
                onChange={(e) => setForm({ ...form, shares: e.target.value })}
                placeholder="e.g., 100"
                required
              />
            </label>
            <label>
              Buy Price per Share
              <input
                type="number"
                step="0.01"
                value={form.buyPrice}
                onChange={(e) => setForm({ ...form, buyPrice: e.target.value })}
                placeholder="e.g., 150.00"
                required
              />
            </label>
            <label>
              Notes
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Optional notes about this investment"
              />
            </label>
            <button className="primary-btn" type="submit">
              Add Stock
            </button>
          </form>
        </section>

        <section className="portfolio-list-section">
          <div className="section-header">
            <h2>Your Portfolio</h2>
          </div>
          {portfolios.length === 0 ? (
            <div className="empty-state">
              <p>No stocks in your portfolio yet. Add your first stock above!</p>
            </div>
          ) : (
            <div className="portfolio-list">
              {portfolios.map((portfolio) => (
                <div className="portfolio-item" key={portfolio._id}>
                  <div className="portfolio-info">
                    <h4>
                      {portfolio.stockSymbol} - {portfolio.companyName}
                    </h4>
                    <p>
                      <strong>Shares:</strong> {portfolio.shares} |{" "}
                      <strong>Buy Price:</strong> ${portfolio.buyPrice} |{" "}
                      <strong>Total Value:</strong> $
                      {(portfolio.shares * portfolio.buyPrice).toFixed(2)}
                    </p>
                    {portfolio.notes && <p>{portfolio.notes}</p>}
                  </div>
                  <button
                    className="danger-btn"
                    onClick={() => onDeletePortfolio(portfolio._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default UserDashboard;
