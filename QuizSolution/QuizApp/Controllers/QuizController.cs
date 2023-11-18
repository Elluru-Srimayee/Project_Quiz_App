using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Models.DTOs;
using QuizApp.Services;

namespace QuizApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IQuizService _quizService;
        private readonly IQuestionService _questionService;
        private readonly IQuizResultService _quizResultService;

        public QuizController(IQuizService quizService,IQuestionService questionService, IQuizResultService quizResultService)
        {
            _quizService = quizService;
            _questionService = questionService;
            _quizResultService = quizResultService;
        }
        [HttpGet]
        public ActionResult Get()
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _quizService.GetQuizs();
                return Ok(result);
            }
            catch (NoQuizsAvailableException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [Authorize(Roles = "Creator")]
        [HttpPost]
        public ActionResult Create(Quiz quiz)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _quizService.Add(quiz);
                return Ok(result);
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [HttpPost("{id}")]
        public async Task<ActionResult> GetById(QuizDTO quizDTO)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = await _quizService.GetQuizByIdWithQuestions(quizDTO.Id);
                return Ok(result);
            }
            catch (NoQuizsAvailableException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [HttpPost("category/{category}")]
        public async Task<ActionResult> GetByCategory(QuizDTO quizDTO)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = await _quizService.GetQuizzesByCategoryAsync(quizDTO.Category);
                return Ok(result);
            }
            catch (NoQuizsAvailableException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [HttpGet("quiz/{quizId}/questions")]
        public ActionResult<IEnumerable<QuestionDTO>> GetQuestionsForQuiz(int quizId)
        {
            try
            {
                var questions = _questionService.GetQuestionsByQuizId(quizId);
                return Ok(questions);
            }
            catch (NoQuestionsAvailableException e)
            {
                return NotFound($"No questions found for Quiz ID {quizId}. {e.Message}");
            }
        }
        [HttpPost("evaluate/{quizId}")]
        public ActionResult<QuizResultDTO> EvaluateAnswer(int quizId, [FromBody] AnswerDTO answerDTO)
        {
            try
            {
                var result = _quizResultService.EvaluateAnswer(quizId, answerDTO);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest($"Failed to evaluate the answer. {e.Message}");
            }
        }

    }
}
