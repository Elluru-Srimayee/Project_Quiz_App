import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function DeleteQuiz() {
  const location = useLocation();
  const quizId = location.state && location.state.quizId;
  const token=localStorage.getItem("token");
  useEffect(() => {
    const clickDelete = async () => {
      if (!quizId) {
        alert("QuizId is required for deleting.");
        return;
      }

      try {
        await axios.delete(`http://localhost:5057/api/Quiz/${quizId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        alert("Quiz Deleted Successfully");
      } catch (error) {
        console.log(error);
        alert("Error deleting quiz");
      }
    };

    // Execute deletion logic upon mounting
    clickDelete();
  }, [quizId]); // Only run the effect when quizId changes

  return (
    <div className="inputcontainer">
      <h1 className="alert alert-quiz">DeleteQuiz</h1>
      <label className="form-control" htmlFor="quizId">
        Quiz ID: {quizId}
      </label>
    </div>
  );
}

export default DeleteQuiz;
