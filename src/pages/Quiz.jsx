import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import questionsData from '../data/questions.json';
import Navbar from '../components/Navbar';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';

const Quiz = () => {
  // State management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Routing
  const location = useLocation();
  const navigate = useNavigate();
  const { subject, difficulty } = location.state || {};

  // Data loading
  const subjectData = questionsData.find((sub) => sub.name === subject);
  const isInvalid = !subjectData || !subjectData.difficulties[difficulty];
  const questions = !isInvalid ? subjectData.difficulties[difficulty].questions : [];

  // Memoized navigation handlers
  const handleNext = useCallback(() => {
    setIsTimerRunning(false);
    const timeoutId = setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setTimer(60);
        setIsTimerRunning(true);
      } else {
        if (window.confirm("Submit your quiz? You can't change answers after.")) {
          navigate('/results', { state: { subject, difficulty, selectedOptions } });
        } else {
          setIsTimerRunning(true);
        }
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [currentIndex, questions.length, navigate, subject, difficulty, selectedOptions]);

  const handlePrevious = useCallback(() => {
    setIsTimerRunning(false);
    const timeoutId = setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setTimer(60);
        setIsTimerRunning(true);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [currentIndex]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      handleNext();
    }
    return () => clearInterval(interval);
  }, [timer, isTimerRunning, handleNext]);

  // Progress persistence
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

  useEffect(() => {
    try {
      const saved = localStorage.getItem('quizProgress');
      if (saved) {
        const { 
          subject: savedSubject, 
          difficulty: savedDiff, 
          currentIndex: savedIndex, 
          selectedOptions: savedOpts 
        } = JSON.parse(saved);
        
        if (savedSubject === subject && savedDiff === difficulty) {
          setCurrentIndex(savedIndex);
          setSelectedOptions(savedOpts);
        }
      }
    } catch (e) {
      console.error("Failed to load progress:", e);
    }
  }, [subject, difficulty]);

  // Option selection handler
  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionIndex]: option
    }));
  };

  if (isInvalid) {
    return <div className="p-4 text-red-500">Error: Invalid subject or difficulty selected.</div>;
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
  );
};

export default Quiz;