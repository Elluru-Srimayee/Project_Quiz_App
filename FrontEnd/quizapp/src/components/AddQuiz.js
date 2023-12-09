import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [timeLimit, setTimeLimit] = useState("0"); 
  const token=localStorage.getItem("token");
  const navigate=useNavigate();
  const clickAdd = () => {
    // Check if required fields are provided
    if (!title || !description || !category) {
      alert("Title, Description, and Category are required fields.");
      return;
    }

    const quiz = {
      title: title,
      description: description,
      category: category,
      timeLimit: timeLimit || null, // Set to null if timeLimit is empty
    };

    console.log(quiz);

    fetch("http://localhost:5057/api/Quiz", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quiz),
    })
      .then(async(response) => {
        if(!response.ok){
          throw new Error(`Error: ${response.statusText}`);
        }
        alert("Quiz Added successfully");
        navigate("/quizList");
      })
      .catch((e) => {
          alert("Please provide all values and timelimit should be integer");
        console.log(e);
      });
  };

  return (
    <div className="inputcontainer">
      <h1 className="alert alert-quiz">Quiz Details</h1>
      <div class="form-floating mb-3">
      <input
        id="floatingInput"
        type="text"
        className="form-control"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <label htmlFor="floatingInput">
        Quiz Title
      </label>
      </div>
      <div class="form-floating mb-3">
      <input
        id="floatingInput"
        type="text"
        className="form-control"
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <label htmlFor="floatingInput">
        Quiz Description
      </label>
      </div>
      <div class="form-floating mb-3">
      <input
        id="floatingInput"
        type="text"
        className="form-control"
        placeholder="Quiz Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <label htmlFor="floatingInput">
        Quiz Category
      </label>
      </div>
      <div class="form-floating mb-3">
      <input
        id="floatingInput"
        type="number"
        className="form-control"
        value={timeLimit}
        placeholder="Please provide integer value in minutes."
        onChange={(e) => {
          setTimeLimit(e.target.value);
        }}
      />
      <label htmlFor="floatingInput">
        Integer timeLimit in Minutes
      </label>
      </div>
      <button onClick={clickAdd} className="btn btn-primary">
        Add Quiz
      </button>
    </div>
  );
}

export default AddQuiz;
