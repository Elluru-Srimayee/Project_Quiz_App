import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Quizs from './components/Quizs';
import QuizsByCategory from './components/QuizsByCategory';
import QuestionsByQuizId from './components/QuestionsByQuizId';
import RegisterUser from './components/RegisterUser';
import Menu from './components/Menu';
import LoginUser from './components/LoginUser';
import AddQuestion from './components/AddQuestion';
import Questions from './components/Questions';
import AddQuiz from './components/AddQuiz';
import Protected from './Protected';
import QuizResult from './components/QuizResult';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import UpdateQuestion from './components/UpdateQuestion';
import DeleteQuestion from './components/DeleteQuestion';
import UpdateQuiz from './components/UpdateQuiz';
import DeleteQuiz from './components/DeleteQuiz';
import Creator from './components/Creator';
import QuizList from './components/QuizList';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Menu />
        <Routes>
          <Route path="/addQuestions" element={<Protected><AddQuestion/></Protected>}/>
          <Route path="/addQuiz" element={<Protected><AddQuiz/></Protected>}/>
          <Route path="/login" element={<LoginUser/>}/>
          <Route path='/' element={<RegisterUser />} />
          <Route path="/quizs" element={<Quizs />} />
          <Route path="search" element={<QuizsByCategory />} />
          <Route path="/questions" element={<Protected>
            <Questions/>
          </Protected>} />
          <Route path="/leaderboard" element={<Protected>
            <Leaderboard/>
          </Protected>}/>
          <Route path="/questionsbyid" element={
            <Protected><QuestionsByQuizId/></Protected>}/>
          <Route path="/creator" element={<Protected><Creator/></Protected>}/>
          <Route path="/profile" element ={<Profile/>}/>
          <Route path="/quizResult" element={<Protected><QuizResult/></Protected>}/>
          <Route path="/updateQuestions" element={<Protected>
            <UpdateQuestion/>
          </Protected>}/>
          <Route path="/deleteQuestions" element={<Protected><DeleteQuestion/></Protected>}/>
          <Route path="/updateQuiz" element={<Protected><UpdateQuiz/></Protected>}/>
          <Route path="/deleteQuiz" element={<Protected><DeleteQuiz/></Protected>}/>
          <Route path="/quizList" element={<Protected><QuizList/></Protected>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
