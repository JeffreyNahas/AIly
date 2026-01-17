import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Home.css';

function Home() {
  const { user } = useAuth0();

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to PersonalCFO</h1>
        <p className="subtitle">Your financial management dashboard</p>
      </div>

      <div className="home-content">
        <div className="placeholder-section">
          <div className="placeholder-card">
            <div className="placeholder-icon">📊</div>
            <h3>Analytics Coming Soon</h3>
            <p>View your financial insights and trends here</p>
          </div>

          <div className="placeholder-card">
            <div className="placeholder-icon">💰</div>
            <h3>Revenue Tracking</h3>
            <p>Monitor your income and expenses</p>
          </div>

          <div className="placeholder-card">
            <div className="placeholder-icon">📈</div>
            <h3>Growth Metrics</h3>
            <p>Track your business growth over time</p>
          </div>

          <div className="placeholder-card">
            <div className="placeholder-icon">🎯</div>
            <h3>Goals & Targets</h3>
            <p>Set and achieve your financial goals</p>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn primary">
              <span className="btn-icon">➕</span>
              Create Invoice
            </button>
            <button className="action-btn secondary">
              <span className="btn-icon">👤</span>
              Add Client
            </button>
            <button className="action-btn secondary">
              <span className="btn-icon">🔧</span>
              New Job
            </button>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-placeholder">
            <p>📭 No recent activity</p>
            <span className="placeholder-text">Your recent transactions and updates will appear here</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
