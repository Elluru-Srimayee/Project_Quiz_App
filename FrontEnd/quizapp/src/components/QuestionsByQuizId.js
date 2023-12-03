// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function QuestionsByQuizId() {
//   const [questionList, setQuestionList] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const token=localStorage.getItem("token");

//   useEffect(() => {
//     if (location.state && location.state.quizId) {
//       checkQuizCompletion(location.state.quizId);
//       getQuestionsByQuizId(location.state.quizId);
//     }
//   }, [location.state]);

//   const checkQuizCompletion = (quizId) => {
//     const username = localStorage.getItem("username");

//     fetch(`http://localhost:5057/api/QuizResult/results-with-total-score/${username}/${quizId}`,{
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }).then(async (response) => {
//         const data = await response.json();

//         if (data.quizResults.length > 0) {
//           alert("You have already completed this quiz. Multiple attempts are not allowed.");
//           navigate("/quizs");
//         } else {
//           getQuestionsByQuizId(quizId);
//         }
//       })
//       .catch((error) => console.error("Error checking quiz completion:", error));
//   };

//   const getQuestionsByQuizId = (quizId) => {
//     if (quizCompleted) {
//       alert("You have already completed this quiz. Multiple attempts are not allowed.");
//       navigate("/quizs");
//     } else {
//       fetch(`http://localhost:5057/api/Questions/byquiz/${quizId}`, {
//         method: 'GET',
//         headers: {
//           'Accept': 'application/json',
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       })
//         .then(async (data) => {
//           var myData = await data.json();
//           setQuestionList(myData);
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     }
//   };

//   const handleOptionChange = (option) => {
//     setSelectedOption(option);
//   };

  

//   const handleEvaluate = () => {
//     if (location.state.quizId && localStorage.getItem("username") && questionList.length > 0) {
//       const optionIndex = ['A', 'B', 'C', 'D'].indexOf(selectedOption);
//       const userAnswerValue = questionList[currentQuestionIndex][`option${optionIndex + 1}`];

//       const evaluationData = {
//         quizId: parseInt(location.state.quizId),
//         username: localStorage.getItem("username"),
//         questionId: questionList[currentQuestionIndex].questionId,
//         userAnswer: userAnswerValue,
//       };

//       fetch(`http://localhost:5057/api/Quiz/evaluate/${location.state.quizId}`, {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(evaluationData),
//       })
//         .then(async (response) => {
//           const data = await response.json();
//           if (currentQuestionIndex + 1 < questionList.length) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//             setSelectedOption(null);
//           } else {
//             navigate("/quizresult", {
//               state: {
//                 username: localStorage.getItem("username"),
//                 quizId: location.state.quizId,
//               },
//             });
//           }
//         })
//         .catch((error) => console.error('Error evaluating quiz:', error));
//     } else {
//       alert('Please provide all required fields.');
//     }
//   };

//   return (
//     <div className="inputcontainer">
//       <h1 className="alert alert-success">QuestionsByQuizId</h1>
//       {questionList.length > 0 && currentQuestionIndex < questionList.length ? (
//         <div>
//           <div className="alert alert-success">
//             Question: {questionList[currentQuestionIndex].questionTxt}
//           </div>
//           <form>
//             {['A', 'B', 'C', 'D'].map((option, index) => (
//               <div key={index} className="form-check">
//                 <input
//                   type="radio"
//                   id={`option${index}`}
//                   name="options"
//                   value={option}
//                   checked={selectedOption === option}
//                   onChange={() => handleOptionChange(option)}
//                   className="form-check-input"
//                 />
//                 <label htmlFor={`option${index}`} className="form-check-label">
//                   {option}: {questionList[currentQuestionIndex][`option${index + 1}`]}
//                 </label>
//               </div>
//             ))}
//           </form>
//           <button className="btn btn-primary" onClick={handleEvaluate}>
//             Next
//           </button>
//         </div>
//       ) : (
//         <div>
//           {questionList.length === 0 ? (
//             <p>No questions available for this quiz.</p>
//           ) : (
//             <p>No more questions available.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default QuestionsByQuizId;

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function QuestionsByQuizId() {
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(null);
  const [timeLimit, setTimeLimit] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log('useEffect triggered');
    if (location.state && location.state.quizId && location.state.timeLimit) {
      checkQuizCompletion(location.state.quizId);
      getQuestionsByQuizId(location.state.quizId);
      setTimeLimit(location.state.timeLimit); // Set the time limit in minutes
      setTimeRemaining(location.state.timeLimit * 60); // Set initial time remaining in seconds
    }
  }, [location.state]);

  useEffect(() => {
    if (timeRemaining > 0) {
      setTimer(setInterval(handleTimerTick, 1000));
    }
    return () => {
      clearInterval(timer); // Cleanup the timer on component unmount
    };
  }, [timeRemaining]);

  const handleTimerTick = () => {
    setTimeRemaining((prevTime) => {
      if (prevTime > 0) {
        console.log(timeLimit);
        return prevTime - 1;
      } else {
        clearInterval(timer);
        handleQuizCompletion();
        return 0;
      }
    });
  };

  const checkQuizCompletion = (quizId) => {
    const username = localStorage.getItem("username");

    fetch(`http://localhost:5057/api/QuizResult/results-with-total-score/${username}/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (data.quizResults.length > 0) {
          alert("You have already completed this quiz. Multiple attempts are not allowed.");
          navigate("/quizs");
        } else {
          getQuestionsByQuizId(quizId);
        }
      })
      .catch((error) => console.error("Error checking quiz completion:", error));
  };

  const getQuestionsByQuizId = (quizId) => {
    fetch(`http://localhost:5057/api/Questions/byquiz/${quizId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        setQuestionList(myData);

        if (myData.length > 0 && myData[0].timeLimit) {
          setTimeLimit(myData[0].timeLimit);
          setTimeRemaining(myData[0].timeLimit * 60); // Update time remaining when time limit changes
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleEvaluate = () => {
    if (location.state.quizId && localStorage.getItem("username") && questionList.length > 0) {
      const optionIndex = ['A', 'B', 'C', 'D'].indexOf(selectedOption);
      const userAnswerValue = questionList[currentQuestionIndex][`option${optionIndex + 1}`];

      const evaluationData = {
        quizId: parseInt(location.state.quizId),
        username: localStorage.getItem("username"),
        questionId: questionList[currentQuestionIndex].questionId,
        userAnswer: userAnswerValue,
      };

      fetch(`http://localhost:5057/api/Quiz/evaluate/${location.state.quizId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(evaluationData),
      })
        .then(async (response) => {
          const data = await response.json();
          if (currentQuestionIndex + 1 < questionList.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
          } else {
            handleQuizCompletion();
          }
        })
        .catch((error) => console.error('Error evaluating quiz:', error));
    } else {
      alert('Please provide all required fields.');
    }
  };

  const handleQuizCompletion = () => {
    clearInterval(timer); // Stop the timer when quiz is completed
    navigate("/quizresult", {
      state: {
        username: localStorage.getItem("username"),
        quizId: location.state.quizId,
      },
    });
  };

  return (
    <div className="inputcontainer">
      <h1 className="alert alert-success">Quiz</h1>
      {timeRemaining > 0 && (
        <div className="alert alert-info">
          Time Remaining: {Math.floor(timeRemaining / 60).toString().padStart(2, '0')}:{(timeRemaining % 60).toString().padStart(2, '0')}
        </div>
      )}
      {questionList.length > 0 && currentQuestionIndex < questionList.length ? (
        <div>
          <div className="alert alert-success">
            Question: {questionList[currentQuestionIndex].questionTxt}
          </div>
          <form>
            {['A', 'B', 'C', 'D'].map((option, index) => (
              <div key={index} className="form-check">
                <input
                  type="radio"
                  id={`option${index}`}
                  name="options"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                  className="form-check-input"
                />
                <label htmlFor={`option${index}`} className="form-check-label">
                  {option}: {questionList[currentQuestionIndex][`option${index + 1}`]}
                </label>
              </div>
            ))}
          </form>
          <button className="btn btn-primary" onClick={handleEvaluate}>
            Next
          </button>
        </div>
      ) : (
        <div>
          {questionList.length === 0 ? (
            <p>No questions available for this quiz.</p>
          ) : (
            <p>No more questions available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionsByQuizId;

