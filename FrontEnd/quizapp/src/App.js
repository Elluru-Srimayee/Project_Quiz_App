import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Quizs from './components/Quizs';
import QuizsByCategory from './components/QuizsByCategory';
import QuestionsByQuizId from './components/QuestionsByQuizId';
import RegisterUser from './components/RegisterUser';
import Menu from './components/Menu';
import LoginUser from './components/LoginUser';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Menu />
        <Routes>
          <Route path="/Login" element={<LoginUser/>}/>
          <Route path='/' element={<RegisterUser />} />
          <Route path="/quizs" element={<Quizs />} />
          <Route path="search" element={<QuizsByCategory />} />
          <Route path="/questions" element={<QuestionsByQuizId />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
