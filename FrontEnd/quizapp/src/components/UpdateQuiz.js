import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function UpdateQuiz() {
  const location = useLocation();
  const [quiz, setQuiz] = useState(location.state || {});
  const { quizId, title, description, category, timeLimit } = quiz;
  const navigate=useNavigate();
  const clickUpdate = () => {
    if (!quizId) {
      alert('Quiz ID is required for updating.');
      return;
    }
    const token=localStorage.getItem("token");
    const updatedQuiz = {
      quizId,
      title,
      description,
      category,
      timeLimit,
    };

    axios.put("http://localhost:5057/api/Quiz/update", updatedQuiz,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(() => {
        alert('Quiz Updated');
        navigate("/quizList");
      })
      .catch((e) => {
        if(e.response.data.title==="One or more validation errors occurred."){
          alert('Please check the data and timeLimit should be an integer');
        }
        console.log(e);
      });
  };

  return (
    <div className="inputcontainer">
      <h1 className="alert alert-quiz">UpdateQuiz</h1>
      <label className="form-control" htmlFor="quizId">Quiz ID</label>
      <input id="quizId" type="number" className="form-control" value={quizId} readOnly />
      <label className="form-control" htmlFor="qtitle">Quiz Title</label>
      <input id="qtitle" type="text" className="form-control" value={title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />

      <label className="form-control" htmlFor="qdescr">Quiz Description</label>
      <input id="qdescr" type="text" className="form-control" value={description} onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />

      <label className="form-control" htmlFor="qcate">Quiz Category</label>
      <input id="qcate" type="text" className="form-control" value={category} readOnly/>

      <label className="form-control" htmlFor="qtime">Quiz TimeLimit</label>
      <input id="qtime" type="number" className="form-control" value={timeLimit} onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.value })} />

      <button onClick={clickUpdate} className="btn btn-primary">Update Quiz</button>
    </div>
  );
}

export default UpdateQuiz;
