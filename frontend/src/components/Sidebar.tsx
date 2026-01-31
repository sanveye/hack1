import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  currentScreen: 'transactions' | 'quests' | 'women-business';
  onScreenChange: (screen: 'transactions' | 'quests' | 'women-business') => void;
  streak: number;
}

const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onScreenChange, streak }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="streak-display">
          <div className="streak-number">{streak}</div>
          <div className="streak-label">🔥 day streak</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-button ${currentScreen === 'transactions' ? 'active' : ''}`}
          onClick={() => onScreenChange('transactions')}
        >
          💰 transactions
        </button>
        <button
          className={`nav-button ${currentScreen === 'quests' ? 'active' : ''}`}
          onClick={() => onScreenChange('quests')}
        >
          🎯 daily quests
        </button>
        <button
          className={`nav-button ${currentScreen === 'women-business' ? 'active' : ''}`}
          onClick={() => onScreenChange('women-business')}
        >
          💼 women-owned
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
