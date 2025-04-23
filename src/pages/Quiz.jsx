import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import questionsData from '../data/questions.json'
import Navbar from '../components/Navbar'
import QuestionCard from '../components/QuestionCard'
import ProgressBar from '../components/ProgressBar'

const Quiz = () => {
     // 1. First, declare ALL hooks at the top
     const [currentIndex, setCurrentIndex] = useState(0)
     const [selectedOptions, setSelectedOptions] = useState({})
     const [timer, setTimer] = useState(60)
     const [isTimerRunning, setIsTimerRunning] = useState(true)
     
     const location = useLocation()
     const navigate = useNavigate()
     const { subject, difficulty } = location.state || {}
     
     const subjectData = questionsData.find((sub) => sub.name === subject)
     
     // ✅ Conditional navigation still inside useEffect
     useEffect(() => {
       if (!subject || !difficulty) {
         navigate('/')
       }
     }, [subject, difficulty, navigate])
     
     // ✅ Timer logic useEffect
     useEffect(() => {
       let interval
       if (isTimerRunning && timer > 0) {
         interval = setInterval(() => {
           setTimer((prev) => prev - 1)
         }, 1000)
       } else if (timer === 0) {
         handleNext()
       }
       return () => clearInterval(interval)
     }, [timer, isTimerRunning])

// Save progress whenever selectedOptions changes
useEffect(() => {
  const progress = {
    subject,
    difficulty,
    currentIndex,
    selectedOptions,
    timestamp: Date.now(),
  };
  localStorage.setItem('quizProgress', JSON.stringify(progress));
}, [selectedOptions, currentIndex, subject, difficulty]);

// Load saved progress on mount
useEffect(() => {
  const saved = localStorage.getItem('quizProgress');
  if (saved) {
    const { subject: savedSubject, difficulty: savedDiff, currentIndex: savedIndex, selectedOptions: savedOpts } = JSON.parse(saved);
    if (savedSubject === subject && savedDiff === difficulty) {
      setCurrentIndex(savedIndex);
      setSelectedOptions(savedOpts);
    }
  }
}, [subject, difficulty]);
     
     // ✅ Only AFTER hooks, include conditional return
     if (!subjectData || !subjectData.difficulties[difficulty]) {
       return <div>Error: Invalid subject or difficulty selected.</div>
     }
     
     // 🧠 Do this after the return check
     const questions = subjectData.difficulties[difficulty].questions
  

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: option
    })
  }
const handleNext = useCallback(() => {
  setIsTimerRunning(false);
  const timeoutId = setTimeout(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1); // Functional update
      setTimer(60);
      setIsTimerRunning(true);
    } else {
      if (window.confirm("Submit your quiz?")) {
        navigate('/results', { state: { subject, difficulty, selectedOptions } });
      } else {
        setIsTimerRunning(true);
      }
    }
  }, 300);

  return () => clearTimeout(timeoutId);
}, [currentIndex, questions.length, navigate, subject, difficulty, selectedOptions]);

// Timer useEffect (now includes handleNext)
useEffect(() => {
  let interval;
  if (isTimerRunning && timer > 0) {
    interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
  } else if (timer === 0) {
    handleNext();
  }
  return () => clearInterval(interval);
}, [timer, isTimerRunning, handleNext]);

// Debounced localStorage save
useEffect(() => {
  const debounceTimer = setTimeout(() => {
    try {
      localStorage.setItem('quizProgress', JSON.stringify({
        subject,
        difficulty,
        currentIndex,
        selectedOptions,
        timestamp: Date.now(),
      }));
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  }, 500);

  return () => clearTimeout(debounceTimer);
}, [selectedOptions, currentIndex, subject, difficulty]);
  const handlePrevious = () => {
    setIsTimerRunning(false)
    setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
        setTimer(60)
        setIsTimerRunning(true)
      }
    }, 300)
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 px-6 min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {subject} - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </h2>
            <div className="text-lg">
              Question {currentIndex + 1} of {questions.length}
            </div>
          </div>
          
          <ProgressBar 
            current={currentIndex + 1} 
            total={questions.length} 
            timer={timer} 
            maxTime={60} 
          />
          
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionCard
                question={questions[currentIndex]}
                index={currentIndex}
                selectedOption={selectedOptions[currentIndex]}
                onSelect={handleOptionSelect}
              />
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-between mt-8">
            <motion.button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`px-6 py-2 rounded-lg font-medium ${
                currentIndex === 0 
                  ? 'bg-gray-700 cursor-not-allowed' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              whileHover={currentIndex === 0 ? {} : { scale: 1.05 }}
              whileTap={currentIndex === 0 ? {} : { scale: 0.95 }}
            >
              Previous
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              className="px-6 py-2 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
            </motion.button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Quiz