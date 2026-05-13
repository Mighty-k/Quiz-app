import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const ScoreDisplay = ({ correct, total, points, percentage }) => {
  const getPerformanceMessage = () => {
    if (percentage >= 80) return "Excellent! You're a master!"
    if (percentage >= 60) return "Good job! You know your stuff!"
    if (percentage >= 40) return "Not bad! Keep practicing!"
    return "Keep learning! You'll get better!"
  }

  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A', color: 'text-green-500' }
    if (percentage >= 80) return { grade: 'B', color: 'text-green-400' }
    if (percentage >= 70) return { grade: 'C', color: 'text-yellow-500' }
    if (percentage >= 60) return { grade: 'D', color: 'text-yellow-400' }
    return { grade: 'F', color: 'text-red-500' }
  }

  const { grade, color } = getGrade()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8 text-center"
    >
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
            <div className="text-center">
              <span className="text-4xl font-bold">{percentage}%</span>
              <span className={`text-2xl font-bold block ${color}`}>{grade}</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-2">
        {correct} out of {total} correct
      </h2>
      <p className="text-xl text-gray-400 mb-4">
        {getPerformanceMessage()}
      </p>

      <div className="flex justify-center gap-6 mt-4">
        <div className="bg-indigo-900/50 px-4 py-2 rounded-lg">
          <span className="text-yellow-400 text-2xl font-bold">{points}</span>
          <span className="text-gray-400 text-sm block">Total Points</span>
        </div>
        <div className="bg-green-900/50 px-4 py-2 rounded-lg">
          <span className="text-green-400 text-2xl font-bold">{correct}</span>
          <span className="text-gray-400 text-sm block">Correct</span>
        </div>
        <div className="bg-red-900/50 px-4 py-2 rounded-lg">
          <span className="text-red-400 text-2xl font-bold">{total - correct}</span>
          <span className="text-gray-400 text-sm block">Wrong</span>
        </div>
      </div>
    </motion.div>
  )
}

ScoreDisplay.propTypes = {
  correct: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired
}

export default ScoreDisplay