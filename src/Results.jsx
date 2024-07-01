import { useLocation, useNavigate } from 'react-router-dom';
import questionsData from './questions.json';
import Nav from './Nav';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subject, difficulty, selectedOptions } = location.state;

  // Ensure the selected subject and difficulty exist in the questions data
  const subjectData = questionsData.find((sub) => sub.name === subject);
  if (!subjectData || !subjectData.difficulties[difficulty]) {
    return <div>Error: Invalid subject or difficulty selected.</div>;
  }

  const currentQuestions = subjectData.difficulties[difficulty].questions;

  const calculateScore = () => {
    let score = 0;
    currentQuestions.forEach((question, index) => {
      if (question.answer === selectedOptions[index]) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();

  return (
    <>
      <Nav />
      <div className="results-container container">
        <h2>You got {score} out of {currentQuestions.length} questions correct. </h2>
        
        <ul>
        
          {currentQuestions.map((question, index) => (
            
            <li key={index} className="question-review">
              <div className="container quest-ans">
              <p className='questionn'>Q{index + 1}: {question.question}</p>
              <p className='answer'>
                Your Answer: {selectedOptions[index]}
                {question.answer === selectedOptions[index] ? (
                  <span style={{ color: "rgb(197, 237, 188)" }}> (Correct)</span>
                ) : (
                  <span style={{ color: "rgb(255, 145, 145)" }}> (Wrong)</span>
                )}
              </p>
              
              {question.answer != selectedOptions[index] ? (
                   <p className='correct'>Correct Answer: {question.answer} </p>
                ) : (
                  <span></span>
                )}
            
              </div>
            </li>
           
          ))}
           
        </ul>
        
      
        <div className="back-btn">
          <button  onClick={() => navigate('/')}>Go Home</button>
        </div>
      </div>
    </>
  );
};

export default Results;
