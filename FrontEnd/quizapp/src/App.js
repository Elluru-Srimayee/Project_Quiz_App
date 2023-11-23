import logo from './logo.svg';
import './App.css';
import Quizs from './components/Quizs';
import AddQuiz from './components/AddQuiz';
import AddQuestion from './components/AddQuestion';
import Questions from './components/Questions';

function App() {
  return (
    <div className="App">
      <div className="App">
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <AddQuestion/>
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
