import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const PointsDisplay = ({ points }) => {
  return (
    <motion.div
      className="flex items-center gap-2 bg-indigo-900/50 px-3 py-1 rounded-full"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
    >
      <span className="text-yellow-400">⭐</span>
      <span className="text-yellow-400 font-bold">{points}</span>
      <span className="text-gray-400 text-sm">pts</span>
    </motion.div>
  )
}

PointsDisplay.propTypes = {
  points: PropTypes.number.isRequired
}

export default PointsDisplay