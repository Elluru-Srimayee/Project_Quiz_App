import { useState } from "react";

function QuizsByCategory() {
  const [quizList, setQuizList] = useState([]);
  const [categoryInput, setCategoryInput] = useState(""); // State to store the input value

  const getQuizs = () => {
    // Use the categoryInput in the fetch URL
    fetch(`http://localhost:5057/api/Quiz/category/${categoryInput}`, {
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
  };

  const handleCategoryChange = (e) => {
    // Update the categoryInput state when the input changes
    setCategoryInput(e.target.value);
  };

  const checkQuizs = quizList.length > 0 ? true : false;

  return (
    <div>
      <h1 className="alert alert-success">QuizsByCategory</h1>
      {/* Input field for the category */}
      <input
        type="text"
        placeholder="Enter category"
        value={categoryInput}
        onChange={handleCategoryChange}
      />
      <button className="btn btn-success" onClick={getQuizs}>
        Get Quizs by Category
      </button>
      <hr />
      {checkQuizs ? (
        <div>
          {quizList.map((quiz) => (
            <div key={quiz.quizId} className="alert alert-primary">
              Quiz Title: {quiz.title}
              <br />
              Quiz Description: {quiz.description}
              <br />
              Quiz Category: {quiz.category}
              <br />
              Quiz TimeLimit: {quiz.timeLimit}
            </div>
          ))}
        </div>
      ) : (
        <div>No quizs available for the provided category</div>
      )}
    </div>
  );
}

export default QuizsByCategory;
