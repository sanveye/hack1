import React, { useState } from 'react';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
  onComplete: (name: string, initialBalance: number) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    const balanceNum = parseFloat(balance);
    if (isNaN(balanceNum) || balanceNum < 0) {
      setError('Please enter a valid balance (0 or greater)');
      return;
    }

    setError('');
    onComplete(name.trim(), balanceNum);
  };

  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">
        <h1>Welcome to Stash! 🐧</h1>
        <p className="welcome-subtitle">let's set up your account</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">what's your name?</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="enter your name"
              autoFocus
            />
          </div>

          <div className="input-group">
            <label htmlFor="balance">what's your current balance?</label>
            <div className="balance-input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                id="balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="welcome-button">
            get started
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeScreen;
