// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// function QuizsByCategory() {
//   const [quizList, setQuizList] = useState([]);
//   const [categoryInput, setCategoryInput] = useState(""); // State to store the input value
//   const navigate = useNavigate();
//   const getQuizs = () => {
//     // Use the categoryInput in the fetch URL
//     fetch(`http://localhost:5057/api/Quiz/category/${categoryInput}`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(async (data) => {
//         var myData = await data.json();
//         console.log(myData);
//         setQuizList(myData);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const handleCategoryChange = (e) => {
//     // Update the categoryInput state when the input changes
//     setCategoryInput(e.target.value);
//   };
//   const handleTakeQuiz = async (quizId) => {
//     // Pass the quizId as state to the QuestionsByQuizId component
//     navigate("/questionsbyid", { state: { quizId } });
//   };

//   const checkQuizs = quizList.length > 0 ? true : false;

//   return (
//     <div className="inputcontainer">
//       <h1 className="alert alert-success">QuizsByCategory</h1>
//       {/* Input field for the category */}
//       <input
//         type="text"
//         placeholder="Enter category"
//         value={categoryInput}
//         onChange={handleCategoryChange}
//       />
//       <button className="btn btn-success" onClick={getQuizs}>
//         Get Quizs by Category
//       </button>
//       <hr />
//       {checkQuizs ? (
//         <div>
//           {quizList.map((quiz) => (
//             <div key={quiz.quizId} className="alert alert-success">
//               Quiz Id:{quiz.quizId}
//               <br/>
//               Quiz Title: {quiz.title}
//               <br />
//               Quiz Description: {quiz.description}
//               <br />
//               Quiz Category: {quiz.category}
//               <br />
//               Quiz TimeLimit: {quiz.timeLimit}
//               <br/>                   
//                     <button
//                         className="btn btn-takequiz"
//                         onClick={() => handleTakeQuiz(quiz.quizId)}> 
//                         Take Quiz
//                     </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>No quizs available for the provided category</div>
//       )}
//     </div>
//   );
// }

// export default QuizsByCategory;
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function QuizsByCategory() {
  const [quizList, setQuizList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of categories when the component mounts
    fetch("http://localhost:5057/api/Quiz/categories", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(async (data) => {
        var categories = await data.json();
        setCategoryList(categories);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
    // Update the categoryInput state when the dropdown selection changes
    setCategoryInput(e.target.value);
  };

  const handleTakeQuiz = async (quizId) => {
    // Pass the quizId as state to the QuestionsByQuizId component
    navigate("/questionsbyid", { state: { quizId } });
  };
  const checkQuizs = quizList.length > 0 ? true : false;
  return (
    <div className="inputcontainer">
      <h1 className="alert alert-success">QuizsByCategory</h1>
      {/* Dropdown menu for the category */}
      <select value={categoryInput} onChange={handleCategoryChange}>
        <option value="">Select a category</option>
        {categoryList.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>{" "}
      <button className="btn btn-success" onClick={getQuizs}>
        Search
      </button>
      <hr />
      {checkQuizs ? (
        <div>
          {quizList.map((quiz) => (
            <div key={quiz.quizId} className="alert alert-success">
              Quiz Id:{quiz.quizId}
              <br/>
              Quiz Title: {quiz.title}
              <br />
              Quiz Description: {quiz.description}
              <br />
              Quiz Category: {quiz.category}
              <br />
              Quiz TimeLimit: {quiz.timeLimit}
              <br/>                   
                    <button
                        className="btn btn-takequiz"
                        onClick={() => handleTakeQuiz(quiz.quizId)}> 
                        Take Quiz
                    </button>
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
