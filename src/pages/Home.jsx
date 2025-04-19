import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import questionsData from '../data/questions.json'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import PropTypes from 'prop-types';

const SubjectCard = ({ name, difficulties, onSelect }) => {
  const [expanded, setExpanded] = useState(false)
  
  const handleToggle = () => setExpanded(!expanded)
  const handleDifficultyClick = (difficulty) => onSelect(name, difficulty)

  return (
    <motion.div 
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all"
      whileHover={{ scale: 0.98 }}
      onClick={handleToggle}
      layout
    >
      <motion.div 
        className="p-6 cursor-pointer flex justify-between items-center"
        layout
      >
        <motion.h3 
          className="text-xl font-bold"
          initial={{ fontSize: '1.25rem' }}
          animate={{ fontSize: expanded ? '1rem' : '1.25rem' }}
        >
          {name}
        </motion.h3>
        {expanded ? <FaChevronUp /> : <FaChevronDown />}
      </motion.div>
      
      {expanded && (
        <motion.div 
          className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {Object.keys(difficulties).map((difficulty, index) => (
            <motion.button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                handleDifficultyClick(difficulty)
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                difficulty === 'easy' ? 'bg-green-600 hover:bg-green-700' :
                difficulty === 'medium' ? 'bg-yellow-600 hover:bg-yellow-700' :
                'bg-red-600 hover:bg-red-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}


const Home = () => {
  const navigate = useNavigate()
  
  const handleSelect = (subject, difficulty) => {
    navigate('/quiz', { state: { subject, difficulty } })
  }

  return (
    <>
      <Navbar />
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Welcome to QuizMaster!</h1>
            <p className="text-gray-400 text-lg">
              Test your knowledge across various subjects and difficulty levels
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {questionsData.map((subject, index) => (
              <SubjectCard
                key={index}
                name={subject.name}
                difficulties={subject.difficulties}
                onSelect={handleSelect}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}

SubjectCard.propTypes = {
    name: PropTypes.string.isRequired,
    difficulties: PropTypes.objectOf(
      PropTypes.shape({
        questions: PropTypes.arrayOf(
          PropTypes.shape({
            question: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(PropTypes.string).isRequired,
            answer: PropTypes.string.isRequired,
            explanation: PropTypes.string
          })
        ).isRequired
      })
    ).isRequired,
    onSelect: PropTypes.func.isRequired
  };
  
export default Home