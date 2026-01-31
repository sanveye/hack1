import React from 'react';
import { Transaction } from '../types';
import './SavingsList.css';

interface SavingsListProps {
  savings: Transaction[];
}

const SavingsList: React.FC<SavingsListProps> = ({ savings }) => {
  if (savings.length === 0) {
    return (
      <div className="savings-list">
        <div className="empty-state">
          <p>No transactions yet. Add your first transaction!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="savings-list">
      <h2>your transactions</h2>
      <div className="transactions">
        {savings.map((saving) => (
          <div
            key={saving.id}
            className={`transaction-item ${saving.transaction_type}`}
          >
            <div className="transaction-left">
              <div className="transaction-icon">
                {saving.transaction_type === 'income' ? '💰' : '💸'}
              </div>
              <div className="transaction-details">
                <div className="transaction-type">
                  {saving.spent_on || (saving.transaction_type === 'income' ? 'Income' : 'Expense')}
                </div>
                <div className="transaction-date">
                  {saving.date} {saving.time}
                </div>
                {saving.comments && (
                  <div className="transaction-comments">{saving.comments}</div>
                )}
              </div>
            </div>
            <div className="transaction-right">
              <div className={`transaction-amount ${saving.transaction_type}`}>
                {saving.transaction_type === 'income' ? '+' : '-'}${saving.amount.toFixed(2)}
              </div>
              {saving.balance !== undefined && (
                <div className={`transaction-balance ${saving.balance >= 0 ? 'positive' : 'negative'}`}>
                  Balance: ${saving.balance.toFixed(2)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingsList;
