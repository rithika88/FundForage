import ProgressBar from "./ProgressBar";

export default function CampaignCard({ campaign, navigate, featured = false }) {
  const {
    _id,
    title,
    description,
    goalAmount,
    raisedAmount,
    daysRemaining,
    image,
    owner,
  } = campaign;

  // 🔥 SAFE VALUES
  const raised = raisedAmount || 0;
  const goal = goalAmount || 1;
  const percent = Math.min((raised / goal) * 100, 100);

  const isUrgent = daysRemaining <= 7 && daysRemaining > 0;
  const isComplete = percent >= 100;

  return (
    <article
      className={`campaign-card ${featured ? "campaign-card--featured" : ""
        }`}
      onClick={() => navigate("campaign-details", _id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        e.key === "Enter" && navigate("campaign-details", _id)
      }
    >
      {/* Image */}
      <div className="card-image-wrap">
        <img
          src={
            image ||
            `https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80`
          }
          alt={title}
          className="card-image"
          loading="lazy"
        />
        <div className="card-image-overlay" />

        <div className="card-badges">
          {isComplete && (
            <span className="badge badge--success">✓ Funded</span>
          )}

          {isUrgent && !isComplete && (
            <span className="badge badge--urgent">
              ⚡ {daysRemaining}d left
            </span>
          )}

          {!isUrgent && !isComplete && daysRemaining > 0 && (
            <span className="badge badge--neutral">
              {daysRemaining} days left
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="card-body">
        <p className="card-owner">
          by {owner?.name || "Anonymous"}
        </p>

        <h3 className="card-title">{title}</h3>

        <p className="card-desc">{description}</p>

        {/* Progress */}
        <div className="card-progress">
          <ProgressBar
            percentage={percent}
            raised={raised}
            goal={goal}
            size="sm"
          />
        </div>

        {/* Stats */}
        <div className="card-stats">
          <div className="stat">
            <span className="stat-value">
              ${raised.toLocaleString()}
            </span>
            <span className="stat-label">raised</span>
          </div>

          <div className="stat-divider" />

          <div className="stat">
            <span className="stat-value">
              {percent.toFixed(0)}%
            </span>
            <span className="stat-label">funded</span>
          </div>

          <div className="stat-divider" />

          <div className="stat">
            <span
              className={`stat-value ${isUrgent ? "stat-value--urgent" : ""
                }`}
            >
              {daysRemaining}
            </span>
            <span className="stat-label">days left</span>
          </div>
        </div>
      </div>
    </article>
  );
}