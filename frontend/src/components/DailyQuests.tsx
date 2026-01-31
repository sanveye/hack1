import React, { useState } from 'react';
import './DailyQuests.css';
import { financeQuestions } from '../data/questions';

interface DailyQuestsProps {
  streak: number;
  bestStreak: number;
  onAnswered: () => void;
}

interface QuestionState {
  answered: boolean;
  selectedAnswer: number | null;
  isCorrect: boolean;
}

const DailyQuests: React.FC<DailyQuestsProps> = ({ streak, bestStreak, onAnswered }) => {
  const [currentQuestion, setCurrentQuestion] = useState(financeQuestions[0]);
  const [questionState, setQuestionState] = useState<QuestionState>({
    answered: false,
    selectedAnswer: null,
    isCorrect: false,
  });
  const [questionsAnsweredToday, setQuestionsAnsweredToday] = useState(0);

  const handleAnswerClick = (answerIndex: number) => {
    if (questionState.answered) return;

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    setQuestionState({
      answered: true,
      selectedAnswer: answerIndex,
      isCorrect,
    });

    if (isCorrect) {
      setQuestionsAnsweredToday(questionsAnsweredToday + 1);
      // Call the backend to record the answer
      fetch('http://localhost:8000/api/streak/answer', { method: 'POST' })
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then(data => {
          console.log('Quest recorded:', data);
          onAnswered();
        })
        .catch(err => console.error('Error recording quest:', err));
    }
  };

  const handleNextQuestion = () => {
    const randomQuestion = financeQuestions[Math.floor(Math.random() * financeQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setQuestionState({
      answered: false,
      selectedAnswer: null,
      isCorrect: false,
    });
  };

  return (
    <div className="daily-quests-container">
      <div className="quests-header">
        <h2>Daily Quests</h2>
        <div className="quests-stats">
          <div className="stat">
            <span className="stat-label">Current Streak</span>
            <span className="stat-value">🔥 {streak}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Best Streak</span>
            <span className="stat-value">⭐ {bestStreak}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Answered Today</span>
            <span className="stat-value">✅ {questionsAnsweredToday}</span>
          </div>
        </div>
      </div>

      <div className="question-card">
        <h3>{currentQuestion.question}</h3>

        <div className="answers-grid">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              className={`answer-button ${
                questionState.selectedAnswer === index ? 'selected' : ''
              } ${questionState.answered && index === currentQuestion.correctAnswer ? 'correct' : ''} ${
                questionState.answered &&
                questionState.selectedAnswer === index &&
                !questionState.isCorrect
                  ? 'incorrect'
                  : ''
              }`}
              onClick={() => handleAnswerClick(index)}
              disabled={questionState.answered}
            >
              <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
              <span>{answer}</span>
            </button>
          ))}
        </div>

        {questionState.answered && (
          <div className={`feedback ${questionState.isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
            <div className="feedback-header">
              {questionState.isCorrect ? '✅ correct!' : '❌ incorrect'}
            </div>
            <div className="feedback-explanation">
              <strong>Explanation:</strong> {currentQuestion.explanation}
            </div>
            <button className="next-button" onClick={handleNextQuestion}>
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyQuests;
