import { useState } from 'react';
import './Header.css';

const Header = ({ demoMode, onDemoToggle }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="header-title">BLACKJACK ELITE</h1>
          <p className="header-subtitle">Football Scorecards</p>
          <button 
            className={`demo-toggle-btn ${demoMode ? 'active' : ''}`}
            onClick={onDemoToggle}
          >
            Demo Mode: {demoMode ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
