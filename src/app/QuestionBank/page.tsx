"use client"; // Add this directive

import React, { useState, useEffect, useRef } from 'react';
import Latex from 'react-latex-next';
import jsPDF from 'jspdf';
import Question from '../[locale]/components/Question';

const QuestionBank: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    subject: '',
    difficulty: '',
    type: '',
    year: '',
    status: 'all',
  });
  const [dropdowns, setDropdowns] = useState({
    subject: false,
    difficulty: false,
    year: false,
    type: false,
  });
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [numericalAnswers, setNumericalAnswers] = useState<Record<string, string>>({});
  const [showMarkscheme, setShowMarkscheme] = useState<Record<string, boolean>>({});
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [markedComplete, setMarkedComplete] = useState<string[]>([]);

  const dropdownTimeout = useRef<any>({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    filterQuestions(filters);
  }, [filters, markedForReview, markedComplete]);

  const fetchQuestions = async () => {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : process.env.REACT_APP_BACKEND_URL;
    try {
      const response = await fetch(`${baseUrl}/api/questions`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching questions: ${response.status} ${response.statusText} - ${errorText}`);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await response.json();
        setQuestions(data);
        setFilteredQuestions(data);
      } else {
        const errorText = await response.text();
        throw new Error('Expected JSON but received: ' + errorText);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Failed to fetch questions. Please try again later.');
    }
  };

  const handleFilterChange = (tag: string, value: string) => {
    const newFilters = { ...filters, [tag]: value };
    setFilters(newFilters);
    filterQuestions(newFilters);
  };

  const filterQuestions = (filters: any) => {
    let filtered = questions.filter(question => {
      return (
        (!filters.subject || question.subject === filters.subject) &&
        (!filters.difficulty || question.difficulty === filters.difficulty) &&
        (!filters.year || question.year === filters.year) &&
        (!filters.type || question.type === filters.type)
      );
    });

    if (filters.status === 'review') {
      filtered = filtered.filter(question => markedForReview.includes(question.questionId));
    } else if (filters.status === 'complete') {
      filtered = filtered.filter(question => markedComplete.includes(question.questionId));
    }

    setFilteredQuestions(filtered);
  };

  const handleOptionClick = (questionId: string, option: string, correctOption: string) => {
    setFeedback({
      ...feedback,
      [questionId]: option === correctOption ? 'correct' : correctOption === 'no answer' ? 'no answer' : 'incorrect',
    });
  };

  const handleNumericalSubmit = (questionId: string, userAnswer: string, correctAnswer: string) => {
    setFeedback({
      ...feedback,
      [questionId]: userAnswer === correctAnswer ? 'correct' : correctAnswer === 'no answer' ? 'no answer' : 'incorrect',
    });
  };

  const handleNumericalChange = (questionId: string, value: string) => {
    setNumericalAnswers({
      ...numericalAnswers,
      [questionId]: value,
    });
  };

  const handleMarkschemeToggle = (questionId: string) => {
    setShowMarkscheme((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleMarkForReview = (questionId: string) => {
    setMarkedForReview((prev) =>
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  const handleMarkComplete = (questionId: string) => {
    setMarkedComplete((prev) =>
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  const generatePDF = (type: string) => {
    const doc = new jsPDF();
    if (type === 'questionPaper') {
      doc.text('Question Paper', 10, 10);
      filteredQuestions.forEach((question, index) => {
        doc.text(`${index + 1}. ${question.text}`, 10, 20 + index * 10);
      });
    } else if (type === 'markscheme') {
      doc.text('Markscheme', 10, 10);
      filteredQuestions.forEach((question, index) => {
        doc.text(`${index + 1}. ${question.markscheme || 'No answer available'}`, 10, 20 + index * 10);
      });
    }
    doc.save(`${type}.pdf`);
  };

  const handleMouseEnter = (menu: string) => {
    clearTimeout(dropdownTimeout.current[menu]);
    setDropdowns(prevState => ({
      ...prevState,
      [menu]: true,
    }));
  };

  const handleMouseLeave = (menu: string) => {
    dropdownTimeout.current[menu] = setTimeout(() => {
      setDropdowns(prevState => ({
        ...prevState,
        [menu]: false,
      }));
    }, 100);
  };

  const subjects = Array.from(new Set(questions.map(q => q.subject)));
  const difficulties = Array.from(new Set(questions.map(q => q.difficulty)));
  const years = Array.from(new Set(questions.map(q => q.year)));
  const types = Array.from(new Set(questions.map(q => q.type)));

  return (
    <div className="bg-gray-50 p-8 min-h-screen flex justify-center">
      <div className="max-w-6xl w-full">
        <nav className="text-sm text-gray-500 mb-4">
          <a href="#" className="hover:underline text-left">Collections</a> &gt; <a href="#" className="hover:underline text-left">Question Bank</a>
        </nav>
        <h1 className="text-3xl font-bold mb-2 text-left">Question Bank</h1>
        <div className="flex space-x-4 mb-6">
          <button 
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center space-x-2" 
            onClick={() => generatePDF('questionPaper')}
          >
            <i className="fas fa-download"></i>
            <span>Download question paper</span>
          </button>
          <button 
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center space-x-2"
            onClick={() => generatePDF('markscheme')}
          >
            <i className="fas fa-download"></i>
            <span>Download markscheme</span>
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center space-x-2">
            <i className="fas fa-ellipsis-h"></i>
            <span>More</span>
          </button>
        </div>
        <div className="flex space-x-4 mb-6">
          <button
            className={`bg-white border-2 border-black text-black px-4 py-2 rounded-md ${filters.status === 'all' ? 'bg-blue-100 border-2 border-blue-300 text-black' : ''}`}
            onClick={() => handleFilterChange('status', 'all')}
          >
            All Questions
          </button>
          <button
            className={`bg-white border-2 border-black text-black px-4 py-2 rounded-md ${filters.status === 'review' ? 'bg-blue-100 border-2 border-blue-300 text-black' : ''}`}
            onClick={() => handleFilterChange('status', 'review')}
          >
            Marked for Review
          </button>
          <button
            className={`bg-white border-2 border-black text-black px-4 py-2 rounded-md ${filters.status === 'complete' ? 'bg-blue-100 border-2 border-blue-300 text-black' : ''}`}
            onClick={() => handleFilterChange('status', 'complete')}
          >
            Completed
          </button>
        </div>
        <div className="flex flex-wrap items-start mb-4 space-x-2">
          <div
            className="relative inline-block mb-2"
            onMouseEnter={() => handleMouseEnter('subject')}
            onMouseLeave={() => handleMouseLeave('subject')}
          >
            <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded">
              {filters.subject || 'Subject'}
            </button>
            {dropdowns.subject && (
              <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                {subjects.map(subject => (
                  <a
                    key={subject}
                    href="#"
                    onClick={() => {
                      handleFilterChange('subject', subject);
                      setDropdowns({ ...dropdowns, subject: false });
                    }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {subject}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div
            className="relative inline-block mb=2"
            onMouseEnter={() => handleMouseEnter('difficulty')}
            onMouseLeave={() => handleMouseLeave('difficulty')}
          >
            <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded">
              {filters.difficulty || 'Difficulty'}
            </button>
            {dropdowns.difficulty && (
              <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                {difficulties.map(difficulty => (
                  <a
                    key={difficulty}
                    href="#"
                    onClick={() => {
                      handleFilterChange('difficulty', difficulty);
                      setDropdowns({ ...dropdowns, difficulty: false });
                    }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {difficulty}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div
            className="relative inline-block mb=2"
            onMouseEnter={() => handleMouseEnter('year')}
            onMouseLeave={() => handleMouseLeave('year')}
          >
            <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded">
              {filters.year || 'Year'}
            </button>
            {dropdowns.year && (
              <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                {years.map(year => (
                  <a
                    key={year}
                    href="#"
                    onClick={() => {
                      handleFilterChange('year', year);
                      setDropdowns({ ...dropdowns, year: false });
                    }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {year}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div
            className="relative inline-block mb=2"
            onMouseEnter={() => handleMouseEnter('type')}
            onMouseLeave={() => handleMouseLeave('type')}
          >
            <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded">
              {filters.type || 'Type'}
            </button>
            {dropdowns.type && (
              <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                {types.map(type => (
                  <a
                    key={type}
                    href="#"
                    onClick={() => {
                      handleFilterChange('type', type);
                      setDropdowns({ ...dropdowns, type: false });
                    }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {type}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <Question
              key={question.questionId}
              question={question}
              feedback={feedback[question.questionId]}
              numericalAnswer={numericalAnswers[question.questionId]}
              showMarkscheme={showMarkscheme[question.questionId]}
              handleOptionClick={handleOptionClick}
              handleNumericalSubmit={handleNumericalSubmit}
              handleNumericalChange={handleNumericalChange}
              handleMarkschemeToggle={handleMarkschemeToggle}
              handleMarkForReview={handleMarkForReview}
              handleMarkComplete={handleMarkComplete}
              isMarkedForReview={markedForReview.includes(question.questionId)}
              isMarkedComplete={markedComplete.includes(question.questionId)}
            />
          ))
        ) : (
          <p>No questions found with the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
