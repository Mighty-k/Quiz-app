import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const QuizTimer = ({ timeLeft, maxTime, onTimeUp, playTick, playWarning }) => {
  const [hasPlayedWarning, setHasPlayedWarning] = useState(false)

  useEffect(() => {
    if (timeLeft <= 10 && timeLeft > 0 && !hasPlayedWarning && playWarning) {
      playWarning()
      setHasPlayedWarning(true)
    }
  }, [timeLeft, hasPlayedWarning, playWarning])

  useEffect(() => {
    if (timeLeft === maxTime) {
      setHasPlayedWarning(false)
    }
  }, [timeLeft, maxTime])

  const progress = (timeLeft / maxTime) * 100
  const isLow = timeLeft <= 10

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 transform -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-gray-700"
          />
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeLinecap="round"
            className={isLow ? 'text-red-500' : 'text-indigo-500'}
            initial={{ strokeDasharray: 126 }}
            animate={{
              strokeDasharray: `${(progress / 100) * 126} 126`
            }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${
          isLow ? 'text-red-500' : 'text-gray-300'
        }`}>
          {timeLeft}
        </span>
      </div>
    </div>
  )
}

QuizTimer.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  maxTime: PropTypes.number.isRequired,
  onTimeUp: PropTypes.func,
  playTick: PropTypes.func,
  playWarning: PropTypes.func
}

export default QuizTimer