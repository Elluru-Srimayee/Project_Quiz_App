import { useNavigate } from "react-router-dom";
function Creator(){
    const navigate=useNavigate();
    const handleQuestions=()=>{
        navigate("/questions");
    }
    const handleQuizs=()=>{
        navigate("/quizList");
    }
    return(
        <div className="inputcontroller">
            <button className="btn btn-primary" onClick={handleQuestions}>Manage Questions</button>
            <button className="btn btn-primary" onClick={handleQuizs}>Manage Quizs</button>
        </div>
    );
}
export default Creator;