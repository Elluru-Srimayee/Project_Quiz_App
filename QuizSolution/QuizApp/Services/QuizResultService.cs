using Microsoft.AspNetCore.Mvc;
using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Models.DTOs;
using QuizApp.Repositories;
using System;
using System.Collections.Generic;

namespace QuizApp.Services
{
    public class QuizResultService : IQuizResultService
    {
        private readonly IRepository<int, Quiz> _quizRepository;
        private readonly IRepository<int, QuizResult> _quizResultRepository;
        private readonly IRepository<int, Questions> _questionRepository;

        public QuizResultService(IRepository<int, QuizResult> quizResultRepository, IRepository<int, Questions> questionRepository, IRepository<int,Quiz> quizRepository)
        {
            _quizResultRepository = quizResultRepository ?? throw new ArgumentNullException(nameof(quizResultRepository));
            _questionRepository = questionRepository ?? throw new ArgumentNullException(nameof(questionRepository));
            _quizRepository = quizRepository ?? throw new ArgumentNullException(nameof(quizRepository));
        }

        public QuizResult AddQuizResult(QuizResult quizResult)
        {
            if (quizResult == null)
                throw new ArgumentNullException(nameof(quizResult));

            return _quizResultRepository.Add(quizResult);
        }

        public bool DeleteQuizResult(int quizResultId)
        {
            var existingResult = _quizResultRepository.GetById(quizResultId);
            if (existingResult != null)
            {
                _quizResultRepository.Delete(quizResultId);
                return true;
            }
            return false;
        }

        public IList<QuizResult> GetAllQuizResults()
        {
            return _quizResultRepository.GetAll();
        }

        public QuizResult GetQuizResultById(int quizResultId)
        {
            return _quizResultRepository.GetById(quizResultId);
        }

        public IList<QuizResult> GetResultsByQuiz(int quizId)
        {
            return _quizResultRepository
                .GetAll()
                .Where(result => result.QuizId == quizId)
                .ToList();
        }

        public IList<QuizResult> GetResultsByUser(string username)
        {
            return _quizResultRepository
                .GetAll()
                .Where(result => result.Username != null && result.Username.Equals(username))
                .ToList();
        }

        public QuizResult UpdateQuizResult(QuizResult quizResult)
        {
            if (quizResult == null)
                throw new ArgumentNullException(nameof(quizResult));

            var existingResult = _quizResultRepository.GetById(quizResult.QuizResultId);
            if (existingResult != null)
            {
                return _quizResultRepository.Update(quizResult);
            }
            return null;
        }
        public QuizResultDTO EvaluateAnswer(int quizId, AnswerDTO answerdto)
        {
            var quiz = _quizRepository.GetById(quizId);
            var question = _questionRepository.GetById(answerdto.QuestionId);

            if (quiz == null || question == null)
            {
                // Handle invalid quiz or question
                throw new NotFoundException();
            }

            // Check if the provided question belongs to the specified quiz
            if (question.QuizId != quizId)
            {
                throw new BadRequestException();
            }

            // Check if the user's answer is correct
            bool userAnswerIsCorrect = (answerdto.UserAnswer.Equals(question.Answer));

            // Calculate score based on correct or incorrect answer
            int score = (userAnswerIsCorrect) ? 1 : 0;

            // Save the quiz result
            var quizResult = new QuizResult
            {
                QuizId = quizId,
                Username = answerdto.Username, // Assuming you have a username
                QuestionId =answerdto.QuestionId,
                UserAnswer = answerdto.UserAnswer,
                IsCorrect = userAnswerIsCorrect,
                Score = score
            };

            _quizResultRepository.Add(quizResult);

            return MapToQuizResultDTO(quizResult);
        }
        public QuizResultDTO MapToQuizResultDTO(QuizResult result)
        {

            var resultDTO = new QuizResultDTO
            {

                UserAnswer = result.UserAnswer,
                QuizId = result.QuizId,
                Score = result.Score,
                IsCorrect = result.IsCorrect,
            };

            return resultDTO;
        }

    }
}
