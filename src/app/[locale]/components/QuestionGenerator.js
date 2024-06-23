// src/utils/QuestionGenerator.js
const generateQuestions = (text) => {
    const questions = [];
    const lines = text.split('\n');
    let currentQuestion = null;
    let currentId = 1;
  
    const processMathSymbols = (input) => {
      return input.replace(/\\\((.*?)\\\)/g, '$$$1$$').replace(/\\\[(.*?)\\\]/g, '$$$1$$');
    };
  
    lines.forEach(line => {
      const questionMatch = line.match(/^\d+\.\s*(.+)$/);
      const optionMatch = line.match(/^[A-D]\.\s*(.+)$/);
  
      if (questionMatch) {
        if (currentQuestion) {
          if (currentQuestion.options.length > 0) {
            questions.push(currentQuestion);
          } else {
            console.error(`Question ${currentQuestion.questionId} has no options and was not added.`);
          }
        }
        currentQuestion = {
          questionId: `${currentId++}`,
          text: processMathSymbols(questionMatch[1]),
          options: [],
          correctOption: null
        };
      } else if (optionMatch) {
        if (currentQuestion) {
          currentQuestion.options.push(processMathSymbols(optionMatch[1]));
        }
      }
    });
  
    if (currentQuestion && currentQuestion.options.length > 0) {
      questions.push(currentQuestion);
    }
  
    return questions;
  };
  
  export default generateQuestions;
  