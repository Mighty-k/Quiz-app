import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const QuestionOptions = ({ question, index, selectedOption, onSelect, eliminatedOption }) => {
  if (!question || !question.options) return null

  const getOptionLetter = (option) => {
    const letters = ['A', 'B', 'C', 'D']
    const optionIndex = question.options.indexOf(option)
    return letters[optionIndex] || ''
  }

  const isEliminated = (option) => eliminatedOption === option

  return (
    <div className="space-y-3">
      {question.options.map((option, i) => (
        <motion.div
          key={i}
          whileHover={!isEliminated(option) ? { scale: 1.02 } : {}}
          whileTap={!isEliminated(option) ? { scale: 0.98 } : {}}
          className="flex items-center"
        >
          <input
            type="radio"
            id={`q${index}-opt${i}`}
            name={`q${index}`}
            checked={selectedOption === option}
            onChange={() => !isEliminated(option) && onSelect(index, option)}
            disabled={isEliminated(option)}
            className="hidden"
          />
          <label
            htmlFor={`q${index}-opt${i}`}
            className={`w-full p-4 rounded-lg cursor-pointer transition-all flex items-center gap-3 ${
              selectedOption === option
                ? 'bg-indigo-600 border-indigo-400 border-2'
                : isEliminated(option)
                ? 'bg-gray-800/50 border-gray-700/50 border opacity-40 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 border-gray-600 border'
            }`}
          >
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              selectedOption === option ? 'bg-indigo-500' : 'bg-gray-600'
            }`}>
              {getOptionLetter(option)}
            </span>
            <span className={isEliminated(option) ? 'line-through text-gray-500' : ''}>
              {option}
            </span>
          </label>
        </motion.div>
      ))}
    </div>
  )
}

QuestionOptions.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.string,
    explanation: PropTypes.string
  }),
  index: PropTypes.number.isRequired,
  selectedOption: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  eliminatedOption: PropTypes.string
}

export default QuestionOptions