import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import questionsData from "../data/questions.json";
import Navbar from "../components/Navbar";
import { FaCheck, FaTimes, FaHome } from "react-icons/fa";
import { useEffect } from "react";
import ScoreDisplay from "../components/ScoreDisplay";
import AppButton from "../components/AppButton";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subject, difficulty, selectedOptions, totalPoints } =
    location.state || {};

  // Redirect if no data
  useEffect(() => {
    if (!subject || !difficulty || !selectedOptions) {
      navigate("/");
    }
  }, [subject, difficulty, selectedOptions, navigate]);

  const subjectData = questionsData.find((sub) => sub.name === subject);
  if (!subjectData || !subjectData.difficulties[difficulty]) {
    return <div>Error: Invalid subject or difficulty selected.</div>;
  }

  const questions = subjectData.difficulties[difficulty].questions;

  const calculateResults = () => {
    let correct = 0;
    const results = questions.map((question, index) => {
      const isCorrect = question.answer === selectedOptions[index];
      if (isCorrect) correct++;
      return {
        ...question,
        userAnswer: selectedOptions[index],
        isCorrect,
      };
    });
    return { results, correct, total: questions.length };
  };

  const { results, correct, total } = calculateResults();
  const percentage = Math.round((correct / total) * 100);
  const points = totalPoints || 0;

  return (
    <>
      <Navbar />
      <div className="pt-16 pb-12 px-6 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <ScoreDisplay
            correct={correct}
            total={total}
            points={points}
            percentage={percentage}
          />

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Question Review</h3>

            {results.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-800 rounded-xl p-6 border ${
                  question.isCorrect
                    ? "border-green-500/30"
                    : "border-red-500/30"
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
                    Your answer:{" "}
                    <span
                      className={`font-medium ${
                        question.isCorrect ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {question.userAnswer || "Not answered"}
                    </span>
                  </p>

                  {!question.isCorrect && (
                    <p className="text-gray-400">
                      Correct answer:{" "}
                      <span className="font-medium text-green-500">
                        {question.answer}
                      </span>
                    </p>
                  )}

                  {question.explanation && (
                    <div className="mt-3 p-3 bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Explanation:</span>{" "}
                        {question.explanation}
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
            <AppButton variant="primary" onClick={() => navigate("/")}>
              <FaHome className="inline mr-2" /> Back to Home
            </AppButton>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Results;
