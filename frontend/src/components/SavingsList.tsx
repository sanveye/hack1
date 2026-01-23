import React from 'react';
import { Saving } from '../types';
import './SavingsList.css';

interface SavingsListProps {
  savings: Saving[];
}

const SavingsList: React.FC<SavingsListProps> = ({ savings }) => {
  if (savings.length === 0) {
    return (
      <div className="savings-list">
        <div className="empty-state">
          <p>No savings yet. Start by adding your first saving!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="savings-list">
      <h2>Your Savings History</h2>
      <div className="transactions">
        {savings.map((saving) => (
          <div key={saving.id} className="transaction-item">
            <div className="transaction-left">
              <div className="transaction-date">
                {saving.date} {saving.time}
              </div>
              {saving.comments && (
                <div className="transaction-comments">{saving.comments}</div>
              )}
            </div>
            <div className="transaction-right">
              <div className="transaction-amount">+${saving.amount.toFixed(2)}</div>
              <div className="transaction-total">
                Total: ${saving.total_savings.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingsList;
