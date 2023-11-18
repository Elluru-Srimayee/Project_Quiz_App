using QuizApp.Models;
using QuizApp.Models.DTOs;
using System.Collections.Generic;

namespace QuizApp.Interfaces
{
    public interface IQuizResultService
    {
        QuizResult AddQuizResult(QuizResult quizResult);
        QuizResult UpdateQuizResult(QuizResult quizResult);
        QuizResult GetQuizResultById(int quizResultId);
        IList<QuizResult> GetResultsByUser(string username);
        IList<QuizResult> GetResultsByQuiz(int quizId);
        IList<QuizResult> GetAllQuizResults();
        bool DeleteQuizResult(int quizResultId);
        QuizResultDTO EvaluateAnswer(int quizId, AnswerDTO answerDTO);
    }
}
