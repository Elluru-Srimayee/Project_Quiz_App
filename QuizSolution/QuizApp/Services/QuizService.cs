using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Repositories;

namespace QuizApp.Services
{
    public class QuizService : IQuizService
    {
        private readonly IRepository<int, Quiz> _quizRepository;
        private readonly IRepository<int, Questions> _questionRepository;

        public QuizService(IRepository<int, Quiz> quizRepository, IRepository<int, Questions> questionRepository)
        {
            _quizRepository = quizRepository;
            _questionRepository = questionRepository;
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
        public List<Quiz> GetQuizzesByCategory(string category)
        {
            var quizzes = _quizRepository. GetAll();
            if (quizzes != null)
            {
                return quizzes
                    .Where(quiz => quiz.Category.Equals(category, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }
            throw new NoQuizsAvailableException();
        }

        public Quiz GetQuizById(int id)
        {
            var res = _quizRepository.GetById(id);
            if (res != null)
            {
                return res;
            }
            throw new NoQuizsAvailableException();
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
        public bool DeleteQuizIfNoQuestions(int quizId)
        {
            // Check if there are any questions associated with the quiz
            var questionsCount = _questionRepository.GetAll().Count(q => q.QuizId == quizId);

            if (questionsCount == 0)
            {
                // No questions, safe to delete the quiz
                var deletedQuiz = _quizRepository.Delete(quizId);

                if (deletedQuiz == null)
                {
                    // The specified quiz does not exist
                    throw new NoQuizsAvailableException();
                }

                return true; // Quiz deleted successfully
            }

            return false; // Quiz has questions, cannot delete
        }
    }

}
