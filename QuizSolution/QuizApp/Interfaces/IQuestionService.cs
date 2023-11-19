using QuizApp.Models;
using QuizApp.Models.DTOs;

namespace QuizApp.Interfaces
{
    public interface IQuestionService
    {
        bool AddToQuiz(QuestionDTO questionDTO);
        bool RemoveFromQuiz(int quizid,int questionid);
        IList<QuestionDTO> GetAllQuestions();
        IList<Questions> GetQuestionsByQuizId(int quizId);
    }
}
