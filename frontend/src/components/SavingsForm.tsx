import React, { useState } from 'react';
import './SavingsForm.css';

interface SavingsFormProps {
  onAddSaving: (amount: number, transaction_type: 'income' | 'expense', comments: string, spent_on: string) => void;
  onShowPopup: (message: string) => void;
}

const SavingsForm: React.FC<SavingsFormProps> = ({ onAddSaving, onShowPopup }) => {
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');
  const [comments, setComments] = useState('');
  const [spentOn, setSpentOn] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      onShowPopup('enter a valid amount greater than zero!');
      return;
    }

    setSubmitting(true);
    try {
      await onAddSaving(parseFloat(amount), transactionType, comments, spentOn);
      setAmount('');
      setComments('');
      setSpentOn('');
      onShowPopup('transaction recorded successfully!');
    } catch (error) {
      onShowPopup('error adding transaction');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="savings-form">
      <h2>any transactions?</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value as 'income' | 'expense')}
              disabled={submitting}
            >
              <option value="income">💰 income (+)</option>
              <option value="expense">💸 expense (-)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount ($)</label>
            <input
              type="number"
              id="amount"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={submitting}
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="spent-on">What did you spend it on?</label>
          <input
            type="text"
            id="spent-on"
            placeholder="e.g., Starbucks"
            value={spentOn}
            onChange={(e) => setSpentOn(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="comments">any notes?</label>
          <textarea
            id="comments"
            placeholder="add notes here..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            disabled={submitting}
            rows={3}
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Recording...' : 'add transaction'}
        </button>
      </form>
    </div>
  );
};

export default SavingsForm;
