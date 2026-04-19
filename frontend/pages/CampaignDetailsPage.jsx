// // import { useState, useEffect } from "react";
// // import ProgressBar from "../components/ProgressBar";
// // import { campaignsAPI, MOCK_CAMPAIGNS } from "../api/client";
// // import { useAuth } from "../context/AuthContext";

// // export default function CampaignDetailsPage({ campaignId, navigate }) {
// //   const [campaign, setCampaign] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [pledgeAmount, setPledgeAmount] = useState("");
// //   const [pledged, setPledged] = useState(false);
// //   const { user } = useAuth();

// //   useEffect(() => {
// //     if (!campaignId) { navigate("home"); return; }
// //     campaignsAPI.getById(campaignId)
// //       .then(res => setCampaign(res.data.data))
// //       .catch(() => {
// //         const mock = MOCK_CAMPAIGNS.find(c => c._id === campaignId);
// //         setCampaign(mock || MOCK_CAMPAIGNS[0]);
// //       })
// //       .finally(() => setLoading(false));
// //   }, [campaignId]);

// //   const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
// //   const formatAmt = (n) => n?.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// //   const handlePledge = () => {
// //     if (!user) { navigate("login"); return; }
// //     if (!pledgeAmount || parseFloat(pledgeAmount) <= 0) return;
// //     setPledged(true);
// //   };

// //   if (loading) return (
// //     <div className="detail-loading">
// //       <div className="spinner" />
// //       <p>Loading campaign…</p>
// //     </div>
// //   );

// //   if (!campaign) return (
// //     <div className="not-found container">
// //       <h2>Campaign not found</h2>
// //       <button className="btn-primary" onClick={() => navigate("home")}>Back to home</button>
// //     </div>
// //   );

// //   const pct = Math.min(parseFloat(campaign.fundingPercentage) || 0, 100);
// //   const isOwner = user && campaign.owner && user._id === campaign.owner._id;

// //   return (
// //     <div className="detail-page">
// //       {/* Hero image */}
// //       <div className="detail-hero">
// //         <img src={campaign?.image || MOCK_CAMPAIGNS[0]?.image} alt={campaign.title} className="detail-hero-img" />
// //         <div className="detail-hero-overlay" />
// //         <button className="back-btn" onClick={() => navigate("home")}>
// //           ← Back
// //         </button>
// //       </div>

// //       <div className="container detail-layout">
// //         {/* Main content */}
// //         <div className="detail-main">
// //           <div className="detail-owner-row">
// //             <div className="owner-avatar">{campaign?.owner?.name?.charAt(0) || "?"}</div>
// //             <span>by <strong>{campaign?.owner?.name || "Anonymous"}</strong></span>
// //             {isOwner && <span className="your-campaign-badge">Your Campaign</span>}
// //           </div>
// //           <h1 className="detail-title">{campaign.title}</h1>
// //           <p className="detail-description">{campaign.description}</p>

// //           {/* Long description placeholder */}
// //           <div className="detail-section">
// //             <h3 className="detail-section-title">About this project</h3>
// //             <p className="detail-body-text">
// //               This campaign is pioneering a new approach to solving one of our generation's most pressing challenges.
// //               Our team has spent years developing the technology, building partnerships, and creating a roadmap that
// //               ensures every dollar contributed creates measurable impact.
// //             </p>
// //             <p className="detail-body-text">
// //               With your support, we'll be able to move from prototype to production — scaling our solution to
// //               reach communities that need it most. Every backer becomes part of this movement.
// //             </p>
// //           </div>

// //           <div className="detail-section">
// //             <h3 className="detail-section-title">Milestones</h3>
// //             <div className="milestones">
// //               {[
// //                 { pct: 25, label: "Prototype complete & tested" },
// //                 { pct: 50, label: "First 10 units manufactured" },
// //                 { pct: 75, label: "Pilot program launched in 3 cities" },
// //                 { pct: 100, label: "Full-scale production begins" },
// //               ].map(m => (
// //                 <div key={m.pct} className={`milestone ${pct >= m.pct ? "milestone--done" : ""}`}>
// //                   <div className="milestone-dot">{pct >= m.pct ? "✓" : ""}</div>
// //                   <div className="milestone-info">
// //                     <strong>{m.pct}% — </strong>{m.label}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Sidebar */}
// //         <aside className="detail-sidebar">
// //           <div className="sidebar-card">
// //             {/* Progress */}
// //             <div className="sidebar-progress">
// //               <div className="sidebar-amount">{formatAmt(campaign.raisedAmount)}</div>
// //               <div className="sidebar-goal">raised of {formatAmt(campaign.goalAmount)} goal</div>
// //               <ProgressBar
// //                 percentage={campaign.fundingPercentage}
// //                 raised={campaign.raisedAmount}
// //                 goal={campaign.goalAmount}
// //                 size="lg"
// //               />
// //             </div>

// //             {/* Stats */}
// //             <div className="sidebar-stats">
// //               <div className="s-stat">
// //                 <span className="s-stat-val">{Math.round(campaign.raisedAmount / 120)}</span>
// //                 <span className="s-stat-lbl">Backers</span>
// //               </div>
// //               <div className="s-stat">
// //                 <span className={`s-stat-val ${campaign.daysRemaining <= 7 ? "urgent" : ""}`}>
// //                   {campaign.daysRemaining}
// //                 </span>
// //                 <span className="s-stat-lbl">Days left</span>
// //               </div>
// //             </div>

// //             <div className="sidebar-deadline">
// //               Deadline: <strong>{formatDate(campaign.deadline)}</strong>
// //             </div>

// //             {/* Pledge */}
// //             {!pledged ? (
// //               <div className="pledge-area">
// //                 <div className="pledge-input-wrap">
// //                   <span className="pledge-currency">$</span>
// //                   <input
// //                     type="number"
// //                     className="pledge-input"
// //                     placeholder="Enter amount"
// //                     value={pledgeAmount}
// //                     onChange={e => setPledgeAmount(e.target.value)}
// //                     min="1"
// //                   />
// //                 </div>
// //                 <div className="pledge-suggestions">
// //                   {[25, 50, 100, 250].map(amt => (
// //                     <button key={amt} className="pledge-sug" onClick={() => setPledgeAmount(String(amt))}>
// //                       ${amt}
// //                     </button>
// //                   ))}
// //                 </div>
// //                 <button
// //                   className="btn-primary btn-full"
// //                   onClick={handlePledge}
// //                   disabled={!pledgeAmount || parseFloat(pledgeAmount) <= 0}
// //                 >
// //                   {user ? "Back this campaign" : "Sign in to back"}
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="pledge-success">
// //                 <div className="pledge-success-icon">✓</div>
// //                 <p>Thank you for your pledge of <strong>{formatAmt(parseFloat(pledgeAmount))}</strong>!</p>
// //                 <p className="pledge-success-sub">You're now part of this movement.</p>
// //               </div>
// //             )}

// //             {isOwner && (
// //               <button className="btn-outline btn-full mt-4" onClick={() => navigate("dashboard")}>
// //                 Manage campaign →
// //               </button>
// //             )}
// //           </div>

// //           {/* Share */}
// //           <div className="share-card">
// //             <p className="share-label">Share this campaign</p>
// //             <div className="share-btns">
// //               {["Twitter", "LinkedIn", "Copy link"].map(s => (
// //                 <button key={s} className="share-btn">{s}</button>
// //               ))}
// //             </div>
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState, useEffect } from "react";
// import ProgressBar from "../components/ProgressBar";
// import { campaignsAPI, MOCK_CAMPAIGNS } from "../api/client";
// import { useAuth } from "../context/AuthContext";

// export default function CampaignDetailsPage({ campaignId, navigate }) {
//   const [campaign, setCampaign] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [pledgeAmount, setPledgeAmount] = useState("");
//   const [pledged, setPledged] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (!campaignId) {
//       navigate("home");
//       return;
//     }

//     const fetchCampaign = async () => {
//       try {
//         const res = await campaignsAPI.getById(campaignId);
//         setCampaign(res.data.data);
//       } catch {
//         const mock = MOCK_CAMPAIGNS.find(c => c._id === campaignId);
//         setCampaign(mock || null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCampaign();
//   }, [campaignId]);

//   const formatDate = (d) =>
//     new Date(d).toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });

//   const formatAmt = (n) =>
//     `$${(n || 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

//   // ✅ FIXED CALCULATIONS
//   const raised = campaign?.raisedAmount || 0;
//   const goal = campaign?.goalAmount || 1;
//   const pct = Math.min((raised / goal) * 100, 100);

//   const daysRemaining = campaign?.deadline
//     ? Math.max(
//       Math.ceil(
//         (new Date(campaign.deadline) - new Date()) /
//         (1000 * 60 * 60 * 24)
//       ),
//       0
//     )
//     : 0;

//   const isOwner =
//     user && campaign?.createdBy && user._id === campaign.createdBy._id;

//   const handlePledge = () => {
//     if (!user) {
//       navigate("login");
//       return;
//     }
//     if (!pledgeAmount || parseFloat(pledgeAmount) <= 0) return;
//     setPledged(true);
//   };

//   if (loading)
//     return (
//       <div className="detail-loading">
//         <div className="spinner" />
//         <p>Loading campaign…</p>
//       </div>
//     );

//   if (!campaign)
//     return (
//       <div className="not-found container">
//         <h2>Campaign not found</h2>
//         <button
//           className="btn-primary"
//           onClick={() => navigate("home")}
//         >
//           Back to home
//         </button>
//       </div>
//     );

//   return (
//     <div className="detail-page">
//       {/* HERO */}
//       <div className="detail-hero">
//         <img
//           src={campaign?.image || MOCK_CAMPAIGNS[0]?.image}
//           alt={campaign?.title}
//           className="detail-hero-img"
//         />
//         <div className="detail-hero-overlay" />
//         <button className="back-btn" onClick={() => navigate("home")}>
//           ← Back
//         </button>
//       </div>

//       <div className="container detail-layout">
//         {/* MAIN */}
//         <div className="detail-main">
//           <div className="detail-owner-row">
//             <div className="owner-avatar">
//               {campaign?.createdBy?.name?.charAt(0) || "?"}
//             </div>
//             <span>
//               by <strong>{campaign?.createdBy?.name || "Anonymous"}</strong>
//             </span>
//             {isOwner && (
//               <span className="your-campaign-badge">Your Campaign</span>
//             )}
//           </div>

//           <h1 className="detail-title">{campaign?.title}</h1>

//           {/* ✅ YOUR ORIGINAL DESCRIPTION */}
//           <p className="detail-description">{campaign?.description}</p>

//           {/* ABOUT SECTION (STATIC DESIGN TEXT — KEEP OR REMOVE) */}
//           <div className="detail-section">
//             <h3 className="detail-section-title">About this project</h3>
//             <p className="detail-body-text">
//               {campaign?.description}
//             </p>
//           </div>

//           {/* ✅ MILESTONES */}
//           <div className="detail-section">
//             <h3 className="detail-section-title">Milestones</h3>
//             <div className="milestones">
//               {[25, 50, 75, 100].map((m) => (
//                 <div
//                   key={m}
//                   className={`milestone ${pct >= m ? "milestone--done" : ""
//                     }`}
//                 >
//                   <div className="milestone-dot">
//                     {pct >= m ? "✓" : ""}
//                   </div>
//                   <div className="milestone-info">
//                     <strong>{m}% — </strong>
//                     {m === 25 && "Prototype complete"}
//                     {m === 50 && "Initial rollout"}
//                     {m === 75 && "Expansion phase"}
//                     {m === 100 && "Full launch"}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* SIDEBAR */}
//         <aside className="detail-sidebar">
//           <div className="sidebar-card">
//             <div className="sidebar-progress">
//               <div className="sidebar-amount">
//                 {formatAmt(raised)}
//               </div>
//               <div className="sidebar-goal">
//                 raised of {formatAmt(goal)} goal
//               </div>

//               <ProgressBar
//                 percentage={pct}
//                 raised={raised}
//                 goal={goal}
//                 size="lg"
//               />
//             </div>

//             {/* STATS */}
//             <div className="sidebar-stats">
//               <div className="s-stat">
//                 <span className="s-stat-val">
//                   {Math.round(raised / 120)}
//                 </span>
//                 <span className="s-stat-lbl">Backers</span>
//               </div>

//               <div className="s-stat">
//                 <span
//                   className={`s-stat-val ${daysRemaining <= 7 ? "urgent" : ""
//                     }`}
//                 >
//                   {daysRemaining}
//                 </span>
//                 <span className="s-stat-lbl">Days left</span>
//               </div>
//             </div>

//             <div className="sidebar-deadline">
//               Deadline:{" "}
//               <strong>
//                 {campaign?.deadline
//                   ? formatDate(campaign.deadline)
//                   : "No deadline"}
//               </strong>
//             </div>

//             {/* PLEDGE */}
//             {!pledged ? (
//               <div className="pledge-area">
//                 <div className="pledge-input-wrap">
//                   <span className="pledge-currency">$</span>
//                   <input
//                     type="number"
//                     className="pledge-input"
//                     placeholder="Enter amount"
//                     value={pledgeAmount}
//                     onChange={(e) =>
//                       setPledgeAmount(e.target.value)
//                     }
//                   />
//                 </div>

//                 <div className="pledge-suggestions">
//                   {[25, 50, 100, 250].map((amt) => (
//                     <button
//                       key={amt}
//                       className="pledge-sug"
//                       onClick={() =>
//                         setPledgeAmount(String(amt))
//                       }
//                     >
//                       ${amt}
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   className="btn-primary btn-full"
//                   onClick={handlePledge}
//                 >
//                   {user
//                     ? "Back this campaign"
//                     : "Sign in to back"}
//                 </button>
//               </div>
//             ) : (
//               <div className="pledge-success">
//                 <div className="pledge-success-icon">✓</div>
//                 <p>
//                   Thank you for your pledge of{" "}
//                   <strong>
//                     {formatAmt(parseFloat(pledgeAmount))}
//                   </strong>
//                 </p>
//               </div>
//             )}
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import { campaignsAPI, MOCK_CAMPAIGNS } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function CampaignDetailsPage({ campaignId, navigate }) {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pledgeAmount, setPledgeAmount] = useState("");
  const [pledged, setPledged] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!campaignId) {
      navigate("home");
      return;
    }

    const fetchCampaign = async () => {
      try {
        const res = await campaignsAPI.getById(campaignId);
        setCampaign(res.data.data);
      } catch {
        const mock = MOCK_CAMPAIGNS.find(c => c._id === campaignId);
        setCampaign(mock || null);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const formatAmt = (n) =>
    `$${(n || 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  // ✅ SAFE VALUES
  const raised = campaign?.raisedAmount || 0;
  const goal = campaign?.goalAmount || 0;

  const pct = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;

  const daysRemaining = campaign?.deadline
    ? Math.max(
      Math.ceil(
        (new Date(campaign.deadline) - new Date()) /
        (1000 * 60 * 60 * 24)
      ),
      0
    )
    : 0;

  const isOwner =
    user && campaign?.createdBy && user._id === campaign.createdBy._id;

  const handlePledge = () => {
    if (!user) {
      navigate("login");
      return;
    }
    if (!pledgeAmount || parseFloat(pledgeAmount) <= 0) return;
    setPledged(true);
  };

  // ---------------- LOADING ----------------
  if (loading)
    return (
      <div className="detail-loading">
        <div className="spinner" />
        <p>Loading campaign…</p>
      </div>
    );

  // ---------------- NOT FOUND ----------------
  if (!campaign)
    return (
      <div className="not-found container">
        <h2>Campaign not found</h2>
        <button
          className="btn-primary"
          onClick={() => navigate("home")}
        >
          Back to home
        </button>
      </div>
    );

  return (
    <div className="detail-page">
      {/* HERO */}
      <div className="detail-hero">
        <img
          src={campaign?.image || MOCK_CAMPAIGNS[0]?.image}
          alt={campaign?.title}
          className="detail-hero-img"
        />
        <div className="detail-hero-overlay" />
        <button className="back-btn" onClick={() => navigate("home")}>
          ← Back
        </button>
      </div>

      <div className="container detail-layout">
        {/* MAIN */}
        <div className="detail-main">
          <div className="detail-owner-row">
            <div className="owner-avatar">
              {campaign?.createdBy?.name?.charAt(0) || "?"}
            </div>
            <span>
              by{" "}
              <strong>
                {campaign?.createdBy?.name || "Anonymous"}
              </strong>
            </span>

            {isOwner && (
              <span className="your-campaign-badge">
                Your Campaign
              </span>
            )}
          </div>

          <h1 className="detail-title">{campaign?.title}</h1>

          {/* ✅ YOUR DESCRIPTION */}
          <p className="detail-description">
            {campaign?.description || "No description provided."}
          </p>

          {/* ABOUT */}
          <div className="detail-section">
            <h3 className="detail-section-title">
              About this project
            </h3>
            <p className="detail-body-text">
              {campaign?.description || "No details available."}
            </p>
          </div>

          {/* MILESTONES */}
          <div className="detail-section">
            <h3 className="detail-section-title">Milestones</h3>
            <div className="milestones">
              {[25, 50, 75, 100].map((m) => (
                <div
                  key={m}
                  className={`milestone ${pct >= m ? "milestone--done" : ""
                    }`}
                >
                  <div className="milestone-dot">
                    {pct >= m ? "✓" : ""}
                  </div>

                  <div className="milestone-info">
                    <strong>{m}% — </strong>
                    {m === 25 && "Prototype complete"}
                    {m === 50 && "Initial rollout"}
                    {m === 75 && "Expansion phase"}
                    {m === 100 && "Full launch"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="detail-sidebar">
          <div className="sidebar-card">
            {/* PROGRESS */}
            <div className="sidebar-progress">
              <div className="sidebar-amount">
                {formatAmt(raised)}
              </div>

              <div className="sidebar-goal">
                raised of {formatAmt(goal)} goal
              </div>

              <ProgressBar
                percentage={pct}
                raised={raised}
                goal={goal}
                size="lg"
              />
            </div>

            {/* STATS */}
            <div className="sidebar-stats">
              <div className="s-stat">
                <span className="s-stat-val">
                  {Math.round(raised / 120)}
                </span>
                <span className="s-stat-lbl">Backers</span>
              </div>

              <div className="s-stat">
                <span
                  className={`s-stat-val ${daysRemaining <= 7 ? "urgent" : ""
                    }`}
                >
                  {daysRemaining}
                </span>
                <span className="s-stat-lbl">Days left</span>
              </div>
            </div>

            {/* DEADLINE */}
            <div className="sidebar-deadline">
              Deadline:{" "}
              <strong>
                {campaign?.deadline
                  ? formatDate(campaign.deadline)
                  : "No deadline set"}
              </strong>
            </div>

            {/* PLEDGE */}
            {!pledged ? (
              <div className="pledge-area">
                <div className="pledge-input-wrap">
                  <span className="pledge-currency">$</span>

                  <input
                    type="number"
                    className="pledge-input"
                    placeholder="Enter amount"
                    value={pledgeAmount}
                    onChange={(e) =>
                      setPledgeAmount(e.target.value)
                    }
                  />
                </div>

                <div className="pledge-suggestions">
                  {[25, 50, 100, 250].map((amt) => (
                    <button
                      key={amt}
                      className="pledge-sug"
                      onClick={() =>
                        setPledgeAmount(String(amt))
                      }
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <button
                  className="btn-primary btn-full"
                  onClick={handlePledge}
                >
                  {user
                    ? "Back this campaign"
                    : "Sign in to back"}
                </button>
              </div>
            ) : (
              <div className="pledge-success">
                <div className="pledge-success-icon">✓</div>

                <p>
                  Thank you for your pledge of{" "}
                  <strong>
                    {formatAmt(parseFloat(pledgeAmount))}
                  </strong>
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}