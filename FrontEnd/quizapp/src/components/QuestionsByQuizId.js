import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function QuestionsByQuizId() {
  const [questionList, setQuestionList] = useState([]);
  const [quizIdInput, setQuizIdInput] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.quizId) {
      setQuizIdInput(location.state.quizId.toString());
      getQuestionsByQuizId(location.state.quizId);
    }
  }, [location.state]);

  const getQuestionsByQuizId = (quizId) => {
    fetch(`http://localhost:5057/api/Questions/byquiz/${quizId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        setQuestionList(myData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="inputcontainer">
      <h1 className="alert alert-success">QuestionsByQuizId</h1>
      <p>Quiz Id: {quizIdInput}</p>
      <hr />
      {Array.isArray(questionList) && questionList.length > 0 ? (
        <div>
          {questionList.map((question) => (
            <div key={question.questionId} className="alert alert-success">
              Question: {question.questionTxt}
              <br />
              A: {question.option1}
              <br />
              B: {question.option2}
              <br />
              C: {question.option3}
              <br />
              D: {question.option4}
            </div>
          ))}
        </div>
      ) : (
        <div>No questions available yet</div>
      )}
    </div>
  );
}

export default QuestionsByQuizId;
