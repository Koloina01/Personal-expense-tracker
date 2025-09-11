import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import HexagonBackground from "./HexagonBackground";
import "./LoginPage.css";

const API_BASE = "http://localhost:5000";

const LoginPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => setIsSignUp(!isSignUp);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isSignUp ? "register" : "login";
    const payload = isSignUp ? { fullName, email, password } : { email, password };

    try {
      const res = await fetch(`${API_BASE}/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard"); 
      } else {
        alert(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error("Erreur fetch:", err);
    }
  };

  return (
    <div className="login-page">
      <HexagonBackground />

      <div className={`login-left ${isSignUp ? "slide-left" : ""}`}>
        <div className="login-left-content">
          <h1 className="left-title">
            {isSignUp ? "Join Poketra vy Today" : "Welcome to Poketra vy"}
          </h1>
          <p className="left-text">
            {isSignUp
              ? "Create your account and start tracking expenses."
              : "Stay in control of your budget with Poketra vy."}
          </p>
        </div>
      </div>

      <div className={`login-panel ${isSignUp ? "slide-right" : ""}`}>
        <div className="login-content">
          <h2 className="login-title">{isSignUp ? "Sign Up" : "Sign In"}</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="login-input"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button type="submit" className="login-button">
              {isSignUp ? "Register" : "Login"}
            </button>
          </form>

          <div className="login-footer-links">
            <p className="signup-text">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <span className="signup-link" onClick={toggleForm}>
                {isSignUp ? "Sign in" : "Sign up"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
