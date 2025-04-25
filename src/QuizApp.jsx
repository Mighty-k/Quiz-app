import { useState, useEffect } from 'react';
import questions from './questions';

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Initialize questions on first render
  useEffect(() => {
    setShuffledQuestions(shuffleQuestions(questions));
  }, []);

  const shuffleQuestions = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleAnswer = (answer) => {
    const isCorrect = answer === shuffledQuestions[currentQuestion]?.answer;
    if (isCorrect) setScore(score + 1);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  // Early return if questions aren't loaded yet
  if (shuffledQuestions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuest = shuffledQuestions[currentQuestion];

  return (
    <div className='container'>
      <div className="head">
        <p>Take A Quiz</p>
      </div>
      <div className="container main text-center">
        {showScore ? (
          <div>
            <div className="score">
              You scored {score} out of {shuffledQuestions.length}!
            </div>
            <button
              className='back btn btn-primary'
              onClick={() => {
                setShowScore(false);
                setScore(0);
                setCurrentQuestion(0);
                setShuffledQuestions(shuffleQuestions(questions));
              }}
            >
              Retake quiz
            </button>
          </div>
        ) : (
          <div className="quest container">
            <h1>{currentQuest.question}</h1>
            <hr />
            <ul>
              {shuffleQuestions(currentQuest.options).map((optn) => (
                <li key={optn}>
                  <button
                    className='options d-grid gap-2 d-md-block btn btn-success'
                    onClick={() => handleAnswer(optn)}
                  >
                    {optn}
                  </button>
                </li>
              ))}
            </ul>
            <progress value={currentQuestion + 1} max={shuffledQuestions.length} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;