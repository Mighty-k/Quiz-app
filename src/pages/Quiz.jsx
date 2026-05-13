import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import questionsData from "../data/questions.json";
import Navbar from "../components/Navbar";
import useSound from "../hooks/useSound";
import StreakCounter from "../components/StreakCounter";
import PointsDisplay from "../components/PointsDisplay";
import QuizTimer from "../components/QuizTimer";
import QuestionOptions from "../components/QuestionOptions";
import HintModal from "../components/HintModal";
import { FaLightbulb, FaForward } from "react-icons/fa";
import AppButton from "../components/AppButton";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [eliminatedOption, setEliminatedOption] = useState(null);
  const [showHintModal, setShowHintModal] = useState(false);

  const { playCorrect, playIncorrect, playComplete, playWarning } = useSound();

  const location = useLocation();
  const navigate = useNavigate();
  const { subject, difficulty } = location.state || {};

  const subjectData = questionsData.find((sub) => sub.name === subject);
  const isInvalid = !subjectData || !subjectData.difficulties[difficulty];
  const questions = useMemo(
    () => (!isInvalid ? subjectData.difficulties[difficulty].questions : []),
    [isInvalid, subjectData, difficulty],
  );

  const handleNext = useCallback(() => {
    setIsTimerRunning(false);

    const currentAnswer = selectedOptions[currentIndex];
    const correctAnswer = questions[currentIndex]?.answer;

    if (currentAnswer === correctAnswer) {
      setStreak((s) => s + 1);
      setPoints((p) => p + 10);
      playCorrect();
    } else if (currentAnswer) {
      setStreak(0);
      playIncorrect();
    }

    const timeoutId = setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setTimer(60);
        setIsTimerRunning(true);
        setEliminatedOption(null);
      } else {
        playComplete();
        navigate("/results", {
          state: {
            subject,
            difficulty,
            selectedOptions,
            totalPoints:
              points +
              (selectedOptions[currentIndex] === correctAnswer ? 10 : 0),
            streak,
          },
        });
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [
    currentIndex,
    questions,
    navigate,
    subject,
    difficulty,
    selectedOptions,
    playCorrect,
    playIncorrect,
    playComplete,
    streak,
    points,
  ]);

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

  const handleSkip = () => {
    setStreak(0);
    handleNext();
  };

  const handleHint = () => {
    const currentQuestion = questions[currentIndex];
    const wrongOptions = currentQuestion.options.filter(
      (o) => o !== currentQuestion.answer,
    );
    if (wrongOptions.length > 0) {
      const randomWrong =
        wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
      setEliminatedOption(randomWrong);
      setPoints((p) => p - 3);
    }
    setShowHintModal(false);
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNext();
    }
    return () => clearInterval(interval);
  }, [timer, isTimerRunning, handleNext]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      try {
        localStorage.setItem(
          "quizProgress",
          JSON.stringify({
            subject,
            difficulty,
            currentIndex,
            selectedOptions,
            timestamp: Date.now(),
          }),
        );
      } catch (e) {
        console.error("Failed to save progress:", e);
      }
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [selectedOptions, currentIndex, subject, difficulty]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("quizProgress");
      if (saved) {
        const {
          subject: savedSubject,
          difficulty: savedDiff,
          currentIndex: savedIndex,
          selectedOptions: savedOpts,
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

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  if (isInvalid) {
    return (
      <div className="p-4 text-red-500">
        Error: Invalid subject or difficulty selected.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-12 px-6 min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">
                {subject} -{" "}
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </h2>
              <p className="text-gray-400 text-sm">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <StreakCounter streak={streak} />
              <PointsDisplay points={points} />
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <QuizTimer
              timeLeft={timer}
              maxTime={60}
              onTimeUp={handleNext}
              playWarning={playWarning}
            />
            <div className="flex gap-2">
              <AppButton
                variant="ghost"
                size="sm"
                onClick={() => setShowHintModal(true)}
                disabled={eliminatedOption !== null}
              >
                <FaLightbulb className="mr-1" /> Hint (-3 pts)
              </AppButton>
              <AppButton variant="ghost" size="sm" onClick={handleSkip}>
                <FaForward className="mr-1" /> Skip
              </AppButton>
            </div>
          </div>

          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: "0%" }}
              animate={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-6">
                {questions[currentIndex].question}
              </h3>

              <QuestionOptions
                question={questions[currentIndex]}
                index={currentIndex}
                selectedOption={selectedOptions[currentIndex]}
                onSelect={handleOptionSelect}
                eliminatedOption={eliminatedOption}
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <AppButton
              variant={currentIndex === 0 ? "ghost" : "primary"}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </AppButton>

            <AppButton variant="primary" onClick={handleNext}>
              {currentIndex === questions.length - 1 ? "Submit" : "Next"}
            </AppButton>
          </div>
        </div>

        <HintModal
          isOpen={showHintModal}
          onConfirm={handleHint}
          onCancel={() => setShowHintModal(false)}
          pointCost={3}
        />
      </div>
    </>
  );
};

export default Quiz;
