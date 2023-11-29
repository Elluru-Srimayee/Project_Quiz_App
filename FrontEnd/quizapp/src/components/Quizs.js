import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Quiz.css";
function Quizs() {
  const [quizList, setQuizList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getQuizs();
  }, []); 

  const getQuizs = () => {
    fetch('http://localhost:5057/api/Quiz', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        setQuizList(myData);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleTakeQuiz = async (quizId) => {
    // Pass the quizId as state to the QuestionsByQuizId component
    navigate("/questionsbyid", { state: { quizId } });
  };

  return (
    <div className="quiz">
      <h1 className="alert alert-success">Quizs</h1>
      <hr />
      {quizList.length > 0 ? (
        <div>
          {quizList.map((quiz) => (
            <div key={quiz.quizId} className="alert alert-success">
              Quiz Id: {quiz.quizId}
              <br />
              Quiz Title: {quiz.title}
              <br />
              Quiz Description: {quiz.description}
              <br />
              Quiz Category: {quiz.category}
              <br />
              Quiz TimeLimit: {quiz.timeLimit}
              <br />
              <button
                className="btn btn-takequiz"
                onClick={() => handleTakeQuiz(quiz.quizId)}
              >
                Take Quiz
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>No quizzes available yet</div>
      )}
    </div>
  );
}

export default Quizs;
