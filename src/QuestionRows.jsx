import { motion } from "framer-motion";

const QuestionRow = ({ question, index, handleOptionChange, selectedOption }) => {
  // Add a check to ensure question and question.options are defined
  if (!question || !question.options) {
    return null; // Or display a loading/error message
  }

  return (
    <div className="question-row container row">
        <div className="container col">
        <h4>Q{index + 1}:  {question.question}</h4> 
        
        {question.options.map((option, i) => (
        <div className="radio-container" key={i}>
          <motion.input
            type="radio"
            id={`question-${index}-option-${i}`}
            name={`question-${index}`}
            value={option}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(index, option)}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <label htmlFor={`question-${index}-option-${i}`} className="custom-radio"></label>
          <motion.label
           htmlFor={`question-${index}-option-${i}`} 
           className="radio-label"
           key={i}
             whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 , duration:0.01}}
           >{option}</motion.label>
        </div>
      ))}
      
        </div>
      
    </div>
  );
};

export default QuestionRow;
