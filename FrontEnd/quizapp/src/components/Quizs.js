import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Quizs(){
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const[quizList,setQuizList]=useState([])
    const navigate = useNavigate();
    var getQuizs=()=>{
        fetch('http://localhost:5057/api/Quiz',{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(
            async(data)=>{
                var myData = await data.json();
                await console.log(myData);
                await setQuizList(myData);
            }
        ).catch((e)=>{
            console.log(e)
        })
    }
    const handleTakeQuiz = (quizId) => {
        setSelectedQuizId(quizId);
        navigate("/questions"); // Navigate to QuestionsByQuizId component
      };
    var checkQuizs = quizList.length>0?true:false;
    return(
        <div>
            <h1 className="alert alert-success">Quizs</h1>
            <button className="btn btn-success" onClick={getQuizs}>Get All Quizs</button>
            <hr/>
            {checkQuizs?
            <div>
                {quizList.map((quiz)=>
                <div key={quiz.quizId} className="alert alert-primary">
                    Quiz Id:{quiz.quizId}
                    <br/>
                    Quiz Title:{quiz.title}
                    <br/>
                    Quiz Description:{quiz.description}
                    <br/>
                    Quiz Category:{quiz.category}
                    <br/>
                    Quiz TimeLimit:{quiz.timeLimit}
                    <br/>                   
                    <button
                        className="btn btn-primary"
                        onClick={() => handleTakeQuiz(quiz.quizId)}> 
                        Take Quiz
                    </button>
                </div>)}
            </div>
            :
            <div>No quizs available yet</div>
            }
        </div>
    )
}
export default Quizs;