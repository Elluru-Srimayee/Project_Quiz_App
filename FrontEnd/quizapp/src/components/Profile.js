import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [quizId, setQuizId] = useState("");
  const [totalScore, setTotalScore] = useState(null);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const handleSearch = async () => {
    try {
      console.log("Searching for total score...");
      const response = await axios.get(`http://localhost:5057/api/QuizResult/totalscore/${quizId}/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Full response:", response);
  
      // Extract the numerical score from the response
      const totalScoreString = response.data;
      const totalScore = parseInt(totalScoreString.match(/\d+/)[0], 10);
  
      // Check if the totalScore is a valid number
      if (!isNaN(totalScore)) {
        console.log("Parsed Total Score:", totalScore);
        setTotalScore(totalScore);
        setError(null);
      } else {
        console.error("Invalid totalScore:", totalScoreString);
        setError("Failed to fetch total score. Unexpected response structure.");
      }
    } catch (error) {
      console.error("Error fetching total score:", error);
  
      setTotalScore(null);
      setError("Failed to fetch total score. Please check your input and try again.");
    }
  };
  
  
  
  useEffect(() => {
    console.log("Profile component mounted");
    // You can also load additional user information or perform other actions on component mount
  }, []);
    return (
      <div className="quiz">
        <div className="alert alert-quiz">
        <h1>Profile</h1>
        <p>Username: {username}</p>
        <div>
          <label htmlFor="quizId">Quiz ID:</label>
          <input type="text" id="quizId" value={quizId} onChange={(e) => setQuizId(e.target.value)} />
          <button onClick={handleSearch}>Search</button>
        </div>
        <p>Total Score is: {totalScore !== null ? totalScore : "Not available"}</p>
  
  
        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    );
  }
  
  export default Profile;