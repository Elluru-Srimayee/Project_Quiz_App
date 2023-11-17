using QuizApp.Models;

namespace QuizApp.Interfaces
{
    public interface IQuizService
    {
        List<Quiz> GetQuizs();
        Quiz Add(Quiz quiz);
        Quiz GetQuizById(int id);
        Task<Quiz> GetQuizByIdWithQuestions(int id);
        Task<List<Quiz>> GetQuizzesByCategoryAsync(string category);
    }
}
