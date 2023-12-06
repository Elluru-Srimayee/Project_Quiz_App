import React, { useState, useEffect } from "react";

function Leaderboard() {
  const [quizId, setQuizId] = useState("");
  const [leaderboard, setLeaderboard] = useState(null);
  const [titleList, setTitleList] = useState([]);
  const [titleInput, setTitleInput] = useState("");

  const fetchLeaderboard = (quizId) => {
    // Make sure quizId is provided
    if (quizId) {
      // Get the token from local storage
      const token = localStorage.getItem("token");

      // Fetch leaderboard based on quizId with the authorization header
      fetch(`http://localhost:5057/api/Quiz/leaderboard/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (response) => {
          if (response.status === 404) {
            // Handle 404 separately
            setLeaderboard(null); // Clear previous records
            alert(`No leaderboard records available for ${quizId}`);
          } else {
            const data = await response.json();
            setLeaderboard(data);
          }
        })
        .catch((error) => console.error("Error fetching leaderboard:", error));
    } else {
      alert("Please provide a quizId");
    }
  };

  useEffect(() => {
    // Fetch the list of categories when the component mounts
    fetch("http://localhost:5057/api/Quiz/titles", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (data) => {
        const titles = await data.json();
        setTitleList(titles);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleTitleChange = (e) => {
    // Update the categoryInput state when the dropdown selection changes
    setTitleInput(e.target.value);
  };

  const searchResult = async () => {
    try {
      // Fetch the quizId based on the selected title
      const response = await fetch(`http://localhost:5057/api/Quiz/quizId?title=${titleInput}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
  
      console.log("Response:", response);
  
      if (response.ok) {
        const selectedQuizId = await response.text();
  
        // Log the selectedQuizId
        console.log("Selected QuizId:", selectedQuizId);
  
        // Log a message before calling fetchLeaderboard
        console.log("Fetching leaderboard...");
  
        // Ensure that the selectedQuizId is an integer
        const parsedQuizId = parseInt(selectedQuizId, 10);
  
        if (!isNaN(parsedQuizId)) {
          // Pass the parsedQuizId to fetchLeaderboard
          fetchLeaderboard(parsedQuizId);
        } else {
          console.log("Invalid quizId format");
          alert("Invalid quizId format");
        }
      } else {
        console.log("Failed to fetch quizId for the selected title");
        alert("Failed to fetch quizId for the selected title");
      }
    } catch (error) {
      console.error("Error fetching quizId:", error);
    }
  };
  
  
  

  return (
    <div className="inputcontainer">
      <h2 className="alert alert-quiz">Leaderboard</h2>
      <div className="d-flex align-items-center flex">
        <select
          className="form-select"
          value={titleInput}
          onChange={handleTitleChange}
        >
          <option value="">Select a title</option>
          {titleList.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
        <button
          className="btn btn-success"
          style={{ maxWidth: "45%", marginBottom: "15px" }}
          onClick={searchResult}
        >
          Search
        </button>
      </div>

      <hr/>

      {leaderboard !== null && (
        <div>
          {leaderboard.length > 0 ? (
            <div>
              <table className="table table-bordered border-primary">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.username}</td>
                      <td>{entry.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No leaderboard records for this quiz.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
