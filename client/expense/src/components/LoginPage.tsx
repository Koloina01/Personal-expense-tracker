import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HexagonBackground from "./HexagonBackground";
import "./css/LoginPage.css";

const API_BASE = "http://localhost:5000";

const LoginPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    if (!email || !password) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must contain at least 6 characters.");
      setLoading(false);
      return;
    }

    if (isSignUp && !fullName.trim()) {
      setErrorMessage("Fullname is required.");
      setLoading(false);
      return;
    }

    const endpoint = isSignUp ? "register" : "login";
    const payload = isSignUp ? { fullName, email, password } : { email, password };

    try {
      const res = await axios.post(`${API_BASE}/api/auth/${endpoint}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setLoading(false);

      if (res.status === 200) {
        if (isSignUp) {
          setSuccessMessage("User created successfully.");
          setIsSignUp(false);
          setFullName("");
          setEmail("");
          setPassword("");
        } else if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/dashboard");
        }
      }
    } catch (err: any) {
      console.error("Erreur axios:", err);
      setLoading(false);

      if (err.response && err.response.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("An error has occurred. Please try again later.");
      }
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

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {loading && <div className="loading-spinner"></div>}

            {successMessage && <p className="success-message">{successMessage}</p>}

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
