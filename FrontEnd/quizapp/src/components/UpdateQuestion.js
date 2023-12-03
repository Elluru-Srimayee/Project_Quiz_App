import axios from "axios";
import { useState} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpdateQuestion() {
  const location = useLocation();
  const [question, setQuestion] = useState(location.state || {});
  const navigate = useNavigate();
  const { questionId, quizId, questionTxt, option1, option2, option3, option4, answer } = question;


  const clickUpdate = () => {
    if (!quizId || !questionId) {
      alert('Quiz ID and Question ID are required for updating.');
      return;
    }
    const token = localStorage.getItem("token");
    const updatedQuestion = {
      questionId,
      questionTxt,
      option1,
      option2,
      option3,
      option4,
      answer,
      quizId,
    };

    axios.put(`http://localhost:5057/api/Questions/update`, updatedQuestion,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert('Question Updated Successfully');
        navigate("/questions");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="inputcontainer">
      <h1 className="alert alert-success">UpdateQuestion</h1>
      <label className="form-control" htmlFor="questionId">Question ID</label>
      <input id="questionId" type="number" className="form-control" value={questionId} readOnly />

      <label className="form-control" htmlFor="quizId">Quiz ID</label>
      <input id="quizId" type="number" className="form-control" value={quizId} readOnly />

      <label className="form-control" htmlFor="qutxt">Question</label>
      <input id="qutxt" type="text" className="form-control" value={questionTxt} onChange={(e) => setQuestion({ ...question, questionTxt: e.target.value })} />

      <label className="form-control" htmlFor="quopt1">Option A</label>
      <input id="quopt1" type="text" className="form-control" value={option1} onChange={(e) => setQuestion({ ...question, option1: e.target.value })} />

      <label className="form-control" htmlFor="quopt2">Option B</label>
      <input id="quopt2" type="text" className="form-control" value={option2} onChange={(e) => setQuestion({ ...question, option2: e.target.value })} />

      <label className="form-control" htmlFor="quopt3">Option C</label>
      <input id="quopt3" type="text" className="form-control" value={option3} onChange={(e) => setQuestion({ ...question, option3: e.target.value })} />

      <label className="form-control" htmlFor="quopt4">Option D</label>
      <input id="quopt4" type="text" className="form-control" value={option4} onChange={(e) => setQuestion({ ...question, option4: e.target.value })} />

      <label className="form-control" htmlFor="quans">Answer</label>
      <input id="quans" type="text" className="form-control" value={answer} onChange={(e) => setQuestion({ ...question, answer: e.target.value })} />

      <button onClick={clickUpdate} className="btn btn-primary">Update Question</button>
    </div>
  );
}

export default UpdateQuestion;
