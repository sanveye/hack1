import React from 'react';
import { SavingsSummary as SavingsSummaryType } from '../types';
import './SavingsSummary.css';

interface SavingsSummaryProps {
  summary: SavingsSummaryType | null;
}

const SavingsSummary: React.FC<SavingsSummaryProps> = ({ summary }) => {
  if (!summary) {
    return null;
  }

  return (
    <div className="savings-summary">
      <div className="summary-card total">
        <div className="summary-label">Total Savings</div>
        <div className="summary-value">${summary.total_savings.toFixed(2)}</div>
      </div>
      <div className="summary-card transactions">
        <div className="summary-label">Transactions</div>
        <div className="summary-value">{summary.number_of_transactions}</div>
      </div>
    </div>
  );
};

export default SavingsSummary;
