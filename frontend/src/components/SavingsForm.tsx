import React, { useState } from 'react';
import './SavingsForm.css';

interface SavingsFormProps {
  onAddSaving: (amount: number, comments: string) => void;
}

const SavingsForm: React.FC<SavingsFormProps> = ({ onAddSaving }) => {
  const [amount, setAmount] = useState('');
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount' });
      return;
    }

    setSubmitting(true);
    setMessage(null);
    try {
      await onAddSaving(parseFloat(amount), comments);
      setAmount('');
      setComments('');
      setMessage({ type: 'success', text: 'Savings recorded successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error adding saving. Check console for details.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="savings-form">
      <h2>Add Your Savings</h2>
      {message && (
        <div className={`message message-${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
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

        <div className="form-group">
          <label htmlFor="comments">Comments (Optional)</label>
          <textarea
            id="comments"
            placeholder="Add notes about this saving..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            disabled={submitting}
            rows={3}
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Money'}
        </button>
      </form>
    </div>
  );
};

export default SavingsForm;
