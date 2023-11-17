using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Models.DTOs;

namespace QuizApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionService _questionService;

        public QuestionsController(IQuestionService questionService)
        {
            _questionService = questionService;
        }
        [Authorize(Roles = "Creator")]
        [HttpPost("add")]
        public IActionResult AddToQuiz(QuestionDTO questionDTO)
        {
            var result = _questionService.AddToQuiz(questionDTO);
            if (result)
                return Ok(questionDTO);
            return BadRequest("Could not add Question to Quiz");
        }
        [HttpGet("getAll")]
        public IActionResult GetAllQuestions()
        {
            var questions = _questionService.GetAllQuestions();
            return Ok(questions);
        }

        [HttpGet("byquiz/{quizId}")]
        public ActionResult<IEnumerable<Questions>> GetQuestionsByQuizId(int quizId)
        {
            var questions = _questionService.GetQuestionsByQuizId(quizId);

            if (questions != null)
            {
                return Ok(questions);
            }
            else
            {
                return NotFound($"No questions found for Quiz ID {quizId}.");
            }
        }

        [Authorize(Roles = "Creator")]
        [HttpPost("Remove")]
        public IActionResult RemoveFromQuiz(QuestionDTO questionDTO)
        {
            var result = _questionService.RemoveFromQuiz(questionDTO);
            if (result)
                return Ok("Deleted Question Successfully");
            return BadRequest("Could not remove the Question from quiz");
        }
    }
}
