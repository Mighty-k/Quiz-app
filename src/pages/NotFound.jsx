import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6"
    >
      <div className="max-w-md text-center">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          whileHover={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <FaExclamationTriangle className="text-yellow-500 text-6xl mx-auto mb-6" />
        </motion.div>
        
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-gray-300 mb-8">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <FaHome className="mr-2" />
            Return to Home
          </Link>
        </motion.div>

        <p className="text-gray-400 mt-4">
        Try one of these pages: 
        <Link to="/quiz" className="text-indigo-400 ml-2">Quiz</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default NotFound;