import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppButton from './AppButton'
import PropTypes from 'prop-types'

const DifficultySelector = ({ difficulties, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600 hover:bg-green-700'
      case 'medium': return 'bg-yellow-600 hover:bg-yellow-700'
      case 'hard': return 'bg-red-600 hover:bg-red-700'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="mt-4">
      <AppButton
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        Select Difficulty
      </AppButton>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-3 gap-2 mt-3"
          >
            {Object.keys(difficulties).map((difficulty) => (
                <AppButton
                key={difficulty}
                variant="primary"
                size="sm"
                className={getDifficultyColor(difficulty)}
                onClick={() => {
                  onSelect(difficulty)
                  setIsOpen(false)
                }}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </AppButton>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

DifficultySelector.propTypes = {
  difficulties: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default DifficultySelector