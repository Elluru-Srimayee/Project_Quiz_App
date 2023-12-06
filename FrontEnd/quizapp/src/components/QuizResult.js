import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function QuizResults() {
  const location = useLocation();
  const [quizResults, setQuizResults] = useState(null);
  const navigate = useNavigate();
  const token=localStorage.getItem("token")
  useEffect(() => {
    // Use the username and quizId from the location state
    const { username, quizId } = location.state;

    // Fetch quiz results based on username and quizId
    fetch(`http://localhost:5057/api/QuizResult/results-with-total-score/${username}/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
      }) .then(async (response) => {
        const data = await response.json();
        setQuizResults(data);
      })
      .catch((error) => console.error("Error fetching quiz results:", error));
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts
  const GoToQuizs=()=>{
    navigate("/quizs");
  }
  
  return (
    <div className="inputcontainer">
      {quizResults && (
        <div>
          <h2>Quiz Results</h2>
          <button className="btn btn-quizs" onClick={GoToQuizs}>GoToQuizs</button>
          <p>Total Score: {quizResults.totalScore}</p>
          <table className="table table-bordered border-primary">
            <thead className="thead-dark">
              <tr>
                <th scope="col">User Answer</th>
                <th scope="col">Result</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {quizResults.quizResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.userAnswer}</td>
                  <td>{result.isCorrect ? "Correct" : "Incorrect"}</td>
                  <td>{result.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default QuizResults;