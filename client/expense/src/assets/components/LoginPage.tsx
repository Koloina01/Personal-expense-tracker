import React from 'react';
import './LoginPage.css';
import HexagonBackground from './HexagonBackground';

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <HexagonBackground />

      <div className="login-left">
        <div className="login-left-content">
          <h1 className="left-title">Welcome to Poketra vy</h1>
          <p className="left-text">
            Experience the future of digital interactions. Connect, explore, and enjoy seamless performance.
          </p>
        </div>
      </div>

      <div className="login-panel">
        <div className="login-content">
          <img src="/expense-tracker.png" alt="" className='logo-expense'/>
          <h2 className="login-title">Sign in</h2>
          <form className="login-form">
            <input type="text" placeholder="Username" className="login-input" />
            <input type="password" placeholder="Password" className="login-input" />
            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="login-footer">Forgot your password?</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
