import { useState } from 'react'
import  questions  from './questions'


const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const shuffle = (array) => {
      const shuffledArray = [...array]
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    }

  const [shuffledQuestions, setShuffledQuestions] = useState(shuffle(questions))

  const currentQuest = shuffledQuestions[currentQuestion]

  const handleAnswer = (answer) => {
    const isCorrect = answer === currentQuest.answer
    if (isCorrect) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }  
  return (
    <div className='container '>
      <div className="head">
        <p>Take A Quiz</p>
      </div>
      <div className=" container main text-center">
      {showScore ? (
        <div>
           <div className="score"> You scored {score} out of {shuffledQuestions.length}!</div>
           <button 
                className=' back btn btn-primary' 
                onClick={() =>
                {setShowScore(false); 
                 setScore(0); 
                 setCurrentQuestion(0)
                 setShuffledQuestions(shuffle(questions)) 
                } }>
                Retake quiz
           </button>
        </div>
       

      ) : (
        <div className="quest container">
          <h1>{currentQuest.question}</h1>
         <ul>
        {shuffle(currentQuest.options).map((optn) => (
          <li key={optn}>
              <button className='options btn btn-success g-1' 
              onClick={() => handleAnswer(optn)}>
                {optn}
                </button>
          </li>
           ))}
           </ul>
          {/* <div>
            {currentQuestion + 1}/{shuffledQuestions.length}
          </div> */}
          <progress value={currentQuestion + 1} max={shuffledQuestions.length} ></progress>
        </div>
      )}
      </div>
    </div>
  )
}
export default QuizApp