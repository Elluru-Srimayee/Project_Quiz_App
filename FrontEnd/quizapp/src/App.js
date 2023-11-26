import './App.css';
import Quizs from './components/Quizs';
import AddQuiz from './components/AddQuiz'
import UpdateQuestion from './components/UpdateQuestion';
import Questions from './components/Questions';
import DeleteQuestion from './components/DeleteQuestion';
import QuestionsByQuizId from './components/QuestionsByQuizId';

function App() {
  return (
    <div className="App">
      <div className="App">
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <DeleteQuestion/>
            </div>
            <div className="col">
              <Questions/>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
