// QuizList.js
import DisplayQuizs from "./DisplayQuizs";

function QuizList(props) {
  return (
    <div>
      {Array.isArray(props.quizs) && props.quizs.length > 0 ? (
        props.quizs.map((quiz) => (
          <div key={quiz.quizId} className="alert alert-primary">
            <DisplayQuizs quiz={quiz} />
          </div>
        ))
      ) : (
        <div>No quizzes available yet</div>
      )}
    </div>
  );
}

export default QuizList;
