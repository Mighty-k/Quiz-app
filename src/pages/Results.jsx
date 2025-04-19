import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import questionsData from '../data/questions.json'
import Navbar from '../components/Navbar'
import { FaCheck, FaTimes, FaHome, FaTrophy } from 'react-icons/fa'
import { useEffect } from 'react'


const Results = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { subject, difficulty, selectedOptions } = location.state || {}

  // Redirect if no data
  useEffect(() => {
    if (!subject || !difficulty || !selectedOptions) {
      navigate('/')
    }
  }, [subject, difficulty, selectedOptions, navigate])

  const subjectData = questionsData.find((sub) => sub.name === subject)
  if (!subjectData || !subjectData.difficulties[difficulty]) {
    return <div>Error: Invalid subject or difficulty selected.</div>
  }

  const questions = subjectData.difficulties[difficulty].questions

  const calculateResults = () => {
    let correct = 0
    const results = questions.map((question, index) => {
      const isCorrect = question.answer === selectedOptions[index]
      if (isCorrect) correct++
      return {
        ...question,
        userAnswer: selectedOptions[index],
        isCorrect
      }
    })
    return { results, correct, total: questions.length }
  }

  const { results, correct, total } = calculateResults()
  const percentage = Math.round((correct / total) * 100)

  const getPerformanceMessage = () => {
    if (percentage >= 80) return "Excellent! You're a master!"
    if (percentage >= 60) return "Good job! You know your stuff!"
    if (percentage >= 40) return "Not bad! Keep practicing!"
    return "Keep learning! You'll get better!"
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 px-6 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
                  <span className="text-4xl font-bold">{percentage}%</span>
                </div>
                <FaTrophy className="absolute -top-2 -right-2 text-yellow-400 text-3xl" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-2">
              {correct} out of {total} correct
            </h2>
            <p className="text-xl text-gray-400 mb-6">
              {getPerformanceMessage()}
            </p>
            <p className="text-lg">
              Subject: <span className="font-medium">{subject}</span> | 
              Difficulty: <span className={`font-medium ${
                difficulty === 'easy' ? 'text-green-500' :
                difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            </p>
          </motion.div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Question Review</h3>
            
            {results.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-800 rounded-xl p-6 border ${
                  question.isCorrect ? 'border-green-500/30' : 'border-red-500/30'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold">
                    Q{index + 1}: {question.question}
                  </h4>
                  {question.isCorrect ? (
                    <FaCheck className="text-green-500 text-xl" />
                  ) : (
                    <FaTimes className="text-red-500 text-xl" />
                  )}
                </div>
                
                <div className="space-y-3">
                  <p className="text-gray-400">
                    Your answer: <span className={`font-medium ${
                      question.isCorrect ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {question.userAnswer || 'Not answered'}
                    </span>
                  </p>
                  
                  {!question.isCorrect && (
                    <p className="text-gray-400">
                      Correct answer: <span className="font-medium text-green-500">
                        {question.answer}
                      </span>
                    </p>
                  )}
                  
                  {question.explanation && (
                    <div className="mt-3 p-3 bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Explanation:</span> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700 inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHome /> Back to Home
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Results