import logo from './logo.svg';
import './App.css';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import Quizs from './components/Quizs';
import AddQuiz from './components/AddQuiz'
import UpdateQuiz from './components/UpdateQuiz';
import DeleteQuiz from './components/DeleteQuiz';
import QuestionsByQuizId from './components/QuestionsByQuizId';

function App() {
  return (
    <div className="App">
      <div className="App">
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <QuestionsByQuizId/>
            </div>
            <div className="col">
              <Quizs/>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
