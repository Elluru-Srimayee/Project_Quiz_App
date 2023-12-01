import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Questions.css";

function Questions() {
  const [questionList, setQuestionList] = useState([]);
  const navigate = useNavigate();

  var getQuestions = () => {
    fetch("http://localhost:5057/api/Questions/getAll", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (data) => {
        var myData = await data.json();
        await console.log(myData);
        await setQuestionList(myData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addQuestion = () => {
    navigate("/addQuestions");
  };
  const addQuiz=()=>{
    navigate("/addQuiz");
  };

  var checkQuestions = questionList.length > 0 ? true : false;

  return (
    <div className="question">
      <h1 className="alert alert-success">Questions</h1>
      <button className="btn btn-success" onClick={getQuestions}>
        Get All Questions
      </button>
      <button className="btn btn-primary" onClick={addQuestion}>
        Add Question
      </button>
      <button className="btn btn-primary" onClick={addQuiz}>
        Add Quiz
      </button>
      <hr />
      {checkQuestions ? (
        <div>
          {questionList.map((question) => (
            <div key={question.questionId} className="alert alert-success">
              Question ID: {question.questionId}
              <br />
              Question: {question.questionTxt}
              <br />
              Option A: {question.option1}
              <br />
              Option B: {question.option2}
              <br />
              Option C: {question.option3}
              <br />
              Option D: {question.option4}
              <br />
              Quiz ID: {question.quizId}
            </div>
          ))}
        </div>
      ) : (
        <div>No questions available yet</div>
      )}
    </div>
  );
}

export default Questions;
