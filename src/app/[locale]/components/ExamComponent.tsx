// src/components/ExamComponent.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Latex from 'react-latex-next';
import QuestionExam from './QuestionExam';
import ExamAnalytics from './ExamAnalytics';
import FullscreenIcon from './FullScreenIcon';
import { useRouter } from 'next/router';

interface ExamComponentProps {
  questions: Question[];
  examTime: number;
  onFinishExam: (results: ExamResults) => void;
}

interface Question {
  questionId: string;
  correctOption?: string;
}

interface ExamResults {
  answers: Record<string, string>;
  feedback: Record<string, string>;
  timeSpent: number;
  markedForReview: string[];
  markedComplete: string[];
  questions: Question[];
}

const ExamComponent: React.FC<ExamComponentProps> = ({ questions, examTime, onFinishExam }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [remainingTime, setRemainingTime] = useState(examTime * 60); // convert minutes to seconds
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [numericalAnswers, setNumericalAnswers] = useState<Record<string, string>>({});
  const [showMarkscheme, setShowMarkscheme] = useState<Record<string, boolean>>({});
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [markedComplete, setMarkedComplete] = useState<string[]>([]);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const examRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isExamSubmitted && !isPaused) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prevTime - 1;
        });
        setTimeSpent((prevTimeSpent) => prevTimeSpent + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isExamSubmitted, isPaused]);

  const handleOptionClick = (questionId: string, option: string) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: option }));
  };

  const handleNumericalSubmit = (questionId: string, userAnswer: string) => {
    setNumericalAnswers((prevNumericalAnswers) => ({ ...prevNumericalAnswers, [questionId]: userAnswer }));
    handleOptionClick(questionId, userAnswer);
  };

  const handleNumericalChange = (questionId: string, value: string) => {
    setNumericalAnswers((prevNumericalAnswers) => ({ ...prevNumericalAnswers, [questionId]: value }));
  };

  const handleMarkschemeToggle = (questionId: string) => {
    setShowMarkscheme((prevShowMarkscheme) => ({
      ...prevShowMarkscheme,
      [questionId]: !prevShowMarkscheme[questionId],
    }));
  };

  const handleMarkForReview = (questionId: string) => {
    setMarkedForReview((prevMarkedForReview) =>
      prevMarkedForReview.includes(questionId)
        ? prevMarkedForReview.filter((id) => id !== questionId)
        : [...prevMarkedForReview, questionId]
    );
  };

  const handleMarkComplete = (questionId: string) => {
    setMarkedComplete((prevMarkedComplete) =>
      prevMarkedComplete.includes(questionId)
        ? prevMarkedComplete.filter((id) => id !== questionId)
        : [...prevMarkedComplete, questionId]
    );
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmitExam = useCallback(() => {
    if (isFullscreen) {
      handleFullscreenToggle(); // Exit fullscreen if active
    }
    setIsExamSubmitted(true);
    const newFeedback: Record<string, string> = {};
    questions.forEach((question) => {
      const correctAnswer = question.correctOption || 'no answer';
      const userAnswer = answers[question.questionId];
      newFeedback[question.questionId] = userAnswer === correctAnswer ? 'correct' : userAnswer ? 'incorrect' : 'no answer';
    });
    setFeedback(newFeedback);
    onFinishExam({
      answers,
      feedback: newFeedback,
      timeSpent,
      markedForReview,
      markedComplete,
      questions,
    });
  }, [answers, onFinishExam, questions, timeSpent, markedForReview, markedComplete]);

  const handlePauseExam = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      if (examRef.current?.requestFullscreen) {
        examRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div ref={examRef} className="max-w-6xl mx-auto p-6 mt-10 flex flex-col md:flex-row bg-white">
      <div className="flex-1 md:pr-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Exam</h1>
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 rounded-full bg-emerald-400 text-white border-gray-300 pl-4">{formatTime(remainingTime)}</div>
            <button
              className="bg-emerald-400 text-white py-2 px-4 rounded-full hover:bg-emerald-400 transition duration-300"
              onClick={handlePauseExam}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            {!isExamSubmitted && (
              <button
                className="text-black py-2 px-4 rounded-full"
                onClick={handleFullscreenToggle}
              >
                <FullscreenIcon /> {/* Add the icon here */}
              </button>
            )}
          </div>
        </div>
        <QuestionExam
          question={questions[currentQuestionIndex]}
          feedback={feedback[questions[currentQuestionIndex]?.questionId]}
          numericalAnswer={numericalAnswers[questions[currentQuestionIndex]?.questionId]}
          showMarkscheme={showMarkscheme[questions[currentQuestionIndex]?.questionId]}
          handleOptionClick={handleOptionClick}
          handleNumericalSubmit={handleNumericalSubmit}
          handleNumericalChange={handleNumericalChange}
          handleMarkschemeToggle={handleMarkschemeToggle}
          handleMarkForReview={handleMarkForReview}
          handleMarkComplete={handleMarkComplete}
          isMarkedForReview={markedForReview.includes(questions[currentQuestionIndex]?.questionId)}
          isMarkedComplete={markedComplete.includes(questions[currentQuestionIndex]?.questionId)}
          isExamSubmitted={isExamSubmitted}
          selectedAnswer={answers[questions[currentQuestionIndex]?.questionId]}
        />
        <div className="flex justify-between mt-8">
          <button
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
          {!isExamSubmitted && (
            <button
              className="text-black border-black border-2 py-2 px-4 rounded-full hover:bg-gray-300 transition duration-800"
              onClick={handleSubmitExam}
            >
              Submit Exam
            </button>
          )}
        </div>
        {isExamSubmitted && (
          <ExamAnalytics
            results={{
              answers,
              feedback,
              timeSpent,
              markedForReview,
              markedComplete,
              questions,
            }}
          />
        )}
      </div>
      <div className="w-full md:w-1/4 border-l-2 border-gray-300 pl-4 mt-4 md:mt-0">
        <h2 className="text-xl text-left font-bold mb-4">Questions</h2>
        <div className="grid grid-cols-3 gap-2">
          {questions.map((question, index) => (
            <button
              key={question.questionId}
              className={`py-2 px-4 text-black rounded-lg ${
                index === currentQuestionIndex
                  ? 'border-blue-200 border-2'
                  : isExamSubmitted
                  ? answers[question.questionId]
                    ? feedback[question.questionId] === 'correct'
                      ? 'bg-emerald-400'
                      : feedback[question.questionId] === 'incorrect'
                      ? 'bg-red-400'
                      : 'border-2 border-black'
                    : 'border-2 border-black'
                  : answers[question.questionId]
                  ? 'border-2 border-black'
                  : markedForReview.includes(question.questionId)
                  ? 'border-yellow-300 border-2'
                  : 'border-2 border-black'
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <span className="">To Review: {markedForReview.length}</span>
        </div>
      </div>
    </div>
  );
};

export default ExamComponent;
