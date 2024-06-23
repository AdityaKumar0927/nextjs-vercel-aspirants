"use client"; // Add this directive

import React from 'react';
import ExamAnalytics from './ExamAnalytics';

interface User {
  sub: string;
  name: string;
  email: string;
}

interface ExamData {
  answers: Record<string, string>;
  feedback: Record<string, string>;
  timeSpent: number;
  markedForReview: string[];
  markedComplete: string[];
  questions: { questionId: string }[];
}

interface DashboardProps {
  user: User;
  examData: ExamData[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, examData }) => {
  return (
    <div className="dashboard">
      <h1>Welcome, {user ? user.name : 'User'}!</h1>
      {examData.length > 0 ? (
        examData.map((exam, index) => (
          <ExamAnalytics key={index} results={exam} />
        ))
      ) : (
        <p>No exam data available.</p>
      )}
    </div>
  );
};

export default Dashboard;
