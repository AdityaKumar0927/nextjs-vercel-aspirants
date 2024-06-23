"use client"; // Add this directive

import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { linearRegression } from 'simple-statistics';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

interface ExamResults {
  answers: Record<string, string>;
  feedback: Record<string, string>;
  timeSpent: number;
  markedForReview: string[];
  markedComplete: string[];
  questions: { questionId: string }[];
}

interface ExamAnalyticsProps {
  results: ExamResults;
}

const ExamAnalytics: React.FC<ExamAnalyticsProps> = ({ results }) => {
  const { answers, feedback, timeSpent, markedForReview, markedComplete, questions } = results;
  const totalQuestions = Object.keys(feedback).length;
  const correctAnswers = Object.values(feedback).filter((val) => val === 'correct').length;
  const incorrectAnswers = Object.values(feedback).filter((val) => val === 'incorrect').length;
  const notAttemptedAnswers = totalQuestions - correctAnswers - incorrectAnswers;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const timePerQuestion = timeSpent / totalQuestions;

  const barData = {
    labels: questions.map((_, index) => `Q${index + 1}`),
    datasets: [
      {
        label: 'Time Spent (seconds)',
        data: questions.map((q) => answers[q.questionId] ? timePerQuestion : 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const doughnutData = {
    labels: ['Correct', 'Incorrect', 'Not Attempted'],
    datasets: [
      {
        data: [correctAnswers, incorrectAnswers, notAttemptedAnswers],
        backgroundColor: ['#4caf50', '#f44336', '#9e9e9e'],
      },
    ],
  };

  const [predictedScore, setPredictedScore] = useState<number | null>(null);

  useEffect(() => {
    try {
      const scoreData = questions.map((q, index) => ({
        x: index + 1,
        y: feedback[q.questionId] === 'correct' ? 1 : 0,
      }));

      const { m, b } = linearRegression(scoreData.map(item => [item.x, item.y]));
      const predicted = b + m * (totalQuestions + 1);
      setPredictedScore(predicted);
    } catch (error) {
      console.error("Error during predictive analysis:", error);
      setPredictedScore(null);
    }
  }, [feedback, questions, totalQuestions]);

  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mt-10">
      <h2 className="text-2xl text-left font-bold mb-4">Exam Analytics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Questions</h3>
          <p className="text-2xl">{totalQuestions}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Correct Answers</h3>
          <p className="text-2xl">{correctAnswers}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Incorrect Answers</h3>
          <p className="text-2xl">{incorrectAnswers}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Not Attempted</h3>
          <p className="text-2xl">{notAttemptedAnswers}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Marked for Review</h3>
          <p className="text-2xl">{markedForReview.length}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Completed</h3>
          <p className="text-2xl">{markedComplete.length}</p>
        </div>
        <div className="bg-emerald-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Time Spent</h3>
          <p className="text-2xl">{formatTime(timeSpent)}</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Time Spent on Each Question</h3>
        <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Answer Distribution</h3>
        <Doughnut data={doughnutData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Predicted Future Score</h3>
        <div className="bg-pink-100 p-4 rounded-lg shadow-md">
          <p className="text-2xl">{predictedScore !== null ? predictedScore.toFixed(2) : 'Calculating...'}</p>
        </div>
      </div>
    </div>
  );
};

export default ExamAnalytics;
