import React, { useState } from "react";

function Leaderboard() {
  const [quizId, setQuizId] = useState("");
  const [leaderboard, setLeaderboard] = useState(null);

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
  

  return (
    <div className="inputcontainer">
      <h2 className="alert alert-success">Leaderboard</h2>
      <label className="form-control" htmlFor="quizId">
        Quiz ID
      </label>
      <input
        id="quizId"
        type="text"
        className="form-control"
        value={quizId}
        onChange={(e) => setQuizId(e.target.value)}
      />

      <button onClick={() => fetchLeaderboard(quizId)} className="btn btn-primary">
        Get Leaderboard
      </button><hr/>

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