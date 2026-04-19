import { useState } from "react";
import { campaignsAPI } from "../api/client";
import { useAuth } from "../context/AuthContext";

const STEPS = ["Basics", "Story", "Goals", "Review"];

export default function CreateCampaignPage({ navigate }) {
  const { user, token } = useAuth();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    goalAmount: "",
    deadline: "",
    image: "",
    category: "",
  });

  if (!user) return (
    <div className="auth-gate container">
      <div className="auth-gate-card">
        <span className="auth-gate-icon">◈</span>
        <h2>Sign in to launch a campaign</h2>
        <p>Create your free account and bring your idea to life.</p>
        <div className="auth-gate-btns">
          <button className="btn-primary" onClick={() => navigate("login")}>Sign in</button>
          <button className="btn-ghost" onClick={() => navigate("home")}>Browse campaigns</button>
        </div>
      </div>
    </div>
  );

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const validate = () => {
    if (step === 0 && !form.title.trim()) return "Title is required.";
    if (step === 1 && form.description.length < 20) return "Description must be at least 20 characters.";
    if (step === 2 && (!form.goalAmount || parseFloat(form.goalAmount) < 100)) return "Goal must be at least $100.";
    if (step === 2 && !form.deadline) return "Deadline is required.";
    if (step === 2 && new Date(form.deadline) <= new Date()) return "Deadline must be in the future.";
    return "";
  };

  const nextStep = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await campaignsAPI.create({
        title: form.title,
        description: form.description,
        goalAmount: parseFloat(form.goalAmount),
        deadline: form.deadline,
        image: form.image,
      }, token);
      setSuccess(true);
    } catch (e) {
      setError(e.message || "Failed to create campaign.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) return (
    <div className="success-screen container">
      <div className="success-card">
        <div className="success-icon-wrap">
          <span className="success-icon">✓</span>
        </div>
        <h2>Campaign launched!</h2>
        <p>Your campaign is now live and accepting backers.</p>
        <div className="success-btns">
          <button className="btn-primary" onClick={() => navigate("dashboard")}>Go to dashboard</button>
          <button className="btn-ghost" onClick={() => navigate("home")}>Explore campaigns</button>
        </div>
      </div>
    </div>
  );

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  const pct = Math.round(((form.goalAmount || 0) / 100000) * 100);

  return (
    <div className="create-page">
      <div className="container">
        <div className="create-header">
          <h1 className="create-title">Launch your campaign</h1>
          <p className="create-sub">Bring your idea to the world in minutes.</p>
        </div>

        {/* Step indicators */}
        <div className="steps-row">
          {STEPS.map((s, i) => (
            <div key={s} className={`step-item ${i === step ? "step-item--active" : ""} ${i < step ? "step-item--done" : ""}`}>
              <div className="step-num">{i < step ? "✓" : i + 1}</div>
              <span className="step-label">{s}</span>
              {i < STEPS.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>

        <div className="create-layout">
          {/* Form */}
          <div className="create-form-card">
            {error && <div className="form-error">{error}</div>}

            {step === 0 && (
              <div className="form-step">
                <h2 className="form-step-title">What's your campaign about?</h2>
                <div className="form-group">
                  <label className="form-label">Campaign title <span className="required">*</span></label>
                  <input
                    className="form-input"
                    placeholder="e.g. Solar-powered water purification for rural villages"
                    value={form.title}
                    onChange={e => update("title", e.target.value)}
                    maxLength={100}
                  />
                  <span className="char-count">{form.title.length}/100</span>
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={form.category} onChange={e => update("category", e.target.value)}>
                    <option value="">Select a category</option>
                    {["Technology", "Environment", "Health", "Arts", "Community", "Education"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Cover image URL</label>
                  <input
                    className="form-input"
                    placeholder="https://example.com/image.jpg"
                    value={form.image}
                    onChange={e => update("image", e.target.value)}
                  />
                  {form.image && (
                    <div className="image-preview">
                      <img src={form.image} alt="preview" onError={e => e.target.style.display = "none"} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="form-step">
                <h2 className="form-step-title">Tell your story</h2>
                <div className="form-group">
                  <label className="form-label">Campaign description <span className="required">*</span></label>
                  <textarea
                    className="form-textarea"
                    placeholder="Describe your project, why it matters, and how you'll use the funds. The more compelling your story, the more backers you'll attract."
                    value={form.description}
                    onChange={e => update("description", e.target.value)}
                    rows={10}
                    maxLength={2000}
                  />
                  <span className="char-count">{form.description.length}/2000</span>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <h2 className="form-step-title">Set your goal</h2>
                <div className="form-group">
                  <label className="form-label">Funding goal (USD) <span className="required">*</span></label>
                  <div className="input-prefix-wrap">
                    <span className="input-prefix">$</span>
                    <input
                      className="form-input input-prefixed"
                      type="number"
                      placeholder="10000"
                      value={form.goalAmount}
                      onChange={e => update("goalAmount", e.target.value)}
                      min={100}
                    />
                  </div>
                  {form.goalAmount > 0 && (
                    <div className="goal-preview">
                      <div className="goal-preview-track">
                        <div className="goal-preview-fill" style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                      <p className="goal-preview-label">
                        ${parseFloat(form.goalAmount).toLocaleString()} goal
                      </p>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Campaign deadline <span className="required">*</span></label>
                  <input
                    className="form-input"
                    type="date"
                    min={minDateStr}
                    value={form.deadline}
                    onChange={e => update("deadline", e.target.value)}
                  />
                  {form.deadline && (
                    <p className="deadline-helper">
                      {Math.ceil((new Date(form.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days to raise funds
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step">
                <h2 className="form-step-title">Review & launch</h2>
                <div className="review-list">
                  {[
                    { label: "Title", val: form.title },
                    { label: "Category", val: form.category || "Not set" },
                    { label: "Goal", val: form.goalAmount ? `$${parseFloat(form.goalAmount).toLocaleString()}` : "—" },
                    { label: "Deadline", val: form.deadline || "—" },
                    { label: "Description", val: form.description ? `${form.description.slice(0, 80)}…` : "—" },
                  ].map(({ label, val }) => (
                    <div key={label} className="review-row">
                      <span className="review-label">{label}</span>
                      <span className="review-val">{val}</span>
                    </div>
                  ))}
                </div>
                {form.image && (
                  <div className="review-image">
                    <img src={form.image} alt="Campaign cover" />
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="form-nav">
              {step > 0 && (
                <button className="btn-ghost" onClick={() => { setError(""); setStep(s => s - 1); }}>
                  ← Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button className="btn-primary" onClick={nextStep}>
                  Continue →
                </button>
              ) : (
                <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Launching…" : "Launch campaign 🚀"}
                </button>
              )}
            </div>
          </div>

          {/* Tips sidebar */}
          <div className="create-tips">
            <h3 className="tips-title">Tips for success</h3>
            {[
              { icon: "◎", title: "Be specific", body: "Clear, specific goals convert 3× better than vague ones." },
              { icon: "◈", title: "Show, don't tell", body: "Add a compelling cover image or video to boost engagement." },
              { icon: "◉", title: "Set realistic goals", body: "Campaigns that hit 30% in the first 48h are 90% likely to succeed." },
              { icon: "◍", title: "Update often", body: "Active campaigns get 40% more organic traffic from the platform." },
            ].map(tip => (
              <div key={tip.title} className="tip-card">
                <span className="tip-icon">{tip.icon}</span>
                <div>
                  <strong>{tip.title}</strong>
                  <p>{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
