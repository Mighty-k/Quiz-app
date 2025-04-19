import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBrain } from 'react-icons/fa'

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-md py-4 shadow-lg"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <FaBrain className="text-indigo-500 text-2xl" />
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            QuizMe
          </Link>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="px-4 py-2 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Home
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar