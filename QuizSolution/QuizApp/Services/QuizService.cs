using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models;

namespace QuizApp.Services
{
    public class QuizService : IQuizService
    {
        private readonly IRepository<int, Quiz> _quizRepository;

        public QuizService(IRepository<int, Quiz> repository)
        {
            _quizRepository = repository;
        }
        public Quiz Add(Quiz quiz)
        {
                var result = _quizRepository.Add(quiz);
                return result;
        }


        public List<Quiz> GetQuizs()
        {
            var quizs = _quizRepository.GetAll();
            if (quizs != null)
            {
                return quizs.ToList();
            }
            throw new NoQuizsAvailableException();
        }
        public async Task<List<Quiz>> GetQuizzesByCategoryAsync(string category)
        {
            var quizzes = await Task.Run(() => GetQuizs());
            return quizzes
                .Where(quiz => quiz.Category.Equals(category, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        public Quiz GetQuizById(int id)
        {
            var res = _quizRepository.GetById(id);
            if (res != null)
            {
                return res;
            }
            return null;
        }
        public async Task<Quiz> GetQuizByIdWithQuestions(int id)
        {
            var quiz = await Task.Run(() => GetQuizById(id));
            if (quiz != null && quiz.Questions != null)
            {
                quiz.Questions = quiz.Questions.OrderBy(q => q.QuestionId).ToList(); // Order by QuestionId
                foreach (var question in quiz.Questions)
                {
                    question.QuestionId = 0; // Reset QuestionId to start from 1
                }
            }
            return quiz;
        }
    }

}
