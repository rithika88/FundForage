// import { useState, useEffect } from "react";
// import CampaignCard from "../components/CampaignCard";
// import { campaignsAPI, MOCK_CAMPAIGNS } from "../api/client";

// const CATEGORIES = ["All", "Technology", "Environment", "Health", "Arts", "Community", "Education"];

// export default function HomePage({ navigate }) {
//   const [campaigns, setCampaigns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [sortBy, setSortBy] = useState("-createdAt");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await campaignsAPI.getAll({
//           limit: 20,
//           status: "active",
//         });

//         setCampaigns(res?.data?.data?.campaigns || []);
//       } catch (err) {
//         console.error("Error fetching campaigns:", err);
//         setCampaigns(MOCK_CAMPAIGNS || []);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

// // 🔍 FILTER (search + category)
// const filtered = (campaigns || [])
//   .filter((c) =>
//     c.title?.toLowerCase().includes(search.toLowerCase()) ||
//     c.description?.toLowerCase().includes(search.toLowerCase())
//   )
//   .filter((c) =>
//     activeCategory === "All"
//       ? true
//       : (c.category || "All") === activeCategory
//   );

// // 🔽 SORTING
// const sorted = [...filtered].sort((a, b) => {
//   if (sortBy === "-createdAt") {
//     return new Date(b.createdAt) - new Date(a.createdAt);
//   }

//   if (sortBy === "-raisedAmount") {
//     return (b.raisedAmount || 0) - (a.raisedAmount || 0);
//   }

//   if (sortBy === "deadline") {
//     return new Date(a.deadline) - new Date(b.deadline);
//   }

//   return 0;
// });

//   // 📊 STATS (safe)
//   const stats = {
//     total: campaigns?.length || 0,
//     raised: (campaigns || []).reduce(
//       (sum, c) => sum + (c.raisedAmount || 0),
//       0
//     ),
//     backers: (campaigns?.length || 0) * 47,
//   };

//   return (
//     <div className="home-page">
//       {/* HERO */}
//       <section className="hero">
//         <div className="hero-bg">
//           <div className="hero-orb hero-orb--1" />
//           <div className="hero-orb hero-orb--2" />
//           <div className="hero-grid" />
//         </div>

//         <div className="container hero-content">
//           <div className="hero-eyebrow">
//             <span className="eyebrow-dot" />
//             Community-powered funding
//           </div>

//           <h1 className="hero-title">
//             Bold ideas deserve
//             <br />
//             <em className="hero-title-em">bold backing.</em>
//           </h1>

//           <p className="hero-subtitle">
//             Discover campaigns that are reshaping the world.
//           </p>

//           <div className="hero-actions">
//             <button
//               className="btn-primary btn-lg"
//               onClick={() => navigate("create")}
//             >
//               Launch your campaign
//             </button>

//             <button
//               className="btn-outline btn-lg"
//               onClick={() =>
//                 document
//                   .getElementById("campaigns")
//                   ?.scrollIntoView({ behavior: "smooth" })
//               }
//             >
//               Explore projects
//             </button>
//           </div>

//           {/* STATS */}
//           <div className="hero-stats">
//             <div className="hero-stat">
//               <span className="hero-stat-value">
//                 ${(stats.raised / 1000).toFixed(0)}K+
//               </span>
//               <span className="hero-stat-label">Total raised</span>
//             </div>

//             <div className="hero-stat-sep" />

//             <div className="hero-stat">
//               <span className="hero-stat-value">{stats.total}</span>
//               <span className="hero-stat-label">Live campaigns</span>
//             </div>

//             <div className="hero-stat-sep" />

//             <div className="hero-stat">
//               <span className="hero-stat-value">
//                 {stats.backers.toLocaleString()}+
//               </span>
//               <span className="hero-stat-label">Backers worldwide</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* LIVE CAMPAIGNS */}
//       <section className="campaigns-section container" id="campaigns">
//         <div className="section-header">
//           <h2 className="section-title">Live Campaigns</h2>

//           <div className="search-wrap">
//             <span className="search-icon">⌕</span>
//             <input
//               className="search-input"
//               placeholder="Search campaigns…"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* FILTERS */}
//         <div className="filter-row">
//           <div className="category-pills">
//             {CATEGORIES.map((cat) => (
//               <button
//                 key={cat}
//                 className={`pill ${activeCategory === cat ? "pill--active" : ""
//                   }`}
//                 onClick={() => setActiveCategory(cat)}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           <select
//             className="sort-select"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="-createdAt">Newest first</option>
//             <option value="-raisedAmount">Most funded</option>
//             <option value="deadline">Ending soon</option>
//           </select>
//         </div>

//         {/* GRID */}
//         {loading ? (
//           <div className="grid-skeleton">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="skeleton-card">
//                 <div className="skeleton-img" />
//                 <div className="skeleton-body">
//                   <div className="skeleton-line skeleton-line--short" />
//                   <div className="skeleton-line" />
//                   <div className="skeleton-line skeleton-line--med" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : filtered.length === 0 ? (
//           <div className="empty-state">
//             <span className="empty-icon">◌</span>
//             <p>No campaigns found matching "{search}"</p>
//             <button className="btn-ghost" onClick={() => setSearch("")}>
//               Clear search
//             </button>
//           </div>
//         ) : (
//           <div className="campaigns-grid">
//             {filtered.map((campaign) => (
//               <CampaignCard
//                 key={campaign._id}
//                 campaign={campaign}
//                 navigate={navigate}
//               />
//             ))}
//           </div>
//         )}
//       </section>

//       {/* CTA */}
//       <section className="cta-banner">
//         <div className="cta-banner-bg" />
//         <div className="container cta-inner">
//           <h2 className="cta-title">Have an idea worth funding?</h2>
//           <p className="cta-sub">
//             Join thousands of creators who launched their projects here.
//           </p>
//           <button
//             className="btn-primary btn-lg"
//             onClick={() => navigate("create")}
//           >
//             Start for free →
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import CampaignCard from "../components/CampaignCard";
import { campaignsAPI, MOCK_CAMPAIGNS } from "../api/client";

const CATEGORIES = [
  "All",
  "Technology",
  "Environment",
  "Health",
  "Arts",
  "Community",
  "Education",
];

export default function HomePage({ navigate }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("-createdAt");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await campaignsAPI.getAll({
          limit: 20,
          status: "active",
        });

        setCampaigns(res?.data?.data?.campaigns || []);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setCampaigns(MOCK_CAMPAIGNS || []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔍 FILTER (search + category)
  const filtered = (campaigns || [])
    .filter(
      (c) =>
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.description?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((c) =>
      activeCategory === "All"
        ? true
        : (c.category || "All") === activeCategory
    );

  // 🔽 SORT
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "-createdAt") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (sortBy === "-raisedAmount") {
      return (b.raisedAmount || 0) - (a.raisedAmount || 0);
    }

    if (sortBy === "deadline") {
      return new Date(a.deadline) - new Date(b.deadline);
    }

    return 0;
  });

  // 📊 STATS
  // const stats = {
  //   total: campaigns?.length || 0,
  //   raised: (campaigns || []).reduce(
  //     (sum, c) => sum + (c.raisedAmount || 0),
  //     0
  //   ),
  //   backers: (campaigns?.length || 0) * 47,
  // };
  const stats = {
    total: campaigns?.length || 0,
    raised: (campaigns || []).reduce(
      (sum, c) => sum + (c.raisedAmount || 0),
      0
    ),
    backers: (campaigns || []).reduce(
      (sum, c) => sum + (c.backersCount || 0),
      0
    ),
  };

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb--1" />
          <div className="hero-orb hero-orb--2" />
          <div className="hero-grid" />
        </div>

        <div className="container hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Community-powered funding
          </div>

          <h1 className="hero-title">
            Bold ideas deserve
            <br />
            <em className="hero-title-em">bold backing.</em>
          </h1>

          <p className="hero-subtitle">
            Discover campaigns that are reshaping the world.
          </p>

          <div className="hero-actions">
            <button
              className="btn-primary btn-lg"
              onClick={() => navigate("create")}
            >
              Launch your campaign
            </button>

            <button
              className="btn-outline btn-lg"
              onClick={() =>
                document
                  .getElementById("campaigns")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore projects
            </button>
          </div>

          {/* STATS */}
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">
                ${stats.raised.toLocaleString()}+
              </span>
              <span className="hero-stat-label">Total raised</span>
            </div>

            <div className="hero-stat-sep" />

            <div className="hero-stat">
              <span className="hero-stat-value">{stats.total}</span>
              <span className="hero-stat-label">Live campaigns</span>
            </div>

            <div className="hero-stat-sep" />

            <div className="hero-stat">
              <span className="hero-stat-value">
                {stats.backers.toLocaleString()}+
              </span>
              <span className="hero-stat-label">Backers worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* CAMPAIGNS */}
      <section className="campaigns-section container" id="campaigns">
        <div className="section-header">
          <h2 className="section-title">Live Campaigns</h2>

          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              className="search-input"
              placeholder="Search campaigns…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* FILTERS */}
        <div className="filter-row">
          <div className="category-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`pill ${activeCategory === cat ? "pill--active" : ""
                  }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="-createdAt">Newest first</option>
            <option value="-raisedAmount">Most funded</option>
            <option value="deadline">Ending soon</option>
          </select>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="grid-skeleton">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-img" />
                <div className="skeleton-body">
                  <div className="skeleton-line skeleton-line--short" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line skeleton-line--med" />
                </div>
              </div>
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">◌</span>
            <p>No campaigns found matching "{search}"</p>
            <button className="btn-ghost" onClick={() => setSearch("")}>
              Clear search
            </button>
          </div>
        ) : (
          <div className="campaigns-grid">
            {sorted.map((campaign) => (
              <CampaignCard
                key={campaign._id}
                campaign={campaign}
                navigate={navigate}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="cta-banner-bg" />
        <div className="container cta-inner">
          <h2 className="cta-title">Have an idea worth funding?</h2>
          <p className="cta-sub">
            Join thousands of creators who launched their projects here.
          </p>
          <button
            className="btn-primary btn-lg"
            onClick={() => navigate("create")}
          >
            Start for free →
          </button>
        </div>
      </section>
    </div>
  );
}