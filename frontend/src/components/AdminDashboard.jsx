import React from "react";

function AdminDashboard({ admin, users, selectedUser, selectedUserPortfolios, onSelectUser, onLogout }) {
  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <h1 className="dashboard-title">
            Admin Dashboard - {admin?.fullName || admin?.username}
          </h1>
          <p className="dashboard-subtitle">
            Manage users and view all portfolios
          </p>
        </div>
        <button className="nav-logout-btn" type="button" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-overview">
          <div className="stats-grid">
            <div className="stat-card">
              <strong>{users.length}</strong>
              <span>Total Users</span>
            </div>
            <div className="stat-card">
              <strong>
                {users.reduce((total, user) => total + (user.portfolioCount || 0), 0)}
              </strong>
              <span>Total Portfolios</span>
            </div>
            <div className="stat-card">
              <strong>
                ${selectedUserPortfolios
                  .reduce(
                    (total, p) => total + (p.shares * p.buyPrice || 0),
                    0
                  )
                  .toFixed(2)}
              </strong>
              <span>Selected User Value</span>
            </div>
          </div>
        </section>

        <section className="users-section">
          <div className="section-header">
            <h2>All Users</h2>
          </div>
          <div className="user-list">
            {users.map((user) => (
              <div
                className={`user-card ${selectedUser?.id === user._id ? "selected" : ""}`}
                key={user._id}
                onClick={() => onSelectUser(user._id)}
              >
                <h4>{user.fullName}</h4>
                <p>
                  <strong>Username:</strong> {user.username} |{" "}
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Country:</strong> {user.country} |{" "}
                  <strong>Hobby:</strong> {user.hobby}
                </p>
                <p>
                  <strong>Portfolio Items:</strong> {user.portfolioCount || 0}
                </p>
              </div>
            ))}
          </div>
        </section>

        {selectedUser && (
          <section className="selected-user-section">
            <div className="section-header">
              <h2>
                {selectedUser.fullName}'s Portfolio ({selectedUserPortfolios.length} items)
              </h2>
            </div>
            {selectedUserPortfolios.length === 0 ? (
              <div className="empty-state">
                <p>No portfolio items for this user.</p>
              </div>
            ) : (
              <div className="portfolio-list">
                {selectedUserPortfolios.map((portfolio) => (
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
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
