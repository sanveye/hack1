import React, { useState, useEffect } from 'react';
import './FinancialTips.css';

const financialTips = [
  "Save at least 20% of your income each month!",
  "Track every expense to understand your spending habits.",
  "Build an emergency fund with 3-6 months of expenses.",
  "Avoid impulse purchases - wait 24 hours before buying.",
  "Invest early to benefit from compound interest.",
  "Set specific financial goals and track your progress.",
  "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
  "Compare prices before making big purchases.",
  "Pay yourself first - automate your savings.",
  "Learn to distinguish between needs and wants."
];

const FinancialTips: React.FC = () => {
  const [displayedTips, setDisplayedTips] = useState<string[]>([]);

  useEffect(() => {
    // Select 3 random tips
    const shuffled = [...financialTips].sort(() => 0.5 - Math.random());
    setDisplayedTips(shuffled.slice(0, 3));
  }, []);

  return (
    <div className="financial-tips-container">
      {displayedTips.map((tip, index) => (
        <div key={index} className="tip-card">
          <img 
            src={`/penguin-tip-${index + 1}.png`} 
            alt={`penguin ${index + 1}`} 
            className="tip-penguin"
            onError={(e) => {
              // Fallback to main penguin if custom image doesn't exist
              e.currentTarget.src = '/penguincredit.png';
            }}
          />
          <div className="tip-box">
            <p>{tip}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinancialTips;
