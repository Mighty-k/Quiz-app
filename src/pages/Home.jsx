import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppButton from "../components/AppButton";
import questionsData from "../data/questions.json";
import PropTypes from "prop-types";

const subjectIcons = {
  Biology: "sparkle",
  Math: "building",
  Physics: "sparkle",
  Chemistry: "sparkle",
  English: "briefcase",
  "General Knowledge": "star",
};

const SubjectCard = ({ name, difficulties, onSelect, expanded, onToggle }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-600 hover:bg-green-700";
      case "medium":
        return "bg-yellow-600 hover:bg-yellow-700";
      case "hard":
        return "bg-red-600 hover:bg-red-700";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all"
      layout
    >
      <motion.div
        className="p-6 cursor-pointer flex justify-between items-center"
        onClick={onToggle}
        layout
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggle}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-lg font-bold text-indigo-300 ring-1 ring-inset ring-indigo-400/20"
            aria-label={`Toggle ${name}`}
          >
            {name.charAt(0)}
          </button>
          <div>
            <h2 className="text-lg font-semibold text-white">{name}</h2>
            <p className="text-sm text-gray-400">
              Choose a difficulty to start
            </p>
          </div>
        </div>
        <span className="text-gray-400">
          {expanded ? "Click to collapse" : "Click to expand"}
        </span>
      </motion.div>

      {expanded && (
        <motion.div
          className="px-6 pb-6 grid grid-cols-3 gap-3"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {Object.keys(difficulties).map((difficulty, index) => (
            <AppButton
              key={index}
              variant="primary"
              size="sm"
              className={getDifficultyColor(difficulty)}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(name, difficulty);
              }}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </AppButton>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [expandedSubject, setExpandedSubject] = useState(null);

  const handleSelect = (subject, difficulty) => {
    navigate("/quiz", { state: { subject, difficulty } });
  };

  const handleToggle = (subjectName) => {
    setExpandedSubject(expandedSubject === subjectName ? null : subjectName);
  };

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
            <h1 className="text-4xl font-bold mb-4">Welcome to QuizMe!</h1>
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
                expanded={expandedSubject === subject.name}
                onToggle={() => handleToggle(subject.name)}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

SubjectCard.propTypes = {
  name: PropTypes.string.isRequired,
  difficulties: PropTypes.objectOf(
    PropTypes.shape({
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string.isRequired,
          options: PropTypes.arrayOf(PropTypes.string).isRequired,
          answer: PropTypes.string.isRequired,
          explanation: PropTypes.string,
        }),
      ).isRequired,
    }),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Home;
