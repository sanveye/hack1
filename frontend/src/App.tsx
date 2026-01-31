import React, { useState, useEffect } from 'react';
import './App.css';
import SavingsForm from './components/SavingsForm';
import SavingsList from './components/SavingsList';
import SavingsSummary from './components/SavingsSummary';
import Sidebar from './components/Sidebar';
import DailyQuests from './components/DailyQuests';
import WelcomeScreen from './components/WelcomeScreen';
import FinancialTips from './components/FinancialTips';
import WomenBusiness from './components/WomenBusiness';
import { Transaction, Summary } from './types';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });
  const [currentScreen, setCurrentScreen] = useState<'transactions' | 'quests' | 'women-business'>('transactions');
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    checkProfile();
  }, []);

  useEffect(() => {
    if (!showWelcome && !checkingProfile) {
      fetchTransactions();
      fetchSummary();
      fetchStreak();
    }
  }, [showWelcome, checkingProfile]);

  const checkProfile = async () => {
    try {
      console.log('Checking profile...');
      const response = await fetch('http://localhost:8000/api/profile');
      console.log('Profile response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Profile data:', data);
        if (!data.is_setup) {
          console.log('Setting showWelcome to true');
          setShowWelcome(true);
        } else {
          console.log('Profile already setup');
          setUserName(data.name);
          // Set random greeting
          const greetings = [
            `welcome back, ${data.name}!`,
            `hi, ${data.name}!`,
            `hey there, ${data.name}!`,
            `what's up, ${data.name}?`,
            `hello, ${data.name}!`
          ];
          setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
        }
      }
    } catch (error) {
      console.error('Error checking profile:', error);
    } finally {
      setCheckingProfile(false);
    }
  };

  const handleWelcomeComplete = async (name: string, initialBalance: number) => {
    try {
      const response = await fetch('http://localhost:8000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, initial_balance: initialBalance }),
      });

      if (response.ok) {
        setShowWelcome(false);
        setUserName(name);
        setGreeting(`Welcome, ${name}!`);
      } else {
        setPopup({ visible: true, message: 'Error setting up profile. Please try again.' });
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      setPopup({ visible: true, message: 'Error connecting to server. Please try again.' });
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/transactions');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched transactions:', data);
        setTransactions(data);
      } else {
        console.error('Failed to fetch transactions:', response.status);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/transactions/summary');
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

  const fetchStreak = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/streak');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched streak:', data);
        setStreak(data.current_streak);
        setBestStreak(data.best_streak);
      } else {
        console.error('Failed to fetch streak:', response.status);
      }
    } catch (error) {
      console.error('Error fetching streak:', error);
    }
  };

  const handleAddTransaction = async (amount: number, transaction_type: 'income' | 'expense', comments: string, spent_on: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, transaction_type, comments, spent_on }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Transaction added:', result);
        await fetchTransactions();
        await fetchSummary();
      } else {
        console.error('Failed to add transaction:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error details:', errorText);
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      setPopup({ visible: true, message: 'Error connecting to backend. Make sure the server is running on port 8000' });
    }
  };

  const handleQuestAnswered = async () => {
    await fetchStreak();
  };

  if (checkingProfile) {
    return <div className="App">Loading...</div>;
  }

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.png" alt="Stash logo" className="app-logo" />
        <h1>stash</h1>
        <p>{currentScreen === 'transactions' ? 'track your income and expenses' : 'daily finance quests'}</p>
      </header>

      <div className="app-layout">
        <Sidebar currentScreen={currentScreen} onScreenChange={setCurrentScreen} streak={streak} />

        {currentScreen === 'transactions' && <FinancialTips />}

        
        <div className="container">
          <img src="/penguincredit.png" alt="penguin peeking" className="penguin-peek" />
          <div className="content">
            {currentScreen === 'transactions' ? (
              <>
                {greeting && <h2 className="greeting-text">{greeting}</h2>}
                <SavingsSummary summary={summary} />
                <SavingsForm onAddSaving={handleAddTransaction} onShowPopup={(message) => setPopup({ visible: true, message })} />
                {loading ? <p>Loading...</p> : <SavingsList savings={transactions} />}
              </>
            ) : currentScreen === 'quests' ? (
              <DailyQuests streak={streak} bestStreak={bestStreak} onAnswered={handleQuestAnswered} />
            ) : (
              <WomenBusiness />
            )}
          </div>
        </div>
      </div>

      {popup.visible && (
        <div className="popup-overlay">
          <div className="popup-modal">
            <p>{popup.message}</p>
            <button onClick={() => setPopup({ visible: false, message: '' })}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
