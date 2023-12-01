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

  const handleDelete = async (questionId) => {
    // Display a confirmation dialog
    const userConfirmed = window.confirm(
      `Do you really want to delete the question with ID ${questionId}?`
    );

    // If user confirms, proceed with deletion
    if (userConfirmed) {
      // Navigate to the DeleteQuestion component with questionId in the state
      navigate("/deleteQuestions", { state: { questionId } });
    }
  };

  const addQuestion = () => {
    navigate("/addQuestions");
  };

  const updateQuestion = (question) => {
    navigate("/updateQuestions", { state: question });
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
      <hr />
      {checkQuestions ? (
        <div>
          {questionList.map((question) => (
            <div key={question.questionId} className="alert alert-success">
              Question ID: {question.questionId}{" "}
              <button
                className="btn btn-delete"
                onClick={() => handleDelete(question.questionId)}
              >
                Delete
              </button>
              <button className="btn btn-update" onClick={() => updateQuestion(question)}>
                Update
              </button>
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