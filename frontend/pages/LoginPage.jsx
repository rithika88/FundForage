// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// export default function LoginPage({ navigate }) {
//   const { login, signup } = useAuth();

//   const [mode, setMode] = useState("login"); // login | signup
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const update = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async () => {
//     setError("");

//     // 🔥 Correct validation
//     if (mode === "login") {
//       if (!form.email || !form.password) {
//         setError("All fields are required.");
//         return;
//       }
//     }

//     if (mode === "signup") {
//       if (!form.name || !form.email || !form.password) {
//         setError("All fields are required.");
//         return;
//       }
//     }

//     if (form.password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }

//     setLoading(true);

//     try {
//       if (mode === "login") {
//         await login(form.email, form.password);
//       } else {
//         await signup(form.name, form.email, form.password);
//       }

//       // Reset form after success
//       setForm({ name: "", email: "", password: "" });

//       navigate("home");
//     } catch (e) {
//       setError(e.response?.data?.message || "Authentication failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <h2>{mode === "login" ? "Welcome Back" : "Create Account"}</h2>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <div className="login-form">
//           {mode === "signup" && (
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={(e) => update("name", e.target.value)}
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => update("email", e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={(e) => update("password", e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//           />

//           <button onClick={handleSubmit} disabled={loading}>
//             {loading
//               ? "Please wait..."
//               : mode === "login"
//                 ? "Login"
//                 : "Sign Up"}
//           </button>
//         </div>

//         <p style={{ marginTop: "10px" }}>
//           {mode === "login"
//             ? "Don't have an account?"
//             : "Already have an account?"}

//           <button
//             style={{ marginLeft: "5px" }}
//             onClick={() => {
//               setMode(mode === "login" ? "signup" : "login");
//               setError("");
//               setForm({ name: "", email: "", password: "" });
//             }}
//           >
//             {mode === "login" ? "Sign Up" : "Login"}
//           </button>
//         </p>

//         <button
//           style={{ marginTop: "15px" }}
//           onClick={() => navigate("home")}
//         >
//           ← Back to Home
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage({ navigate }) {
  const { login, signup } = useAuth();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setError("");

    if (mode === "login") {
      if (!form.email || !form.password) {
        setError("All fields are required.");
        return;
      }
    }

    if (mode === "signup") {
      if (!form.name || !form.email || !form.password) {
        setError("All fields are required.");
        return;
      }
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await signup(form.name, form.email, form.password);
      }

      setForm({ name: "", email: "", password: "" });
      navigate("home");
    } catch (e) {
      setError(e.response?.data?.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-orb login-orb--1" />
        <div className="login-orb login-orb--2" />
      </div>

      <div className="login-card">
        <div className="login-logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">
            Fund<em>forge</em>
          </span>
        </div>

        <h1 className="login-title">
          {mode === "login" ? "Welcome back" : "Join Fundforge"}
        </h1>

        <p className="login-sub">
          {mode === "login"
            ? "Sign in to manage your campaigns."
            : "Create your account and start your first campaign."}
        </p>

        {error && <div className="form-error">{error}</div>}

        <div className="login-form">
          {mode === "signup" && (
            <div className="form-group">
              <label className="form-label">Full name</label>
              <input
                className="form-input"
                placeholder="Ada Lovelace"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <button
            className="btn-primary btn-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Please wait…"
              : mode === "login"
                ? "Sign in"
                : "Create account"}
          </button>
        </div>

        <div className="login-divider">
          <span>or</span>
        </div>

        <p className="login-switch">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            className="login-switch-btn"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
              setForm({ name: "", email: "", password: "" });
            }}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>

        <button className="back-to-home" onClick={() => navigate("home")}>
          ← Back to campaigns
        </button>
      </div>
    </div>
  );
}