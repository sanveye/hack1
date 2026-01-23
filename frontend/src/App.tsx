import React, { useState, useEffect } from 'react';
import './App.css';
import SavingsForm from './components/SavingsForm';
import SavingsList from './components/SavingsList';
import SavingsSummary from './components/SavingsSummary';
import { Saving, SavingsSummary as SavingsSummaryType } from './types';

const App: React.FC = () => {
  const [savings, setSavings] = useState<Saving[]>([]);
  const [summary, setSummary] = useState<SavingsSummaryType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSavings();
    fetchSummary();
  }, []);

  const fetchSavings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/savings');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched savings:', data);
        setSavings(data);
      } else {
        console.error('Failed to fetch savings:', response.status);
      }
    } catch (error) {
      console.error('Error fetching savings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/savings/summary');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched summary:', data);
        setSummary(data);
      } else {
        console.error('Failed to fetch summary:', response.status);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const handleAddSaving = async (amount: number, comments: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/savings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, comments }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Saving added:', result);
        await fetchSavings();
        await fetchSummary();
      } else {
        console.error('Failed to add saving:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error details:', errorText);
      }
    } catch (error) {
      console.error('Error adding saving:', error);
      alert('Error connecting to backend. Make sure the server is running on port 8000');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>💰 Stash</h1>
        <p>Your Pocket Money Savings Tracker</p>
      </header>

      <div className="container">
        <div className="content">
          <SavingsSummary summary={summary} />
          <SavingsForm onAddSaving={handleAddSaving} />
          {loading ? <p>Loading...</p> : <SavingsList savings={savings} />}
        </div>
      </div>
    </div>
  );
};

export default App;
