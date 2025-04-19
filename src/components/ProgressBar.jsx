import { motion } from 'framer-motion'
import PropTypes from 'prop-types';
const ProgressBar = ({ current, total, timer, maxTime }) => {
  const progress = (current / total) * 100
  const timeProgress = (timer / maxTime) * 100

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span>Progress: {current}/{total}</span>
        <span className={`font-medium ${
          timer < 10 ? 'text-red-500' : 'text-gray-400'
        }`}>
          Time: {timer}s
        </span>
      </div>
      
      <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden mb-1">
        <motion.div
          className="h-full bg-indigo-600"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${
            timeProgress < 20 ? 'bg-red-500' : 'bg-yellow-500'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: `${timeProgress}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  )
}
ProgressBar.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  maxTime: PropTypes.number.isRequired
};

export default ProgressBar