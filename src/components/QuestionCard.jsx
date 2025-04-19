import { motion } from 'framer-motion'
import PropTypes from 'prop-types';
const QuestionCard = ({ question, index, selectedOption, onSelect }) => {
  if (!question || !question.options) return null

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold mb-6">
        Q{index + 1}: {question.question}
      </h3>
      
      <div className="space-y-4">
        {question.options.map((option, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center"
          >
            <input
              type="radio"
              id={`q${index}-opt${i}`}
              name={`q${index}`}
              checked={selectedOption === option}
              onChange={() => onSelect(index, option)}
              className="hidden"
            />
            <label 
              htmlFor={`q${index}-opt${i}`}
              className={`w-full p-4 rounded-lg cursor-pointer transition-colors ${
                selectedOption === option
                  ? 'bg-indigo-600 border-indigo-400'
                  : 'bg-gray-700 hover:bg-gray-600 border-gray-600'
              } border`}
            >
              {option}
            </label>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
QuestionCard.propTypes = {
    question: PropTypes.shape({
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      answer: PropTypes.string, // Optional if you're using it elsewhere
      explanation: PropTypes.string // Optional
    }).isRequired,
    index: PropTypes.number.isRequired,
    selectedOption: PropTypes.string,
    onSelect: PropTypes.func.isRequired
  };

export default QuestionCard