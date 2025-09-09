import React, { useState } from 'react';
import './LoginPage.css';
import HexagonBackground from './HexagonBackground';

const LoginPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <div className="login-page">
      <HexagonBackground />

      {/* Panneau gauche */}
      <div className={`login-left ${isSignUp ? 'slide-left' : ''}`}>
        <div className="login-left-content">
          <h1 className="left-title">
            {isSignUp ? "Join Poketra vy Today" : "Welcome to Poketra vy"}
          </h1>
          <p className="left-text">
            {isSignUp
              ? "Create your account and start connecting with the world."
              : "Experience the future of digital interactions. Connect, explore, and enjoy seamless performance."}
          </p>
        </div>
      </div>

      {/* Panneau droit */}
      <div className={`login-panel ${isSignUp ? 'slide-right' : ''}`}>
        <div className="login-content">
          <img src="/expense-tracker.png" alt="" className="logo-expense" />

          <h2 className="login-title">{isSignUp ? "Sign Up" : "Sign In"}</h2>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            {isSignUp && <input type="text" placeholder="Full Name" className="login-input" />}
            <input type="text" placeholder="Username" className="login-input" />
            <input type="password" placeholder="Password" className="login-input" />
            {isSignUp && <input type="password" placeholder="Confirm Password" className="login-input" />}
            <button type="submit" className="login-button">
              {isSignUp ? "Register" : "Login"}
            </button>
          </form>

          <div className="login-footer-links">
            {!isSignUp && <p className="login-footer">Forgot your password?</p>}
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
