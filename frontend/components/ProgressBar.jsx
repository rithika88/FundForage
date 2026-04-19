export default function ProgressBar({ percentage, raised, goal, size = "md" }) {
  const pct = Math.min(parseFloat(percentage) || 0, 100);
  const isComplete = pct >= 100;

  const formatAmount = (n) => {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n}`;
  };

  return (
    <div className={`progress-wrap progress-wrap--${size}`}>
      {size !== "sm" && (
        <div className="progress-labels">
          <span className="progress-raised">{formatAmount(raised)}</span>
          <span className="progress-goal">of {formatAmount(goal)}</span>
        </div>
      )}
      <div className="progress-track">
        <div
          className={`progress-fill ${isComplete ? "progress-fill--complete" : ""}`}
          style={{ width: `${pct}%` }}
        >
          <span className="progress-glow"></span>
        </div>
      </div>
      <div className="progress-pct">{pct.toFixed(0)}% funded</div>
    </div>
  );
}
