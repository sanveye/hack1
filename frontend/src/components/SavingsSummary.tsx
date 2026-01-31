import React from 'react';
import { Summary } from '../types';
import './SavingsSummary.css';

interface SavingsSummaryProps {
  summary: Summary | null;
}

const SavingsSummary: React.FC<SavingsSummaryProps> = ({ summary }) => {
  if (!summary) {
    return null;
  }

  return (
    <div className="savings-summary">
      <div className={`summary-card balance ${summary.balance >= 0 ? 'positive' : 'negative'}`}>
        <div className="summary-label">balance</div>
        <div className="summary-value">${summary.balance.toFixed(2)}</div>
      </div>
      <div className="summary-card income">
        <div className="summary-label">income</div>
        <div className="summary-value">${summary.income.toFixed(2)}</div>
      </div>
      <div className="summary-card expense">
        <div className="summary-label">expenses</div>
        <div className="summary-value">${summary.expenses.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default SavingsSummary;
