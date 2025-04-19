import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import NotFound from './pages/NotFound'
import './index.css'

function App() {
  return (
    <Router>
      <AnimatePresence mode='wait'>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  )
}

export default App