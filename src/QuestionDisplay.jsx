import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import questionsData from './questions.json';
import QuestionRow from './QuestionRows';
import { motion } from 'framer-motion';
import Nav from './Nav';
// import './QuestionDisplay.css';

const QuestionDisplay = () => {
  const location = useLocation();
  const { subject, difficulty } = location.state;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  const questionsPerPage = 4;

  // Ensure the selected subject and difficulty exist in the questions data
  const subjectData = questionsData.find((sub) => sub.name === subject);
  if (!subjectData || !subjectData.difficulties[difficulty]) {
    return <div>Error: Invalid subject or difficulty selected.</div>;
  }

  const currentQuestions = subjectData.difficulties[difficulty].questions;

  const totalPages = Math.ceil(currentQuestions.length / questionsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOptionChange = (questionIndex, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: option
    });
  };

  const displayedQuestions = currentQuestions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  return (
    <>
    <Nav/>
        <div className="question-display container">
      {displayedQuestions.map((question, index) => (
        <QuestionRow
          key={index}
          question={question}
          index={index + currentPage * questionsPerPage}
          handleOptionChange={handleOptionChange}
          selectedOption={selectedOptions[index + currentPage * questionsPerPage]}
        />
      ))}

      <div className="pagination-buttons">
        {currentPage > 0 && (
           <motion.button
           onClick={handlePreviousPage}
           whileTap={{ scale: 0.95 }}
           transition={{ type: 'spring', stiffness: 300 }}
         >
           Previous
         </motion.button>
       )}
       {currentPage < totalPages - 1 && (
         <motion.button
           onClick={handleNextPage}
           whileTap={{ scale: 0.95 }}
           transition={{ type: 'spring', stiffness: 300 }}
         >
           Next
         </motion.button>   
        )}
      </div>
    </div>
    </>
    
  );
};

export default QuestionDisplay;
