import { useState, useEffect } from "react";
import { campaignsAPI, MOCK_CAMPAIGNS } from "../api/client";
import ProgressBar from "../components/ProgressBar";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage({ navigate }) {
  const { user, token } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (!user) { navigate("login"); return; }
    campaignsAPI.getAll({ limit: 50 })
      .then(data => {
        const mine = data.data.campaigns.filter(c => c.owner?._id === user._id);
        setCampaigns(mine.length ? mine : MOCK_CAMPAIGNS.slice(0, 3));
      })
      .catch(() => setCampaigns(MOCK_CAMPAIGNS.slice(0, 3)))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this campaign? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await campaignsAPI.delete(token, id);
      setCampaigns(cs => cs.filter(c => c._id !== id));
    } catch {
      alert("Failed to delete campaign.");
    } finally {
      setDeleting(null);
    }
  };

  const totalRaised = campaigns.reduce((s, c) => s + c.raisedAmount, 0);
  const totalGoal = campaigns.reduce((s, c) => s + c.goalAmount, 0);
  const avgPct = campaigns.length
    ? campaigns.reduce((s, c) => s + parseFloat(c.fundingPercentage || 0), 0) / campaigns.length
    : 0;

  if (!user) return null;

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="dash-header">
          <div className="dash-welcome">
            <div className="dash-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div>
              <h1 className="dash-title">Welcome back, {user.name.split(" ")[0]}.</h1>
              <p className="dash-sub">{user.email}</p>
            </div>
          </div>
          <button className="btn-primary" onClick={() => navigate("create")}>
            + New campaign
          </button>
        </div>

        {/* Summary stats */}
        <div className="dash-stats">
          {[
            { label: "Total campaigns", value: campaigns.length, icon: "◈" },
            { label: "Total raised", value: `$${totalRaised.toLocaleString()}`, icon: "◉" },
            { label: "Total goal", value: `$${totalGoal.toLocaleString()}`, icon: "◎" },
            { label: "Avg. funded", value: `${avgPct.toFixed(0)}%`, icon: "◍" },
          ].map(stat => (
            <div key={stat.label} className="dash-stat-card">
              <div className="dash-stat-icon">{stat.icon}</div>
              <div className="dash-stat-value">{stat.value}</div>
              <div className="dash-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Campaigns table */}
        <div className="dash-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">Your campaigns</h2>
            <span className="dash-count">{campaigns.length} active</span>
          </div>

          {loading ? (
            <div className="dash-loading">
              {[...Array(3)].map((_, i) => <div key={i} className="skeleton-row" />)}
            </div>
          ) : campaigns.length === 0 ? (
            <div className="dash-empty">
              <span className="dash-empty-icon">◌</span>
              <p>No campaigns yet. Launch your first one!</p>
              <button className="btn-primary" onClick={() => navigate("create")}>Create campaign</button>
            </div>
          ) : (
            <div className="dash-campaigns">
              {campaigns.map(c => {
                const pct = parseFloat(c.fundingPercentage || 0);
                const isUrgent = c.daysRemaining <= 7;
                return (
                  <div key={c._id} className="dash-campaign-row">
                    <div className="dcr-image-wrap">
                      <img
                        src={c.image || MOCK_CAMPAIGNS[0].image}
                        alt={c.title}
                        className="dcr-image"
                      />
                    </div>
                    <div className="dcr-main">
                      <div className="dcr-title-row">
                        <h3 className="dcr-title" onClick={() => navigate("campaign-details", c._id)}>
                          {c.title}
                        </h3>
                        <span className={`dcr-status ${c.status === "active" ? "status--active" : "status--other"}`}>
                          {c.status}
                        </span>
                      </div>
                      <div className="dcr-progress">
                        <ProgressBar
                          percentage={c.fundingPercentage}
                          raised={c.raisedAmount}
                          goal={c.goalAmount}
                          size="sm"
                        />
                      </div>
                      <div className="dcr-meta">
                        <span>${c.raisedAmount.toLocaleString()} raised</span>
                        <span className="meta-dot">·</span>
                        <span>{pct.toFixed(0)}% of ${c.goalAmount.toLocaleString()}</span>
                        <span className="meta-dot">·</span>
                        <span className={isUrgent ? "urgent-text" : ""}>{c.daysRemaining} days left</span>
                      </div>
                    </div>
                    <div className="dcr-actions">
                      <button
                        className="dcr-action-btn"
                        onClick={() => navigate("campaign-details", c._id)}
                        title="View"
                      >
                        ↗
                      </button>
                      <button
                        className="dcr-action-btn dcr-action-btn--danger"
                        onClick={() => handleDelete(c._id)}
                        disabled={deleting === c._id}
                        title="Delete"
                      >
                        {deleting === c._id ? "…" : "✕"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Activity feed placeholder */}
        <div className="dash-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">Recent activity</h2>
          </div>
          <div className="activity-feed">
            {[
              { icon: "◉", msg: "New backer contributed $150 to Vertical Urban Farm Network", time: "2h ago" },
              { icon: "◈", msg: "Your campaign reached 70% of its goal", time: "1d ago" },
              { icon: "◎", msg: "5 new backers joined this week", time: "3d ago" },
            ].map((a, i) => (
              <div key={i} className="activity-item">
                <span className="activity-icon">{a.icon}</span>
                <div className="activity-content">
                  <p>{a.msg}</p>
                  <span className="activity-time">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
