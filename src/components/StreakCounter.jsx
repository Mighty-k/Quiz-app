import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'

const StreakCounter = ({ streak }) => {
  return (
    <div className="flex items-center gap-2">
      <motion.span
        className="text-orange-500 text-lg"
        animate={{ scale: streak > 0 ? [1, 1.2, 1] : 1 }}
        transition={{ repeat: streak > 0 ? Infinity : 0, duration: 0.5 }}
      >
        🔥
      </motion.span>
      <AnimatePresence mode="wait">
        <motion.span
          key={streak}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="text-orange-400 font-bold"
        >
          {streak}
        </motion.span>
      </AnimatePresence>
      <span className="text-gray-400 text-sm">streak</span>
    </div>
  )
}

StreakCounter.propTypes = {
  streak: PropTypes.number.isRequired
}

export default StreakCounter